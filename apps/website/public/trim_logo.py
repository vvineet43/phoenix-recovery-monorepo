from PIL import Image

def trim_image(img_path, out_path):
    img = Image.open(img_path)
    # Get bounding box of non-transparent part
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
    diff = Image.composite(img, bg, img)
    # Actually just get the non-zero alpha
    bbox = img.split()[-1].getbbox()
    if bbox:
        img_cropped = img.crop(bbox)
        # resize nicely to say height 200
        h = 200
        w = int((h / img_cropped.height) * img_cropped.width)
        img_cropped = img_cropped.resize((w, h), Image.Resampling.LANCZOS)
        img_cropped.save(out_path)
        print(f"Trimmed! New size: {w}x{h}")
    else:
        print("Empty image or no alpha")

trim_image("/Users/ivineet43/Downloads/TNT Logo.png", "/Users/ivineet43/.gemini/antigravity/scratch/data_recovery_toolkit/apps/website/public/logo.png")
