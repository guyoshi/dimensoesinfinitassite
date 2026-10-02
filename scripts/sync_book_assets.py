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
from datetime import date
from pathlib import Path

from PIL import Image, ImageOps

SITE = Path(__file__).resolve().parents[1]
MAP = SITE / "data/common/book-assets-source-map.json"
MANIFEST = SITE / "data/common/assets-manifest.json"
INVENTORY = SITE / "data/common/inventario-pasta-assets.csv"


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
    selected = []
    for entry in source_map["entries"]:
        site_path = entry["sitePath"]
        if args.book and f"/{args.book}/" not in site_path:
            continue
        source = SITE.parent / entry["sourcePath"]
        if site_path not in indexed or not source.is_file():
            raise SystemExit(f"Missing mapped source or manifest entry: {entry}")
        current_sha = digest(source.read_bytes())
        target = SITE / site_path
        if current_sha != entry["sourceSha256"] or not target.is_file():
            selected.append((entry, source, target, current_sha))

    print(f"Mapped sources: {len(source_map['entries'])}; pending: {len(selected)}")
    for entry, _, _, _ in selected:
        print(entry["sitePath"])
    if args.check or not selected:
        return

    inventory_lines = INVENTORY.read_bytes().splitlines(keepends=True)
    inventory_by_path = {}
    for index, line in enumerate(inventory_lines[1:], 1):
        cells = line.rstrip(b"\r\n").decode("utf-8").split(";")
        if len(cells) >= 6:
            inventory_by_path["assets/" + cells[3]] = index
    if any(entry["sitePath"] not in inventory_by_path for entry, _, _, _ in selected):
        raise SystemExit("A mapped image is missing from the inventory")

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
        index = inventory_by_path[site_path]
        old_line = inventory_lines[index]
        ending = b"\r\n" if old_line.endswith(b"\r\n") else b"\n" if old_line.endswith(b"\n") else b""
        cells = old_line.rstrip(b"\r\n").decode("utf-8").split(";")
        cells[4] = str(len(data))
        cells[5] = f"{width}x{height}"
        inventory_lines[index] = ";".join(cells).encode("utf-8") + ending

    manifest["updatedAt"] = date.today().isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    INVENTORY.write_bytes(b"".join(inventory_lines))
    MAP.write_text(json.dumps(source_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synchronized {len(selected)} image(s). Commit and publish the Site to go live.")


if __name__ == "__main__":
    main()
