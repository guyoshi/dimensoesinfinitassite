"""Sync mapped canonical book images into the public Site when publishing.

Source files live in sibling `Ciclo de Jesed/**/02 - Assets` directories. The
mapping deliberately excludes Site-only graphics and ambiguous identities.
Run with --check to preview, or --apply to convert changed sources to WebP and
update the Site inventory. Publishing the Git repository remains a separate
step.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import unicodedata
from datetime import date
from pathlib import Path

from PIL import Image, ImageOps

SITE = Path(__file__).resolve().parents[1]
MAP = SITE / "data/common/book-assets-source-map.json"
MANIFEST = SITE / "data/common/assets-manifest.json"
INVENTORY = SITE / "data/common/inventario-pasta-assets.csv"
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"}
CATEGORY_DIRS = {
    "characters": "Personagens", "places": "Lugares", "maps": "Mapas",
    "chapters": "Capitulos", "dynasties": "Dinastias", "events": "Eventos",
    "families": "Famílias", "objects": "Objetos", "organisations": "Organizações",
    "gallery": "Galeria", "backgrounds": "Fundos", "lore": "Lore",
}
ALIASES = SITE / "data/common/book-image-aliases.json"
IMAGES_MARKER = "Gerado por scripts/sync_book_assets.py"
IGNORED_DIRS = {"antigos", "antigos nao usar", "antigos não usar", "backup", "temp"}
SOURCE_SIDE_DIRS = {"Personagens": "characters", "Lugares": "places", "Galeria": "gallery", "Mapas": "maps", "Objetos": "gallery"}
LOGO_VARIANTS = {"branco": "logo-light", "preto": "logo-dark", "colorido": "logo-color"}
CLAN_ALIASES = {
    "cla-polar-emblema-1-antigo": "cla-polar-1o-emblema-antigo",
    "cla-polar-emblema-2-antigo": "cla-polar-2o-emblema-antigo",
}


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def discover_book_roots() -> dict[tuple[str, str], Path]:
    """Find current and future saga/book folders with canonical 02 - Assets."""
    found = {}
    for saga in SITE.parent.iterdir():
        if not saga.is_dir() or saga.name in {"Site", "Editor de Livros"} or saga.name.startswith("."):
            continue
        for book in saga.iterdir():
            if not book.is_dir():
                continue
            assets = book / "02 - Assets"
            if assets.is_dir():
                book_name = re.sub(r"^\d+\s*[-–—]\s*", "", book.name)
                found[(slug(saga.name), slug(book_name))] = assets
    return found


def match_new_source(target: str, root: Path) -> Path | None:
    """Only exact, unique names within the same book; never visual guesses."""
    relative = Path(target).parts[4:]
    if not relative:
        return None
    filename = relative[-1]
    stem = Path(filename).stem
    candidates = []
    for source in root.rglob("*"):
        if not source.is_file() or source.suffix.lower() not in IMAGE_EXT:
            continue
        if any(part.lower() in {"antigos", "antigos nao usar", "antigos não usar", "backup", "temp"} for part in source.parts):
            continue
        source_slug = slug(source.stem)
        parent_slug = slug(source.parent.name)
        category = relative[0] if len(relative) > 1 else "cover"
        if category == "cover":
            wanted = {"capa-com-logo", "capa"} if stem == "cover" else {"capa-sem-logo", "capa-clean"} if stem == "cover-clean" else {stem}
            if parent_slug in {"capas", "covers"} and source_slug in wanted:
                candidates.append(source)
        elif category == "chapters":
            number = re.fullmatch(r"chapter-(\d+)", stem)
            source_number = re.match(r"^(?:capitulo[- ]*)?(\d+)(?:\b|-|$)", source_slug)
            if parent_slug in {"capitulos", "chapters"} and number and source_number and int(number.group(1)) == int(source_number.group(1)):
                candidates.append(source)
        elif (source_slug == stem or (category == "lore" and source_slug == CLAN_ALIASES.get(stem))) and (parent_slug == slug(CATEGORY_DIRS.get(category, category)) or (category == "lore" and stem.startswith("cla-") and parent_slug == "emblemas")):
            candidates.append(source)
    return candidates[0] if len(candidates) == 1 else None


def discover_new_links(manifest: dict, mapped: set[str]) -> list[dict]:
    roots = discover_book_roots()
    found = []
    listed = {record["path"] for record in manifest["assets"]}
    candidates = listed | {path.relative_to(SITE).as_posix() for path in (SITE / "assets/books").rglob("*.webp")}
    for target in sorted(candidates):
        if target in mapped:
            continue
        parts = Path(target).parts
        if len(parts) < 5 or parts[:2] != ("assets", "books"):
            continue
        root = roots.get((parts[2], parts[3]))
        if not root:
            continue
        source = match_new_source(target, root)
        if source:
            found.append({"sitePath": target, "sourcePath": source.relative_to(SITE.parent).as_posix(), "sourceSha256": ""})
    return found


def managed_books() -> dict[tuple[str, str], tuple[Path, Path]]:
    """Books whose images.js carries the generated marker: images are discovered from the source side."""
    out = {}
    for (saga, book), assets in discover_book_roots().items():
        book_dir = SITE / "data/sagas" / saga / "books" / book
        images = book_dir / "images.js"
        if images.is_file() and IMAGES_MARKER in images.read_text(encoding="utf-8"):
            out[(saga, book)] = (assets, book_dir)
    return out


def source_side_links(mapped: set[str]) -> list[dict]:
    """Discover images from `02 - Assets` (covers, title logos, characters, places, chapters, gallery, map)."""
    found = []
    for (saga, book), (assets, _) in managed_books().items():
        base = f"assets/books/{saga}/{book}"
        taken: dict[str, Path] = {}

        def add(site_path: str, source: Path) -> None:
            if site_path in mapped:
                return
            if site_path in taken:
                print(f"  AVISO: {source.relative_to(assets)} repete o destino {site_path}; ignorado.")
                return
            taken[site_path] = source

        for source in sorted(assets.rglob("*")):
            if not source.is_file() or source.suffix.lower() not in IMAGE_EXT:
                continue
            rel = source.relative_to(assets).parts
            if any(part.lower() in IGNORED_DIRS for part in rel):
                continue
            top, stem_slug = rel[0], slug(source.stem)
            if top == "Capas":
                if stem_slug.endswith("capa"):
                    add(f"{base}/cover.webp", source)
            elif top == "Logos":
                variant = re.search(r"-\s*(branco|preto|colorido)$", source.stem, re.I)
                if variant and len(rel) > 2 and slug(rel[1]) == "titulo":
                    add(f"assets/branding/{book}/{LOGO_VARIANTS[variant.group(1).lower()]}.webp", source)
            elif top == "Capitulos":
                number = re.match(r"^(?:capitulo[- ]*)?(\d+)(?:-|$)", stem_slug)
                if number:
                    add(f"{base}/chapters/chapter-{int(number.group(1)):02d}.webp", source)
            elif top in SOURCE_SIDE_DIRS:
                category = SOURCE_SIDE_DIRS[top]
                add(f"{base}/maps/map.webp" if category == "maps" else f"{base}/{category}/{stem_slug}.webp", source)
        for site_path, source in taken.items():
            found.append({"sitePath": site_path, "sourcePath": source.relative_to(SITE.parent).as_posix(), "sourceSha256": ""})
    return found


def _entities(book_dir: Path, name: str) -> dict[str, str]:
    path = book_dir / f"{name}.js"
    if not path.is_file():
        return {}
    match = re.search(r"=\s*(\[.*\]);?\s*$", path.read_text(encoding="utf-8"), re.S)
    index = {}
    for item in json.loads(match.group(1)) if match else []:
        index[item["slug"]] = item["slug"]
        index.setdefault(slug(item["name"]), item["slug"])
    return index


def regenerate_images(entries: list[dict], write: bool) -> None:  # write=False: preview from sources, files need not exist yet
    """Write each managed book's images.js from the images present in the Site."""
    alias_data = json.loads(ALIASES.read_text(encoding="utf-8")) if ALIASES.is_file() else {}
    for (saga, book), (_, book_dir) in managed_books().items():
        prefix = f"assets/books/{saga}/{book}/"
        aliases = alias_data.get(f"{saga}/{book}", {})
        ignored = set(aliases.get("ignore", []))
        entities = {"characters": _entities(book_dir, "characters"), "places": _entities(book_dir, "places")}
        images = {"chapters": {}, "characters": {}, "places": {}, "gallery": []}
        unmatched = []
        for entry in sorted(entries, key=lambda e: e["sitePath"]):
            path = entry["sitePath"]
            if not path.startswith(prefix) or (write and not (SITE / path).is_file()):
                continue
            category, _, filename = path[len(prefix):].partition("/")
            stem = Path(filename).stem
            if stem in ignored:
                continue
            if category in ("characters", "places"):
                target = aliases.get(category, {}).get(stem) or entities[category].get(stem)
                if target in entities[category].values():
                    images[category][target] = path
                else:
                    # An illustration without an entity is still useful in the gallery.
                    # Do not invent identities or overwrite the primary place portrait.
                    images["gallery"].append({"src": path, "title": stem.replace("-", " ").title(), "type": "Local" if category == "places" else "Personagem"})
                    unmatched.append(f"{category}/{stem} (incluído na galeria)")
            elif category == "chapters" and re.fullmatch(r"chapter-(\d+)", stem):
                images["chapters"][str(int(stem.split("-")[1]))] = path
            elif category == "maps":
                images["map"] = path
            elif category == "gallery":
                images["gallery"].append({"src": path, "title": stem.replace("-", " ").title(), "type": "Galeria"})
        print(f"{saga}/{book}: {len(images['characters'])} personagens, {len(images['places'])} lugares, {len(images['chapters'])} capítulos, {len(images['gallery'])} galeria")
        for name in unmatched:
            print(f"  SEM FICHA CORRESPONDENTE: {name} (adicione em data/common/book-image-aliases.json)")
        if write:
            text = (f"/* {IMAGES_MARKER} — não editar à mão. */\nwindow.DI_BOOK = window.DI_BOOK || {{}};\n"
                    f"window.DI_BOOK.images = {json.dumps(images, ensure_ascii=False, indent=2)};\n")
            target_file = book_dir / "images.js"
            if not target_file.is_file() or target_file.read_text(encoding="utf-8") != text:
                target_file.write_text(text, encoding="utf-8", newline="\n")


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def encode(source: Path, site_path: str) -> tuple[bytes, int, int]:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        limit = 5000 if "/maps/" in site_path else 2600 if "/chapters/" in site_path or site_path.endswith("/cover.webp") else 1800 if "/characters/" in site_path else 2400
        if max(image.size) > limit:
            image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        output = io.BytesIO()
        image.save(output, format="WEBP", quality=88, method=6)
        return output.getvalue(), image.width, image.height


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="report pending updates without writing")
    parser.add_argument("--apply", action="store_true", help="apply pending image updates")
    parser.add_argument("--book", help="limit to one book slug")
    args = parser.parse_args()
    if args.check == args.apply:
        parser.error("choose exactly one of --check or --apply")

    source_map = json.loads(MAP.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    indexed = {entry["path"]: entry for entry in manifest["assets"]}
    known = {entry["sitePath"] for entry in source_map["entries"]}
    new_links = discover_new_links(manifest, known)
    new_links += source_side_links(known | {entry["sitePath"] for entry in new_links})
    print(f"New exact links found: {len(new_links)}")
    for entry in new_links:
        print(f"  {entry['sitePath']} <= {entry['sourcePath']}")
    if args.apply and new_links:
        source_map["entries"].extend(new_links)
        source_map["entries"].sort(key=lambda entry: entry["sitePath"])
        mapped = {entry["sitePath"] for entry in source_map["entries"]}
        for entry in new_links:
            site_path = entry["sitePath"]
            if site_path not in indexed:
                target = SITE / site_path
                record = {
                    "path": site_path, "filename": target.name,
                    "category": str(Path(site_path).parent).replace("\\", "/").removeprefix("assets/"),
                    "extension": ".webp", "width": 0, "height": 0, "sizeBytes": 0, "sha256": "",
                }
                manifest["assets"].append(record)
                indexed[site_path] = record
        manifest["count"] = len(manifest["assets"])
    mapped = {entry["sitePath"] for entry in source_map["entries"]}
    all_webps = {path.relative_to(SITE).as_posix() for path in (SITE / "assets").rglob("*.webp")}
    source_map["siteOnly"] = sorted((set(indexed) | all_webps) - mapped)
    selected = []
    for entry in source_map["entries"] + (new_links if args.check else []):
        site_path = entry["sitePath"]
        if args.book and f"/{args.book}/" not in site_path:
            continue
        source = SITE.parent / entry["sourcePath"]
        if site_path not in indexed and args.apply and (SITE / site_path).is_file():
            record = {
                "path": site_path, "filename": Path(site_path).name,
                "category": str(Path(site_path).parent).replace("\\", "/").removeprefix("assets").lstrip("/"),
                "extension": ".webp", "width": 0, "height": 0, "sizeBytes": 0, "sha256": "",
            }
            manifest["assets"].append(record)
            indexed[site_path] = record
            manifest["count"] = len(manifest["assets"])
        if (site_path not in indexed and args.apply) or not source.is_file():
            raise SystemExit(f"Missing mapped source or manifest entry: {entry}")
        current_sha = digest(source.read_bytes())
        target = SITE / site_path
        if current_sha != entry["sourceSha256"] or not target.is_file():
            selected.append((entry, source, target, current_sha))

    inventory_lines = INVENTORY.read_bytes().splitlines(keepends=True)
    inventory_by_path = {}
    for index, line in enumerate(inventory_lines[1:], 1):
        cells = line.rstrip(b"\r\n").decode("utf-8").split(";")
        if len(cells) >= 6:
            inventory_by_path["assets/" + cells[3]] = index
    missing_rows = [path for path in indexed if path not in inventory_by_path]
    stale_metadata = []
    pending_paths = {entry["sitePath"] for entry, _, _, _ in selected}
    for path, record in indexed.items():
        target = SITE / path
        if not target.is_file():
            if path in pending_paths:
                continue
            raise SystemExit(f"Manifest image missing: {path}")
        data = target.read_bytes()
        if len(data) != record["sizeBytes"] or digest(data) != record["sha256"]:
            stale_metadata.append(path)

    print(f"Mapped sources: {len(source_map['entries'])}; pending: {len(selected)}")
    print(f"Inventory rows missing: {len(missing_rows)}; stale image metadata: {len(stale_metadata)}")
    for entry, _, _, _ in selected:
        print(entry["sitePath"])
    if args.check:
        regenerate_images(source_map["entries"] + new_links, write=False)
        return
    if not selected and not missing_rows and not stale_metadata:
        regenerate_images(source_map["entries"], write=True)
        return

    for entry, source, target, source_sha in selected:
        site_path = entry["sitePath"]
        data, width, height = encode(source, site_path)
        target.parent.mkdir(parents=True, exist_ok=True)
        temp = target.with_suffix(".webp.tmp")
        temp.write_bytes(data)
        os.replace(temp, target)
        entry["sourceSha256"] = source_sha
        record = indexed[site_path]
        record.update(width=width, height=height, sizeBytes=len(data), sha256=digest(data))

    for path in stale_metadata:
        record = indexed[path]
        target = SITE / path
        data = target.read_bytes()
        with Image.open(target) as image:
            record.update(width=image.width, height=image.height, sizeBytes=len(data), sha256=digest(data))

    for path, record in indexed.items():
        values = [record["category"], record["filename"], record["extension"], path.removeprefix("assets/"), str(record["sizeBytes"]), f"{record['width']}x{record['height']}"]
        if path not in inventory_by_path:
            inventory_lines.append(";".join(values).encode("utf-8") + b"\n")
            continue
        index = inventory_by_path[path]
        old_line = inventory_lines[index]
        old_values = old_line.rstrip(b"\r\n").decode("utf-8").split(";")
        if old_values != values:
            ending = b"\r\n" if old_line.endswith(b"\r\n") else b"\n" if old_line.endswith(b"\n") else b""
            inventory_lines[index] = ";".join(values).encode("utf-8") + ending

    regenerate_images(source_map["entries"], write=True)
    manifest["updatedAt"] = date.today().isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    INVENTORY.write_bytes(b"".join(inventory_lines))
    MAP.write_text(json.dumps(source_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synchronized {len(selected)} image(s); reconciled inventory and metadata. Commit and publish the Site to go live.")


if __name__ == "__main__":
    main()
