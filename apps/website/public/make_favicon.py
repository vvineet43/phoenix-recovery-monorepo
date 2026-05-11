import PIL.Image
import PIL.ImageDraw

favicon_size = 256
canvas = PIL.Image.new('RGBA', (favicon_size, favicon_size), (0, 0, 0, 0)) # Fully transparent

cube_width = 150
cube_height = 173

origin_x = (favicon_size - cube_width) // 2
origin_y = (favicon_size - cube_height) // 2

c_x = favicon_size // 2
c_y = favicon_size // 2

def draw_white_patterns(draw_obj, scale_factor=1.0):
    lw = 12 * scale_factor
    start_pt = (c_x - 70, c_y - 90)
    end_pt = (c_x + 70, c_y + 90)
    draw_obj.line([start_pt, end_pt], fill="white", width=int(lw))
    draw_obj.line([(c_x - 60, c_y), (c_x + 60, c_y)], fill="white", width=int(lw))
    draw_obj.line([(c_x - 35, c_y - 65), (c_x - 35, c_y)], fill="white", width=int(lw))
    draw_obj.line([(c_x + 35, c_y + 65), (c_x + 35, c_y)], fill="white", width=int(lw))
    draw_obj.line([start_pt, (c_x - 35, c_y - 65)], fill="white", width=int(lw))
    draw_obj.line([end_pt, (c_x + 35, c_y + 65)], fill="white", width=int(lw))
    draw_obj.line([(c_x - 70, c_y - 90), (c_x, c_y - 90)], fill="white", width=int(lw))
    draw_obj.line([(c_x, c_y + 90), (c_x + 70, c_y + 90)], fill="white", width=int(lw))

mask = PIL.Image.new('L', (favicon_size, favicon_size), 0)
mask_draw = PIL.ImageDraw.Draw(mask)

points_hex = [
    (c_x, c_y - 120),
    (c_x + 104, c_y - 60),
    (c_x + 104, c_y + 60),
    (c_x, c_y + 120),
    (c_x - 104, c_y + 60),
    (c_x - 104, c_y - 60),
]
mask_draw.polygon(points_hex, fill=255)

def subtract_white_patterns_mask(mask_draw_obj):
    lw = 16
    mask_draw_obj.line([(c_x - 70, c_y - 90), (c_x + 70, c_y + 90)], fill=0, width=int(lw))
    mask_draw_obj.line([(c_x - 60, c_y), (c_x + 60, c_y)], fill=0, width=int(lw))
    mask_draw_obj.line([(c_x - 35, c_y - 65), (c_x - 35, c_y)], fill=0, width=int(lw))
    mask_draw_obj.line([(c_x + 35, c_y + 65), (c_x + 35, c_y)], fill=0, width=int(lw))
    mask_draw_obj.line([(c_x - 70, c_y - 90), (c_x + 10, c_y - 90)], fill=0, width=int(lw))
    mask_draw_obj.line([(c_x - 10, c_y + 90), (c_x + 70, c_y + 90)], fill=0, width=int(lw))

subtract_white_patterns_mask(mask_draw)

black_layer = PIL.Image.new('RGBA', (favicon_size, favicon_size), (0, 0, 0, 255))
final_favicon_256 = PIL.Image.composite(black_layer, canvas, mask)

sizes = [ (32, 32), (64, 64), (128, 128), (256, 256) ]
ico_versions = []
for size in sizes:
    resized_img = final_favicon_256.resize(size, resample=PIL.Image.Resampling.LANCZOS)
    ico_versions.append(resized_img)

final_favicon_256.save("the_nextools_favicon_black.png")
ico_versions[0].save("favicon.ico", sizes=sizes, format='ICO')

canvas_sq = PIL.Image.new('RGBA', (favicon_size, favicon_size), (0, 0, 0, 255))
draw_sq = PIL.ImageDraw.Draw(canvas_sq)
draw_white_patterns(draw_sq, scale_factor=1.0)
canvas_sq.save("the_nextools_favicon_square_black.png")

# Also copy TNT Logo and resize to logo.png
from PIL import Image
logo_path = "/Users/ivineet43/Downloads/TNT Logo.png"
try:
    img = Image.open(logo_path)
    # The image is 1408 x 768. Let's create a smaller transparent logo for headers
    # A height of 80px seems good
    h = 80
    w = int((80 / img.height) * img.width)
    img = img.resize((w, h), Image.Resampling.LANCZOS)
    img.save("logo.png")
    print("Favicon and logo created successfully.")
except Exception as e:
    print(f"Error making logo: {e}")

