import os
import shutil

recovery_list_file = "/Users/app/Desktop/Cart_App/cart-frontend/recovery_list.txt"

# Re-create the list if it was deleted
if not os.path.exists(recovery_list_file):
    # I need to re-run recover.py first
    pass

with open(recovery_list_file, "r") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        
        parts = line.split("|")
        if len(parts) < 2:
            continue
        
        dest, src = parts[0], parts[1]
        
        # Create destination directory if it doesn't exist
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        
        try:
            shutil.copy2(src, dest)
            print(f"Restored: {dest}")
        except Exception as e:
            print(f"Failed to restore {dest}: {e}")

print("Restoration complete.")
