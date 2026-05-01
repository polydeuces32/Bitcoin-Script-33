# Bitcoin Script Playground

A browser-based educational playground for learning Bitcoin Script fundamentals through opcode execution and stack visualization.

## Important Note

This project uses a simplified JavaScript interpreter for learning purposes. It is **not** Bitcoin Core-compatible and should not be used to validate real transactions.

## Features

- Interactive script editor
- Visual stack rendering
- Sample scripts
- Shareable URLs
- Opcode reference cards
- Zero-build static site

## Quick Start

```bash
git clone https://github.com/polydeuces32/bitcoin-script-playground.git
cd bitcoin-script-playground
python3 -m http.server 8000
```

Open http://localhost:8000

## Supported Scope

This tool demonstrates common stack, arithmetic, comparison, and verification concepts. Some opcode behavior is intentionally simplified.

## Roadmap

- Pure engine/test separation
- More accurate script semantics
- Additional opcode coverage
- Transaction templates
- Testnet teaching mode

## License

MIT
