import pandas as pd
from pathlib import Path

path = Path(__file__).resolve().parent.parent / "Pamphlet Content Government Scheme-IEC.xlsx"
df = pd.read_excel(path)

for record in df.to_dict("records"):
    name = str(record.get("Scheme Name", "" )).strip()
    portal = str(record.get("Application Portal", "")).strip()
    print(f"{name} || {portal}")
