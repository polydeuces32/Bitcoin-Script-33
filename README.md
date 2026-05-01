# Bitcoin Script Lab

A terminal-style educational lab for learning Bitcoin Script concepts through opcode-by-opcode execution tracing and live stack visualization.

## v2 Highlights

- Terminal-inspired Bitcoin developer UI
- Step-by-step execution trace
- Run All, Step, and Reset Trace controls
- Live stack state panel
- Opcode reference panel
- Shareable scripts through URL parameters
- Zero-build static web app

## Important Scope Note

Bitcoin Script Lab uses a simplified JavaScript interpreter for learning purposes. It is not Bitcoin Core-compatible and must not be used to validate real transactions.

## Quick Start

```bash
git clone https://github.com/polydeuces32/bitcoin-script-playground.git
cd bitcoin-script-playground
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Example Script

```text
OP_1 OP_2 OP_ADD OP_DUP
```

Trace result:

```text
01 > OP_1      [] -> [1]
02 > OP_2      [1] -> [1, 2]
03 > OP_ADD    [1, 2] -> [3]
04 > OP_DUP    [3] -> [3, 3]
```

## Why This Exists

Bitcoin Script is stack-based and difficult to understand from static documentation alone. This project makes stack transitions visible so beginners can learn by running and stepping through scripts.

## Roadmap

- Animated stack transitions
- Real transaction template examples
- Hashlock and timelock teaching modes
- Miniscript learning mode
- Better automated tests

## License

MIT
