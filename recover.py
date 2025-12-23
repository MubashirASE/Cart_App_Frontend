import os
import json
import sys
from datetime import datetime

history_dir = "/Users/app/Library/Application Support/Code/User/History"
target_timestamp = 1766471381440  # Dec 23, 11:29:41 PKT
output_file = "/Users/app/Desktop/Cart_App/cart-frontend/recovery_list.txt"

recovery_list = []

for folder in os.listdir(history_dir):
    folder_path = os.path.join(history_dir, folder)
    if not os.path.isdir(folder_path):
        continue
    
    entries_file = os.path.join(folder_path, "entries.json")
    if not os.path.exists(entries_file):
        continue
    
    try:
        with open(entries_file, "r") as f:
            data = json.load(f)
            resource = data.get("resource", "")
            if not resource.startswith("file:///Users/app/Desktop/Cart_App/cart-frontend/"):
                continue
            
            best_entry = None
            for entry in data.get("entries", []):
                ts = entry.get("timestamp", 0)
                if ts <= target_timestamp:
                    if best_entry is None or ts > best_entry["timestamp"]:
                        best_entry = entry
            
            if best_entry:
                source_path = os.path.join(folder_path, best_entry["id"])
                dest_path = resource.replace("file://", "")
                recovery_list.append((dest_path, source_path, best_entry["timestamp"]))
    except Exception as e:
        print(f"Error processing {entries_file}: {e}")

with open(output_file, "w") as f:
    for dest, src, ts in recovery_list:
        dt = datetime.fromtimestamp(ts / 1000).strftime('%Y-%m-%d %H:%M:%S')
        f.write(f"{dest}|{src}|{dt}\n")

print(f"Found {len(recovery_list)} files to recover. List saved to {output_file}")
