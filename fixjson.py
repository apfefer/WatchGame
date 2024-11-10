import json

def fix_json_format(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = file.read()

        # Step 1: Split based on '}{' indicating the start of a new JSON object
        entries = data.split('}{')

        # Step 2: Wrap each entry in `{...}` to make it a standalone JSON object
        entries = [f"{{{entry}}}" if not entry.startswith('{') else f"{entry}}}" for entry in entries]

        # Step 3: Join entries with commas and wrap them in array brackets to form a JSON array
        corrected_data = f"[{','.join(entries)}]"

        # Try loading the corrected data to confirm it's valid JSON
        corrected_json = json.loads(corrected_data)

        # Save the corrected JSON to a new file
        corrected_file_path = file_path.replace(".json", "_fixed.json")
        with open(corrected_file_path, 'w', encoding='utf-8') as file:
            json.dump(corrected_json, file, indent=4)

        print(f"File corrected and saved to: {corrected_file_path}")

    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        print("There may still be structural issues in the file.")
    except Exception as e:
        print("An error occurred:", e)

# Run the function with the path to your file
fix_json_format(r'C:\Users\andre\Downloads\example.json')
