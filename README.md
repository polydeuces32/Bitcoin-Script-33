# 🪙 Bitcoin Script Playground

> **Interactive Learning Platform for Bitcoin Script Development**

A modern, web-based playground for learning and experimenting with Bitcoin Script. Built with vanilla JavaScript, this tool provides an intuitive interface for understanding Bitcoin's scripting language through hands-on practice.

![Bitcoin Script Playground](https://img.shields.io/badge/Bitcoin-Script%20Playground-orange?style=for-the-badge&logo=bitcoin)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ Features

### 🎯 **Interactive Script Editor**
- Real-time script execution
- Syntax highlighting and validation
- Error handling with detailed messages
- Keyboard shortcuts (Ctrl+Enter to run)

### 📚 **Comprehensive Opcode Library**
- **30+ Bitcoin Script opcodes** implemented
- Organized by categories: Stack, Arithmetic, Comparison, Bitwise, Logical, Constants, Verification
- Click-to-insert opcode functionality
- Detailed descriptions for each opcode

### 🎨 **Visual Stack Management**
- Real-time stack visualization
- Animated stack operations
- Color-coded stack items
- Clear visual feedback

### 🧩 **Sample Scripts & Puzzles**
- Pre-built examples for different skill levels
- Basic math operations
- Comparison logic
- Multi-signature examples
- Advanced stack manipulation

### 🔗 **Sharing & Collaboration**
- Generate shareable URLs for scripts
- Copy-to-clipboard functionality
- Easy script distribution

## 🚀 Quick Start

### Option 1: Live Demo
Simply open `index.html` in your web browser - no setup required!

### Option 2: Local Development Server
```bash
# Clone the repository
git clone https://github.com/yourusername/bitcoin-script-playground.git
cd bitcoin-script-playground

# Start local server
python3 -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

## 📖 Usage Examples

### Basic Arithmetic
```bitcoin-script
OP_1 OP_2 OP_ADD OP_DUP
```
**Result**: Stack contains `[3, 3]`

### Comparison Logic
```bitcoin-script
OP_5 OP_3 OP_ADD OP_8 OP_EQUAL
```
**Result**: Stack contains `[1]` (true)

### Stack Manipulation
```bitcoin-script
OP_1 OP_2 OP_3 OP_ROT OP_SWAP
```
**Result**: Stack contains `[2, 1, 3]`

## 🛠 Supported Opcodes

### Stack Operations
- `OP_DUP` - Duplicates the top stack item
- `OP_2DUP` - Duplicates the top two stack items
- `OP_DROP` - Removes the top stack item
- `OP_SWAP` - Swaps the top two stack items
- `OP_OVER` - Copies the second-to-top item to the top
- `OP_ROT` - Rotates the top 3 stack items

### Arithmetic Operations
- `OP_ADD` - Adds the top two stack items
- `OP_SUB` - Subtracts the second item from the first
- `OP_MUL` - Multiplies the top two stack items
- `OP_DIV` - Divides the second item by the first
- `OP_MOD` - Returns the remainder of division

### Comparison Operations
- `OP_EQUAL` - Returns 1 if top two items are equal
- `OP_EQUALVERIFY` - Same as OP_EQUAL but runs OP_VERIFY afterward
- `OP_1EQUAL` - Returns 1 if input is 1, 0 otherwise
- `OP_0NOTEQUAL` - Returns 1 if input is not 0, 0 otherwise

### Bitwise Operations
- `OP_AND` - Bitwise AND of the top two items
- `OP_OR` - Bitwise OR of the top two items
- `OP_XOR` - Bitwise XOR of the top two items
- `OP_NOT` - Bitwise NOT of the top item

### Logical Operations
- `OP_BOOLAND` - Boolean AND of the top two items
- `OP_BOOLOR` - Boolean OR of the top two items

### Constants
- `OP_0` through `OP_5` - Push numbers 0-5 onto stack

### Verification
- `OP_VERIFY` - Marks transaction as invalid if top stack value is not true
- `OP_RETURN` - Marks transaction as invalid

## 🎓 Educational Value

This playground is perfect for:
- **Bitcoin developers** learning script fundamentals
- **Students** understanding stack-based programming
- **Cryptocurrency enthusiasts** exploring Bitcoin's scripting capabilities
- **Educators** teaching blockchain concepts

## 🔮 Future Roadmap

### Phase 1: Enhanced Features
- [ ] More Bitcoin Script opcodes
- [ ] Script validation against Bitcoin rules
- [ ] Transaction simulation
- [ ] Cost estimation

### Phase 2: Advanced Tools
- [ ] Multi-signature script builder
- [ ] P2SH/P2WSH support
- [ ] Real Bitcoin testnet integration
- [ ] Script optimization suggestions

### Phase 3: SaaS Platform
- [ ] User accounts and authentication
- [ ] Script library and sharing
- [ ] Collaborative editing
- [ ] API access for developers
- [ ] Premium features and subscriptions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bitcoin Core developers for the original Bitcoin Script specification
- The Bitcoin community for continuous innovation
- Contributors and users who provide feedback and suggestions

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/bitcoin-script-playground/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/bitcoin-script-playground/discussions)
- 📧 **Contact**: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for the Bitcoin community

[🌐 Live Demo](https://yourusername.github.io/bitcoin-script-playground) | [📖 Documentation](https://github.com/yourusername/bitcoin-script-playground/wiki) | [🐦 Twitter](https://twitter.com/yourusername)

</div>
