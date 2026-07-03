import urllib.request
import os

os.makedirs('public', exist_ok=True)

before_url = "https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after6-880x808.jpeg"
after_url = "https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after2-880x808.jpeg"

print("Downloading before image...")
urllib.request.urlretrieve(before_url, "public/gfc_before_raw.jpeg")
print("Downloading after image...")
urllib.request.urlretrieve(after_url, "public/gfc_after_raw.jpeg")
print("Done!")
