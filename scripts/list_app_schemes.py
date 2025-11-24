import re
from pathlib import Path

app_path = Path(__file__).resolve().parent.parent / "src" / "App.jsx"
text = app_path.read_text(encoding="utf-8")

names = re.findall(r"scheme_name:\s*\"([^\"]+)\"", text)
for name in names:
    print(name)
