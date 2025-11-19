#!/usr/bin/env python3
"""Convert Admin JSON dump into src/data/dishes.js."""
import json
from pathlib import Path

TASTE_FILTERS = [
    {"id": "all", "label": "随便吃即可"},
    {"id": "mild", "label": "少辣顺口"},
    {"id": "spicy", "label": "香辣冒汗"},
    {"id": "comfort", "label": "今晚下饭"},
    {"id": "fitness", "label": "健身友好"},
    {"id": "quick", "label": "空气炸锅快手"},
]


def to_js(name: str, data: list) -> str:
    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    return f"export const {name} = {json_str}\n\n"


def main(json_path: str) -> None:
    path = Path(json_path)
    if not path.exists():
        raise SystemExit(f"JSON file not found: {path}")
    payload = json.loads(path.read_text())
    out = Path(__file__).resolve().parents[1] / 'src/data/dishes.js'
    content = to_js('categories', payload['categories'])
    content += to_js('tasteFilters', TASTE_FILTERS)
    content += to_js('dishes', payload['dishes'])
    out.write_text(content)
    print(f"Updated {out} using {path}")


if __name__ == '__main__':
    import sys

    if len(sys.argv) != 2:
        raise SystemExit('Usage: python scripts/import_menu.py <menu.json>')
    main(sys.argv[1])
PY && chmod +x scripts/import_menu.py
