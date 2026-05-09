#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="Bitcoin-Script-33"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$PROJECT_ROOT"

if [[ -t 1 ]]; then
  RESET=$'\033[0m'
  BOLD=$'\033[1m'
  DIM=$'\033[2m'
  CYAN=$'\033[36m'
  BLUE=$'\033[94m'
  GREEN=$'\033[32m'
  ORANGE=$'\033[38;5;208m'
  PURPLE=$'\033[35m'
  YELLOW=$'\033[33m'
else
  RESET=""
  BOLD=""
  DIM=""
  CYAN=""
  BLUE=""
  GREEN=""
  ORANGE=""
  PURPLE=""
  YELLOW=""
fi

print_ghost() {
  cat <<EOF
${BLUE}${DIM}        .-.
${BLUE}      .'   '.
${CYAN}     /  o o  \
${CYAN}    |    ^    |
${CYAN}    |  \___/  |
${BLUE}     \       /
${BLUE}${DIM}      '.   .'
${BLUE}${DIM}        'v'
${CYAN}${DIM}     ghost process online${RESET}
EOF
}

print_repo_status() {
  printf '\n%s=== Repository ===%s\n' "$PURPLE" "$RESET"
  printf '%sPath:%s   %s\n' "$DIM" "$RESET" "$PROJECT_ROOT"

  if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    local branch commit
    branch="$(git branch --show-current 2>/dev/null || printf 'unknown')"
    commit="$(git rev-parse --short HEAD 2>/dev/null || printf 'unknown')"

    printf '%sBranch:%s %s%s%s\n' "$DIM" "$RESET" "$GREEN" "$branch" "$RESET"
    printf '%sCommit:%s %s%s%s\n' "$DIM" "$RESET" "$YELLOW" "$commit" "$RESET"

    if git diff --quiet --ignore-submodules -- 2>/dev/null; then
      printf '%sWorking tree:%s %s✓ clean%s\n' "$DIM" "$RESET" "$GREEN" "$RESET"
    else
      printf '%sWorking tree:%s %shas local changes%s\n' "$DIM" "$RESET" "$ORANGE" "$RESET"
    fi
  else
    printf 'Git: unavailable or not inside a repository\n'
  fi
}

print_project_files() {
  printf '\n%s=== Project Files ===%s\n' "$CYAN" "$RESET"
  find . \
    -path './.git' -prune -o \
    -path './node_modules' -prune -o \
    -path './dist' -prune -o \
    -path './build' -prune -o \
    -maxdepth 2 \
    -type f \
    -print | sort
}

printf '\n%s%s=== %s Dev Status ===%s\n\n' "$BOLD" "$ORANGE" "$PROJECT_NAME" "$RESET"
printf '%sgiancarlovizhnay@Mac%s %s~%s ./scripts/dev-status.sh\n\n' "$GREEN" "$RESET" "$DIM" "$RESET"

if command -v fastfetch >/dev/null 2>&1; then
  if fastfetch --help 2>/dev/null | grep -q -- '--logo'; then
    fastfetch --logo none
  else
    fastfetch
  fi
else
  cat <<EOF
${ORANGE}fastfetch not installed.${RESET}

Install on macOS:
  brew install fastfetch

This script keeps fastfetch optional so the application does not require it at runtime.
EOF
fi

printf '\n'
print_ghost
print_repo_status
print_project_files

printf '\n%s✓ Done.%s\n' "$GREEN" "$RESET"
