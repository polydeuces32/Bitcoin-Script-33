// Bitcoin Script Playground - Interactive Learning Platform
class BitcoinScriptEngine {
    constructor() {
        this.stack = [];
        this.opcodes = this.initializeOpcodes();
        this.sampleScripts = this.initializeSampleScripts();
        this.initializeUI();
    }

    initializeOpcodes() {
        return {
            // Stack manipulation
            'OP_DUP': {
                name: 'OP_DUP',
                description: 'Duplicates the top stack item',
                category: 'Stack',
                execute: () => this.dup()
            },
            'OP_2DUP': {
                name: 'OP_2DUP',
                description: 'Duplicates the top two stack items',
                category: 'Stack',
                execute: () => this.dup2()
            },
            'OP_DROP': {
                name: 'OP_DROP',
                description: 'Removes the top stack item',
                category: 'Stack',
                execute: () => this.drop()
            },
            'OP_SWAP': {
                name: 'OP_SWAP',
                description: 'Swaps the top two stack items',
                category: 'Stack',
                execute: () => this.swap()
            },
            'OP_OVER': {
                name: 'OP_OVER',
                description: 'Copies the second-to-top item to the top',
                category: 'Stack',
                execute: () => this.over()
            },
            'OP_ROT': {
                name: 'OP_ROT',
                description: 'Rotates the top 3 stack items',
                category: 'Stack',
                execute: () => this.rot()
            },

            // Arithmetic
            'OP_ADD': {
                name: 'OP_ADD',
                description: 'Adds the top two stack items',
                category: 'Arithmetic',
                execute: () => this.add()
            },
            'OP_SUB': {
                name: 'OP_SUB',
                description: 'Subtracts the second item from the first',
                category: 'Arithmetic',
                execute: () => this.sub()
            },
            'OP_MUL': {
                name: 'OP_MUL',
                description: 'Multiplies the top two stack items',
                category: 'Arithmetic',
                execute: () => this.mul()
            },
            'OP_DIV': {
                name: 'OP_DIV',
                description: 'Divides the second item by the first',
                category: 'Arithmetic',
                execute: () => this.div()
            },
            'OP_MOD': {
                name: 'OP_MOD',
                description: 'Returns the remainder of division',
                category: 'Arithmetic',
                execute: () => this.mod()
            },

            // Comparison
            'OP_EQUAL': {
                name: 'OP_EQUAL',
                description: 'Returns 1 if top two items are equal',
                category: 'Comparison',
                execute: () => this.equal()
            },
            'OP_EQUALVERIFY': {
                name: 'OP_EQUALVERIFY',
                description: 'Same as OP_EQUAL but runs OP_VERIFY afterward',
                category: 'Comparison',
                execute: () => this.equalVerify()
            },
            'OP_1EQUAL': {
                name: 'OP_1EQUAL',
                description: 'Returns 1 if input is 1, 0 otherwise',
                category: 'Comparison',
                execute: () => this.oneEqual()
            },
            'OP_0NOTEQUAL': {
                name: 'OP_0NOTEQUAL',
                description: 'Returns 1 if input is not 0, 0 otherwise',
                category: 'Comparison',
                execute: () => this.zeroNotEqual()
            },

            // Bitwise operations
            'OP_AND': {
                name: 'OP_AND',
                description: 'Bitwise AND of the top two items',
                category: 'Bitwise',
                execute: () => this.and()
            },
            'OP_OR': {
                name: 'OP_OR',
                description: 'Bitwise OR of the top two items',
                category: 'Bitwise',
                execute: () => this.or()
            },
            'OP_XOR': {
                name: 'OP_XOR',
                description: 'Bitwise XOR of the top two items',
                category: 'Bitwise',
                execute: () => this.xor()
            },
            'OP_NOT': {
                name: 'OP_NOT',
                description: 'Bitwise NOT of the top item',
                category: 'Bitwise',
                execute: () => this.not()
            },

            // Logical operations
            'OP_BOOLAND': {
                name: 'OP_BOOLAND',
                description: 'Boolean AND of the top two items',
                category: 'Logical',
                execute: () => this.boolAnd()
            },
            'OP_BOOLOR': {
                name: 'OP_BOOLOR',
                description: 'Boolean OR of the top two items',
                category: 'Logical',
                execute: () => this.boolOr()
            },

            // Constants
            'OP_0': {
                name: 'OP_0',
                description: 'Pushes empty array onto stack',
                category: 'Constants',
                execute: () => this.pushZero()
            },
            'OP_1': {
                name: 'OP_1',
                description: 'Pushes 1 onto stack',
                category: 'Constants',
                execute: () => this.pushOne()
            },
            'OP_2': {
                name: 'OP_2',
                description: 'Pushes 2 onto stack',
                category: 'Constants',
                execute: () => this.pushTwo()
            },
            'OP_3': {
                name: 'OP_3',
                description: 'Pushes 3 onto stack',
                category: 'Constants',
                execute: () => this.pushThree()
            },
            'OP_4': {
                name: 'OP_4',
                description: 'Pushes 4 onto stack',
                category: 'Constants',
                execute: () => this.pushFour()
            },
            'OP_5': {
                name: 'OP_5',
                description: 'Pushes 5 onto stack',
                category: 'Constants',
                execute: () => this.pushFive()
            },

            // Verification
            'OP_VERIFY': {
                name: 'OP_VERIFY',
                description: 'Marks transaction as invalid if top stack value is not true',
                category: 'Verification',
                execute: () => this.verify()
            },
            'OP_RETURN': {
                name: 'OP_RETURN',
                description: 'Marks transaction as invalid',
                category: 'Verification',
                execute: () => this.returnOp()
            }
        };
    }

    initializeSampleScripts() {
        return {
            basic: "OP_1 OP_2 OP_ADD OP_DUP",
            comparison: "OP_5 OP_3 OP_ADD OP_8 OP_EQUAL",
            multisig: "OP_2 OP_1 OP_1 OP_1 OP_3 OP_CHECKMULTISIG",
            advanced: "OP_1 OP_2 OP_3 OP_ROT OP_SWAP OP_ADD OP_DUP OP_EQUAL"
        };
    }

    initializeUI() {
        this.renderOpcodes();
    }

    renderOpcodes() {
        const grid = document.getElementById('opcodesGrid');
        const categories = ['Stack', 'Arithmetic', 'Comparison', 'Bitwise', 'Logical', 'Constants', 'Verification'];
        
        categories.forEach(category => {
            const categoryOpcodes = Object.values(this.opcodes).filter(op => op.category === category);
            if (categoryOpcodes.length === 0) return;

            const categoryDiv = document.createElement('div');
            categoryDiv.style.gridColumn = '1 / -1';
            categoryDiv.innerHTML = `<h3 style="color: #4a5568; margin: 20px 0 10px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">${category}</h3>`;
            grid.appendChild(categoryDiv);

            categoryOpcodes.forEach(opcode => {
                const card = document.createElement('div');
                card.className = 'opcode-card';
                card.innerHTML = `
                    <div class="opcode-name">${opcode.name}</div>
                    <div class="opcode-desc">${opcode.description}</div>
                `;
                card.onclick = () => this.insertOpcode(opcode.name);
                grid.appendChild(card);
            });
        });
    }

    insertOpcode(opcodeName) {
        const textarea = document.getElementById('scriptInput');
        const currentValue = textarea.value;
        const newValue = currentValue + (currentValue ? ' ' : '') + opcodeName;
        textarea.value = newValue;
        textarea.focus();
    }

    // Stack manipulation operations
    dup() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        this.stack.push(this.stack[this.stack.length - 1]);
    }

    dup2() {
        if (this.stack.length < 2) throw new Error('Not enough items on stack');
        const top = this.stack[this.stack.length - 1];
        const second = this.stack[this.stack.length - 2];
        this.stack.push(second, top);
    }

    drop() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        this.stack.pop();
    }

    swap() {
        if (this.stack.length < 2) throw new Error('Not enough items on stack');
        const top = this.stack.pop();
        const second = this.stack.pop();
        this.stack.push(top, second);
    }

    over() {
        if (this.stack.length < 2) throw new Error('Not enough items on stack');
        this.stack.push(this.stack[this.stack.length - 2]);
    }

    rot() {
        if (this.stack.length < 3) throw new Error('Not enough items on stack');
        const top = this.stack.pop();
        const second = this.stack.pop();
        const third = this.stack.pop();
        this.stack.push(second, top, third);
    }

    // Arithmetic operations
    add() {
        if (this.stack.length < 2) throw new Error('Not enough numbers to add');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a + b).toString());
    }

    sub() {
        if (this.stack.length < 2) throw new Error('Not enough numbers to subtract');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a - b).toString());
    }

    mul() {
        if (this.stack.length < 2) throw new Error('Not enough numbers to multiply');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a * b).toString());
    }

    div() {
        if (this.stack.length < 2) throw new Error('Not enough numbers to divide');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        if (b === 0) throw new Error('Division by zero');
        this.stack.push(Math.floor(a / b).toString());
    }

    mod() {
        if (this.stack.length < 2) throw new Error('Not enough numbers for modulo');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        if (b === 0) throw new Error('Modulo by zero');
        this.stack.push((a % b).toString());
    }

    // Comparison operations
    equal() {
        if (this.stack.length < 2) throw new Error('Not enough values to compare');
        const b = this.stack.pop();
        const a = this.stack.pop();
        this.stack.push(a === b ? '1' : '0');
    }

    equalVerify() {
        this.equal();
        this.verify();
    }

    oneEqual() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        const value = this.stack.pop();
        this.stack.push(value === '1' ? '1' : '0');
    }

    zeroNotEqual() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        const value = this.stack.pop();
        this.stack.push(value !== '0' ? '1' : '0');
    }

    // Bitwise operations
    and() {
        if (this.stack.length < 2) throw new Error('Not enough values for AND');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a & b).toString());
    }

    or() {
        if (this.stack.length < 2) throw new Error('Not enough values for OR');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a | b).toString());
    }

    xor() {
        if (this.stack.length < 2) throw new Error('Not enough values for XOR');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a ^ b).toString());
    }

    not() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        const value = this.parseNumber(this.stack.pop());
        this.stack.push((~value >>> 0).toString());
    }

    // Logical operations
    boolAnd() {
        if (this.stack.length < 2) throw new Error('Not enough values for boolean AND');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a && b) ? '1' : '0');
    }

    boolOr() {
        if (this.stack.length < 2) throw new Error('Not enough values for boolean OR');
        const b = this.parseNumber(this.stack.pop());
        const a = this.parseNumber(this.stack.pop());
        this.stack.push((a || b) ? '1' : '0');
    }

    // Constants
    pushZero() { this.stack.push('0'); }
    pushOne() { this.stack.push('1'); }
    pushTwo() { this.stack.push('2'); }
    pushThree() { this.stack.push('3'); }
    pushFour() { this.stack.push('4'); }
    pushFive() { this.stack.push('5'); }

    // Verification
    verify() {
        if (this.stack.length === 0) throw new Error('Stack is empty');
        const value = this.stack.pop();
        if (value !== '1') throw new Error('Verification failed');
    }

    returnOp() {
        throw new Error('OP_RETURN: Transaction marked as invalid');
    }

    // Utility functions
    parseNumber(value) {
        const num = parseInt(value, 10);
        if (isNaN(num)) throw new Error(`Invalid number: ${value}`);
        return num;
    }

    runScript(script) {
        this.stack = [];
        const tokens = script.trim().split(/\s+/);
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (this.opcodes[token]) {
                try {
                    this.opcodes[token].execute();
                } catch (error) {
                    throw new Error(`Error at token ${i + 1} (${token}): ${error.message}`);
                }
            } else {
                // Treat as literal value
                this.stack.push(token);
            }
        }
    }

    renderStack() {
        const container = document.getElementById('stackContainer');
        
        if (this.stack.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: #a0aec0; margin-top: 100px;">
                    <i class="fas fa-layer-group" style="font-size: 3rem; margin-bottom: 10px;"></i>
                    <p>Stack will appear here when you run a script</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.stack.map((item, index) => `
            <div class="stack-item" style="animation-delay: ${index * 0.1}s">
                <span>${item}</span>
                <span style="opacity: 0.7; font-size: 0.8rem;">#${this.stack.length - index}</span>
            </div>
        `).join('');
    }

    showStatus(message, type = 'success') {
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 5000);
    }
}

// Global functions for UI interaction
const engine = new BitcoinScriptEngine();

function runScript() {
    const script = document.getElementById('scriptInput').value.trim();
    
    if (!script) {
        engine.showStatus('Please enter a script to run', 'error');
        return;
    }

    try {
        engine.runScript(script);
        engine.renderStack();
        engine.showStatus(`✅ Script executed successfully! Stack has ${engine.stack.length} items.`);
    } catch (error) {
        engine.showStatus(`❌ ${error.message}`, 'error');
        engine.renderStack();
    }
}

function clearScript() {
    document.getElementById('scriptInput').value = '';
    engine.stack = [];
    engine.renderStack();
    document.getElementById('status').innerHTML = '';
}

function shareScript() {
    const script = document.getElementById('scriptInput').value;
    if (!script) {
        engine.showStatus('No script to share', 'error');
        return;
    }

    const url = `${window.location.origin}${window.location.pathname}?script=${encodeURIComponent(script)}`;
    navigator.clipboard.writeText(url).then(() => {
        engine.showStatus('🔗 Script URL copied to clipboard!');
    }).catch(() => {
        engine.showStatus('Failed to copy URL', 'error');
    });
}

function loadSample(type) {
    const script = engine.sampleScripts[type];
    if (script) {
        document.getElementById('scriptInput').value = script;
        engine.showStatus(`📝 Loaded ${type} sample script`);
    }
}

// Load script from URL parameters
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const script = urlParams.get('script');
    if (script) {
        document.getElementById('scriptInput').value = decodeURIComponent(script);
        runScript();
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        runScript();
    }
});
