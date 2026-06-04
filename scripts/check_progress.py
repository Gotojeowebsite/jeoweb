import json
from pathlib import Path

reports_dir = Path("reports")
chunks = sorted(reports_dir.glob("subagent_chunk_4_*.json"))
chunks = [c for c in chunks if not c.name.endswith("_results.json")]

total_games = 0
processed_games = 0
remaining_games = []

print("Chunk Summary:")
print(f"{'Chunk File':<30} | {'Total':<6} | {'Processed':<9} | {'Remaining':<9}")
print("-" * 65)

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
                
    num_total = len(slugs)
    num_processed = len(results)
    num_remaining = num_total - num_processed
    
    total_games += num_total
    processed_games += num_processed
    
    chunk_rem = [s for s in slugs if s not in results]
    remaining_games.extend(chunk_rem)
    
    print(f"{chunk_name:<30} | {num_total:<6} | {num_processed:<9} | {num_remaining:<9}")

print("-" * 65)
print(f"Total Games in 4 Chunks: {total_games}")
print(f"Processed Games: {processed_games}")
print(f"Remaining Games: {len(remaining_games)}")
print(f"Remaining list: {remaining_games}")
