#!/bin/zsh
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <source-image-path> <target-image-path>"
  exit 1
fi

src="$1"
target="$2"

mkdir -p "$(dirname "$target")"
cp "$src" "$target"
echo "Saved: $target"

