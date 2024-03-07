from material_color_utilities_python import *
from PIL import Image # Pillow  - used for image processing 
import json # convert Python objects to JSON


img_path = 'images/ocean.jpg'  

img = Image.open(img_path)
basewidth = 64
wpercent = (basewidth / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
img = img.resize((basewidth, hsize), Image.Resampling.LANCZOS)

# Generate a theme from the image (use the library)
theme = themeFromImage(img)

theme_json = json.dumps(theme, default=lambda x: x.__dict__)
print(theme_json)

with open('theme.json', 'w') as f:
    f.write(theme_json)