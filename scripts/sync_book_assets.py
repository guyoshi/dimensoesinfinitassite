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
    new_links = discover_new_links(manifest, {entry["sitePath"] for entry in source_map["entries"]})
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
    for path, record in indexed.items():
        target = SITE / path
        if not target.is_file():
            raise SystemExit(f"Manifest image missing: {path}")
        data = target.read_bytes()
        if len(data) != record["sizeBytes"] or digest(data) != record["sha256"]:
            stale_metadata.append(path)

    print(f"Mapped sources: {len(source_map['entries'])}; pending: {len(selected)}")
    print(f"Inventory rows missing: {len(missing_rows)}; stale image metadata: {len(stale_metadata)}")
    for entry, _, _, _ in selected:
        print(entry["sitePath"])
    if args.check:
        return
    if not selected and not missing_rows and not stale_metadata:
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

    manifest["updatedAt"] = date.today().isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    INVENTORY.write_bytes(b"".join(inventory_lines))
    MAP.write_text(json.dumps(source_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synchronized {len(selected)} image(s); reconciled inventory and metadata. Commit and publish the Site to go live.")


if __name__ == "__main__":
    main()
