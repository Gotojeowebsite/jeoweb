import json
from pathlib import Path

reports_dir = Path("reports")
chunks = sorted(reports_dir.glob("subagent_chunk_12_*.json"))
chunks = [c for c in chunks if not c.name.endswith("_results.json")]

remaining_games = []

for chunk_path in chunks:
    chunk_name = chunk_path.name
    results_path = reports_dir / chunk_name.replace(".json", "_results.json")
    
    with open(chunk_path, "r") as f:
        slugs = json.load(f)
        
    results = {}
    if results_path.exists():
        with open(results_path, "r") as f:
            try:
                results = json.load(f)
            except Exception as e:
                pass
                
    for slug in slugs:
        if slug not in results:
            remaining_games.append(slug)

print(f"Total remaining games found: {len(remaining_games)}")

# Partition into 4 chunks
num_chunks = 4
chunk_size = (len(remaining_games) + num_chunks - 1) // num_chunks
partitioned_chunks = [remaining_games[i:i + chunk_size] for i in range(0, len(remaining_games), chunk_size)]

for idx, p_chunk in enumerate(partitioned_chunks):
    chunk_file = reports_dir / f"subagent_chunk_4_{idx}.json"
    with open(chunk_file, "w") as f:
        json.dump(p_chunk, f, indent=2)
    print(f"Created {chunk_file} with {len(p_chunk)} games")

# Remove any existing subagent_chunk_4_*_results.json to start clean for this partition
for idx in range(num_chunks):
    res_file = reports_dir / f"subagent_chunk_4_{idx}_results.json"
    if res_file.exists():
        res_file.unlink()
        print(f"Cleared old results file: {res_file}")
