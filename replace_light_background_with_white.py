#!/usr/bin/env python3
from collections import deque
import sys

from PIL import Image


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


def process(path, bright=215, max_delta=28):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()
    bg_mask = build_edge_connected_bg_mask(img, bright=bright, max_delta=max_delta)

    replaced = 0
    for y in range(h):
        for x in range(w):
            idx = y * w + x
            if bg_mask[idx]:
                px[x, y] = (255, 255, 255, 255)
                replaced += 1

    img.convert("RGB").save(path)
    print(f"{path}: replaced_bg_pixels={replaced}")


def main():
    if len(sys.argv) < 2:
        print(
            "usage: replace_light_background_with_white.py FILE [FILE ...]",
            file=sys.stderr,
        )
        sys.exit(2)

    for path in sys.argv[1:]:
        process(path)


if __name__ == "__main__":
    main()
