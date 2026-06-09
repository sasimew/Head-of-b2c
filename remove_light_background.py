#!/usr/bin/env python3
from collections import deque
import sys

from PIL import Image, ImageFilter


def is_bg_pixel(r, g, b, a, bright=215, max_delta=28):
    if a == 0:
        return True
    if min(r, g, b) < bright:
        return False
    return (max(r, g, b) - min(r, g, b)) <= max_delta


def build_edge_connected_bg_mask(img, bright=215, max_delta=28):
    w, h = img.size
    px = img.load()
    mask = bytearray(w * h)
    q = deque()

    def try_add(x, y):
        idx = y * w + x
        if mask[idx]:
            return
        r, g, b, a = px[x, y]
        if is_bg_pixel(r, g, b, a, bright=bright, max_delta=max_delta):
            mask[idx] = 255
            q.append((x, y))

    for x in range(w):
        try_add(x, 0)
        try_add(x, h - 1)
    for y in range(h):
        try_add(0, y)
        try_add(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if mask[idx]:
                    continue
                r, g, b, a = px[nx, ny]
                if is_bg_pixel(r, g, b, a, bright=bright, max_delta=max_delta):
                    mask[idx] = 255
                    q.append((nx, ny))
    return mask


def main():
    if len(sys.argv) not in (3, 5):
        print(
            "usage: remove_light_background.py INPUT OUTPUT [BRIGHT_THRESHOLD MAX_DELTA]",
            file=sys.stderr,
        )
        sys.exit(2)

    src, dst = sys.argv[1], sys.argv[2]
    bright = int(sys.argv[3]) if len(sys.argv) >= 4 else 215
    max_delta = int(sys.argv[4]) if len(sys.argv) >= 5 else 28

    img = Image.open(src).convert("RGBA")
    w, h = img.size
    bg_mask = build_edge_connected_bg_mask(img, bright=bright, max_delta=max_delta)

    alpha = Image.new("L", (w, h), 255)
    alpha.putdata([0 if v else 255 for v in bg_mask])
    alpha = alpha.filter(ImageFilter.GaussianBlur(radius=1.2))

    rgba = img.copy()
    rgba.putalpha(alpha)
    rgba.save(dst)

    alpha_hist = alpha.histogram()
    transparent = alpha_hist[0]
    partial = sum(alpha_hist[1:255])
    opaque = alpha_hist[255]
    print(
        f"saved={dst}\nsize={w}x{h}\ntransparent_pixels={transparent}\npartial_alpha_pixels={partial}\nopaque_pixels={opaque}"
    )


if __name__ == "__main__":
    main()
