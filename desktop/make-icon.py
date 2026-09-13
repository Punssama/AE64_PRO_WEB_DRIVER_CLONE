# Generates assets/icon.ico - a DOS-terminal keycap in the app's own palette (dark green
# board, amber key). No font needed, so it renders the same on any machine. Run once:
#   python make-icon.py
from PIL import Image, ImageDraw

BOARD = (18, 53, 43)     # --board  #12352B
AMBER = (255, 201, 77)   # --accent #FFC94D
INK = (18, 53, 43)

S = 256
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# rounded board tile
d.rounded_rectangle([8, 8, S - 8, S - 8], radius=40, fill=BOARD)

# an amber keycap sitting on it, with a hard offset shadow like the app's buttons
shadow = (7, 16, 13)
d.rounded_rectangle([70, 78, 196, 196], radius=12, fill=shadow)
d.rounded_rectangle([62, 66, 188, 184], radius=12, fill=AMBER)
# the keycap's top face
d.rounded_rectangle([74, 78, 176, 150], radius=8, fill=(255, 214, 110))

img.save("assets/icon.ico", sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("wrote assets/icon.ico")
