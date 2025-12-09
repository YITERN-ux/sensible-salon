
import os
from PIL import Image
import glob

def optimize_images(directory, quality=80):
    """
    Converts all PNG and JPG images in the directory to WebP format.
    """
    print(f"Optimizing images in {directory}...")
    
    # Extensions to look for
    extensions = ['*.png', '*.jpg', '*.jpeg']
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(directory, ext)))
        files.extend(glob.glob(os.path.join(directory, ext.upper())))

    count = 0
    saved_space = 0

    for file_path in files:
        try:
            filename = os.path.basename(file_path)
            name, ext = os.path.splitext(filename)
            webp_path = os.path.join(directory, f"{name}.webp")

            # Skip if webp already exists and is newer
            if os.path.exists(webp_path) and os.path.getmtime(webp_path) > os.path.getmtime(file_path):
                print(f"Skipping {filename} (WebP already up to date)")
                continue

            with Image.open(file_path) as img:
                # Convert to RGB if RGBA (unless we want to keep transparency, PNG usually has it)
                # WebP supports transparency, so we can keep RGBA
                
                print(f"Converting {filename} to WebP...")
                img.save(webp_path, 'WEBP', quality=quality)
                
                original_size = os.path.getsize(file_path)
                new_size = os.path.getsize(webp_path)
                saved = original_size - new_size
                saved_space += saved
                count += 1
                
        except Exception as e:
            print(f"Error converting {filename}: {e}")

    print(f"Done! Converted {count} images.")
    print(f"Total space saved: {saved_space / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    target_dir = r"c:\Users\yiter\OneDrive\Desktop\ANTIGRAVITY\sensible-salon\images"
    optimize_images(target_dir)
