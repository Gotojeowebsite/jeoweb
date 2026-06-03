import os
import json
from pathlib import Path

# Get all asset directories (excluding hidden ones)
assets_dir = Path("Assets")
all_slugs = sorted([d.name for d in assets_dir.iterdir() if d.is_dir() and not d.name.startswith('.') and not d.name.startswith('_')])

# Partition into 8 chunks
num_chunks = 8
chunk_size = (len(all_slugs) + num_chunks - 1) // num_chunks
chunks = [all_slugs[i * chunk_size : (i + 1) * chunk_size] for i in range(num_chunks)]

# Save chunks to files
reports_dir = Path("reports")
reports_dir.mkdir(exist_ok=True)

for idx, chunk in enumerate(chunks):
    chunk_file = reports_dir / f"subagent_chunk_{idx}.json"
    with open(chunk_file, "w") as f:
        json.dump(chunk, f, indent=2)
    print(f"Wrote chunk {idx} with {len(chunk)} games to {chunk_file}")
