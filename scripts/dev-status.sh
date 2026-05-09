#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="Bitcoin-Script-33"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$PROJECT_ROOT"

printf '\n=== %s Dev Status ===\n\n' "$PROJECT_NAME"

if command -v fastfetch >/dev/null 2>&1; then
  fastfetch
else
  cat <<'EOF'
fastfetch not installed.

Install on macOS:
  brew install fastfetch

This script keeps fastfetch optional so the application does not require it at runtime.
EOF
fi

printf '\n=== Repository ===\n'
printf 'Path: %s\n' "$PROJECT_ROOT"

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Branch: %s\n' "$(git branch --show-current 2>/dev/null || printf 'unknown')"
  printf 'Commit: %s\n' "$(git rev-parse --short HEAD 2>/dev/null || printf 'unknown')"

  if git diff --quiet --ignore-submodules -- 2>/dev/null; then
    printf 'Working tree: clean\n'
  else
    printf 'Working tree: has local changes\n'
  fi
else
  printf 'Git: unavailable or not inside a repository\n'
fi

printf '\n=== Project Files ===\n'
find . \
  -path './.git' -prune -o \
  -path './node_modules' -prune -o \
  -path './dist' -prune -o \
  -path './build' -prune -o \
  -maxdepth 2 \
  -type f \
  -print | sort

printf '\nDone.\n'
