"""Synchronize approved Ruínas dos Céus source PNGs into the static Site.

The OneDrive book assets are the editable source of truth. The public site
needs WebP copies inside its own repository; run this after editing the PNGs
and then publish the Site repository.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
from pathlib import Path
from datetime import date

from PIL import Image


SITE = Path(__file__).resolve().parents[1]
SOURCE = SITE.parent / "Ciclo de Jesed" / "1 - Ruínas dos Céus" / "02 - Assets"
TARGET_BASE = Path("assets/books/ciclo-de-jesed/ruinas-dos-ceus")
CHAPTERS = (1, 2, 3, 4, 5, 15, 17, 19, 20, 23, 25)


def mappings() -> list[tuple[Path, Path]]:
    pairs = []
    for number in CHAPTERS:
        label = "Capitulo" if number == 5 else "Capítulo"
        pairs.append((SOURCE / "Capitulos" / f"{label} {number}.png",
                      TARGET_BASE / "chapters" / f"chapter-{number:02d}.webp"))
    pairs.extend([
        (SOURCE / "Personagens" / "Mirel.png", TARGET_BASE / "characters" / "mirel-amarea.webp"),
        (SOURCE / "Personagens" / "Yndra.png", TARGET_BASE / "characters" / "yndra.webp"),
    ])
    return pairs


def encode(source: Path, target: Path) -> tuple[bytes, int, int]:
    with Image.open(source) as original:
        image = original.convert("RGB")
        limit = 1800 if "characters" in target.parts else 2600
        if max(image.size) > limit:
            image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        buffer = io.BytesIO()
        image.save(buffer, format="WEBP", quality=88, method=6)
        return buffer.getvalue(), image.width, image.height


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="report differences without writing")
    args = parser.parse_args()

    pairs = mappings()
    for source, relative in pairs:
        if not source.is_file():
            raise SystemExit(f"Missing canonical source: {source}")
        if not (SITE / relative).is_file():
            raise SystemExit(f"Missing expected Site image: {SITE / relative}")

    manifest_path = SITE / "data/common/assets-manifest.json"
    inventory_path = SITE / "data/common/inventario-pasta-assets.csv"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    entries = {item["path"]: item for item in manifest["assets"]}
    changes: dict[str, tuple[bytes, int, int]] = {}
    for source, relative in pairs:
        key = relative.as_posix()
        if key not in entries:
            raise SystemExit(f"Missing manifest entry: {key}")
        data, width, height = encode(source, relative)
        target = SITE / relative
        if target.read_bytes() != data:
            changes[key] = (data, width, height)
            print(f"UPDATE {key}")
        else:
            print(f"OK     {key}")

    if args.check:
        print(f"{len(changes)} image(s) need synchronization")
        return
    if not changes:
        print("All approved images are synchronized")
        return

    inventory_lines = inventory_path.read_bytes().splitlines(keepends=True)
    inventory_by_path: dict[str, int] = {}
    for index, line in enumerate(inventory_lines[1:], 1):
        cells = line.rstrip(b"\r\n").decode("utf-8").split(";")
        if len(cells) >= 6:
            inventory_by_path["assets/" + cells[3]] = index
    if any(key not in inventory_by_path for key in changes):
        raise SystemExit("Inventory entry missing for a changed image")

    for key, (data, width, height) in changes.items():
        target = SITE / key
        temp = target.with_suffix(".webp.tmp")
        temp.write_bytes(data)
        os.replace(temp, target)
        entry = entries[key]
        entry["width"] = width
        entry["height"] = height
        entry["sizeBytes"] = len(data)
        entry["sha256"] = hashlib.sha256(data).hexdigest()
        index = inventory_by_path[key]
        old_line = inventory_lines[index]
        ending = b"\r\n" if old_line.endswith(b"\r\n") else b"\n" if old_line.endswith(b"\n") else b""
        cells = old_line.rstrip(b"\r\n").decode("utf-8").split(";")
        cells[4] = str(len(data))
        cells[5] = f"{width}x{height}"
        inventory_lines[index] = ";".join(cells).encode("utf-8") + ending

    manifest["updatedAt"] = date.today().isoformat()
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    inventory_path.write_bytes(b"".join(inventory_lines))
    print(f"Synchronized {len(changes)} approved image(s)")


if __name__ == "__main__":
    main()
