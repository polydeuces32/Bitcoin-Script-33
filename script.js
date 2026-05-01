'use strict';

class BitcoinScriptEngine {
  constructor() {
    this.stack = [];
    this.opcodes = this.initializeOpcodes();
    this.sampleScripts = this.initializeSampleScripts();
  }

  initializeOpcodes() {
    return {
      OP_DUP: { description: 'Duplicate the top stack item', category: 'Stack', execute: () => this.dup() },
      OP_2DUP: { description: 'Duplicate the top two stack items', category: 'Stack', execute: () => this.dup2() },
      OP_DROP: { description: 'Remove the top stack item', category: 'Stack', execute: () => this.drop() },
      OP_SWAP: { description: 'Swap the top two stack items', category: 'Stack', execute: () => this.swap() },
      OP_OVER: { description: 'Copy the second-to-top item to the top', category: 'Stack', execute: () => this.over() },
      OP_ROT: { description: 'Rotate the top three stack items', category: 'Stack', execute: () => this.rot() },

      OP_ADD: { description: 'Add the top two numeric values', category: 'Arithmetic', execute: () => this.add() },
      OP_SUB: { description: 'Subtract the top value from the second value', category: 'Arithmetic', execute: () => this.sub() },
      OP_MUL: { description: 'Educational-only multiply operation', category: 'Arithmetic', execute: () => this.mul() },
      OP_DIV: { description: 'Educational-only integer division operation', category: 'Arithmetic', execute: () => this.div() },
      OP_MOD: { description: 'Educational-only modulo operation', category: 'Arithmetic', execute: () => this.mod() },

      OP_EQUAL: { description: 'Return 1 when the top two items are equal, else 0', category: 'Comparison', execute: () => this.equal() },
      OP_EQUALVERIFY: { description: 'Run OP_EQUAL followed by OP_VERIFY', category: 'Comparison', execute: () => this.equalVerify() },
      OP_1EQUAL: { description: 'Return 1 when the top item equals 1, else 0', category: 'Comparison', execute: () => this.oneEqual() },
      OP_0NOTEQUAL: { description: 'Return 1 when the top item is not 0, else 0', category: 'Comparison', execute: () => this.zeroNotEqual() },

      OP_AND: { description: 'Educational-only bitwise AND', category: 'Bitwise', execute: () => this.and() },
      OP_OR: { description: 'Educational-only bitwise OR', category: 'Bitwise', execute: () => this.or() },
      OP_XOR: { description: 'Educational-only bitwise XOR', category: 'Bitwise', execute: () => this.xor() },
      OP_NOT: { description: 'Return 1 for 0, otherwise 0', category: 'Logical', execute: () => this.not() },
      OP_BOOLAND: { description: 'Boolean AND of the top two stack items', category: 'Logical', execute: () => this.boolAnd() },
      OP_BOOLOR: { description: 'Boolean OR of the top two stack items', category: 'Logical', execute: () => this.boolOr() },

      OP_0: { description: 'Push 0 onto the stack', category: 'Constants', execute: () => this.push('0') },
      OP_1: { description: 'Push 1 onto the stack', category: 'Constants', execute: () => this.push('1') },
      OP_2: { description: 'Push 2 onto the stack', category: 'Constants', execute: () => this.push('2') },
      OP_3: { description: 'Push 3 onto the stack', category: 'Constants', execute: () => this.push('3') },
      OP_4: { description: 'Push 4 onto the stack', category: 'Constants', execute: () => this.push('4') },
      OP_5: { description: 'Push 5 onto the stack', category: 'Constants', execute: () => this.push('5') },
      OP_6: { description: 'Push 6 onto the stack', category: 'Constants', execute: () => this.push('6') },
      OP_7: { description: 'Push 7 onto the stack', category: 'Constants', execute: () => this.push('7') },
      OP_8: { description: 'Push 8 onto the stack', category: 'Constants', execute: () => this.push('8') },
      OP_9: { description: 'Push 9 onto the stack', category: 'Constants', execute: () => this.push('9') },
      OP_10: { description: 'Push 10 onto the stack', category: 'Constants', execute: () => this.push('10') },

      OP_VERIFY: { description: 'Fail unless the top item is true', category: 'Verification', execute: () => this.verify() },
      OP_RETURN: { description: 'Immediately fail execution', category: 'Verification', execute: () => this.returnOp() }
    };
  }

  initializeSampleScripts() {
    return {
      basic: 'OP_1 OP_2 OP_ADD OP_DUP',
      comparison: 'OP_5 OP_3 OP_ADD OP_8 OP_EQUAL',
      stack: 'OP_1 OP_2 OP_3 OP_ROT OP_SWAP',
      verify: 'OP_2 OP_3 OP_ADD OP_5 OP_EQUALVERIFY OP_1'
    };
  }

  run(script) {
    const tokens = this.tokenize(script);
    this.stack = [];

    tokens.forEach((token, index) => {
      try {
        if (this.opcodes[token]) {
          this.opcodes[token].execute();
          return;
        }

        if (this.isLiteral(token)) {
          this.push(token);
          return;
        }

        throw new Error(`Unsupported token: ${token}`);
      } catch (error) {
        throw new Error(`Token ${index + 1} (${token}): ${error.message}`);
      }
    });

    return [...this.stack];
  }

  tokenize(script) {
    return script.trim().split(/\s+/).filter(Boolean);
  }

  isLiteral(token) {
    return /^-?\d+$/.test(token);
  }

  push(value) {
    this.stack.push(String(value));
  }

  requireStackSize(size, message = 'Not enough items on stack') {
    if (this.stack.length < size) throw new Error(message);
  }

  popNumber() {
    this.requireStackSize(1, 'Stack is empty');
    const value = this.stack.pop();
    const number = Number.parseInt(value, 10);
    if (!Number.isSafeInteger(number)) throw new Error(`Invalid number: ${value}`);
    return number;
  }

  isTrue(value) {
    return value !== '0' && value !== '';
  }

  dup() {
    this.requireStackSize(1, 'Stack is empty');
    this.push(this.stack[this.stack.length - 1]);
  }

  dup2() {
    this.requireStackSize(2);
    const second = this.stack[this.stack.length - 2];
    const top = this.stack[this.stack.length - 1];
    this.push(second);
    this.push(top);
  }

  drop() {
    this.requireStackSize(1, 'Stack is empty');
    this.stack.pop();
  }

  swap() {
    this.requireStackSize(2);
    const top = this.stack.pop();
    const second = this.stack.pop();
    this.push(top);
    this.push(second);
  }

  over() {
    this.requireStackSize(2);
    this.push(this.stack[this.stack.length - 2]);
  }

  rot() {
    this.requireStackSize(3);
    const top = this.stack.pop();
    const second = this.stack.pop();
    const third = this.stack.pop();
    this.push(second);
    this.push(top);
    this.push(third);
  }

  add() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a + b);
  }

  sub() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a - b);
  }

  mul() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a * b);
  }

  div() {
    const b = this.popNumber();
    const a = this.popNumber();
    if (b === 0) throw new Error('Division by zero');
    this.push(Math.trunc(a / b));
  }

  mod() {
    const b = this.popNumber();
    const a = this.popNumber();
    if (b === 0) throw new Error('Modulo by zero');
    this.push(a % b);
  }

  equal() {
    this.requireStackSize(2);
    const b = this.stack.pop();
    const a = this.stack.pop();
    this.push(a === b ? '1' : '0');
  }

  equalVerify() {
    this.equal();
    this.verify();
  }

  oneEqual() {
    this.requireStackSize(1, 'Stack is empty');
    this.push(this.stack.pop() === '1' ? '1' : '0');
  }

  zeroNotEqual() {
    this.requireStackSize(1, 'Stack is empty');
    this.push(this.stack.pop() !== '0' ? '1' : '0');
  }

  and() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a & b);
  }

  or() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a | b);
  }

  xor() {
    const b = this.popNumber();
    const a = this.popNumber();
    this.push(a ^ b);
  }

  not() {
    const value = this.popNumber();
    this.push(value === 0 ? '1' : '0');
  }

  boolAnd() {
    const b = this.stack.pop();
    const a = this.stack.pop();
    if (a === undefined || b === undefined) throw new Error('Not enough items on stack');
    this.push(this.isTrue(a) && this.isTrue(b) ? '1' : '0');
  }

  boolOr() {
    const b = this.stack.pop();
    const a = this.stack.pop();
    if (a === undefined || b === undefined) throw new Error('Not enough items on stack');
    this.push(this.isTrue(a) || this.isTrue(b) ? '1' : '0');
  }

  verify() {
    this.requireStackSize(1, 'Stack is empty');
    const value = this.stack.pop();
    if (!this.isTrue(value)) throw new Error('Verification failed');
  }

  returnOp() {
    throw new Error('OP_RETURN failed execution');
  }
}

class PlaygroundUI {
  constructor(engine) {
    this.engine = engine;
    this.scriptInput = document.getElementById('scriptInput');
    this.stackContainer = document.getElementById('stackContainer');
    this.opcodesGrid = document.getElementById('opcodesGrid');
    this.status = document.getElementById('status');

    this.bindEvents();
    this.renderOpcodes();
    this.renderStack();
    this.loadScriptFromUrl();
  }

  bindEvents() {
    document.querySelector('[data-action="run"]').addEventListener('click', () => this.runScript());
    document.querySelector('[data-action="clear"]').addEventListener('click', () => this.clearScript());
    document.querySelector('[data-action="share"]').addEventListener('click', () => this.shareScript());

    document.querySelectorAll('[data-sample]').forEach((button) => {
      button.addEventListener('click', () => this.loadSample(button.dataset.sample));
    });

    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        this.runScript();
      }
    });
  }

  runScript() {
    const script = this.scriptInput.value.trim();
    if (!script) {
      this.showStatus('Please enter a script to run.', 'error');
      return;
    }

    try {
      const stack = this.engine.run(script);
      this.renderStack(stack);
      this.showStatus(`Script executed successfully. Stack items: ${stack.length}.`, 'success');
    } catch (error) {
      this.renderStack(this.engine.stack);
      this.showStatus(error.message, 'error');
    }
  }

  clearScript() {
    this.scriptInput.value = '';
    this.engine.stack = [];
    this.renderStack();
    this.clearStatus();
  }

  async shareScript() {
    const script = this.scriptInput.value.trim();
    if (!script) {
      this.showStatus('No script to share.', 'error');
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('script', script);

    try {
      await navigator.clipboard.writeText(url.toString());
      this.showStatus('Share URL copied to clipboard.', 'success');
    } catch {
      this.showStatus('Clipboard unavailable. Copy the URL from the address bar after sharing.', 'error');
      window.history.replaceState(null, '', url.toString());
    }
  }

  loadSample(type) {
    const script = this.engine.sampleScripts[type];
    if (!script) return;
    this.scriptInput.value = script;
    this.showStatus(`Loaded sample: ${type}.`, 'success');
  }

  loadScriptFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const script = params.get('script');
    if (!script) return;
    this.scriptInput.value = script;
    this.runScript();
  }

  renderOpcodes() {
    this.opcodesGrid.textContent = '';
    const categories = [...new Set(Object.values(this.engine.opcodes).map((opcode) => opcode.category))];

    categories.forEach((category) => {
      const title = document.createElement('h3');
      title.textContent = category;
      title.style.gridColumn = '1 / -1';
      this.opcodesGrid.appendChild(title);

      Object.entries(this.engine.opcodes)
        .filter(([, opcode]) => opcode.category === category)
        .forEach(([name, opcode]) => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'opcode-card';
          card.addEventListener('click', () => this.insertOpcode(name));

          const opcodeName = document.createElement('div');
          opcodeName.className = 'opcode-name';
          opcodeName.textContent = name;

          const description = document.createElement('div');
          description.className = 'opcode-desc';
          description.textContent = opcode.description;

          card.appendChild(opcodeName);
          card.appendChild(description);
          this.opcodesGrid.appendChild(card);
        });
    });
  }

  insertOpcode(opcodeName) {
    const existing = this.scriptInput.value.trim();
    this.scriptInput.value = existing ? `${existing} ${opcodeName}` : opcodeName;
    this.scriptInput.focus();
  }

  renderStack(stack = this.engine.stack) {
    this.stackContainer.textContent = '';

    if (!stack || stack.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-stack';
      empty.textContent = 'Stack will appear here when you run a script.';
      this.stackContainer.appendChild(empty);
      return;
    }

    stack.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'stack-item';

      const value = document.createElement('span');
      value.textContent = item;

      const label = document.createElement('span');
      label.textContent = `#${stack.length - index}`;

      row.appendChild(value);
      row.appendChild(label);
      this.stackContainer.appendChild(row);
    });
  }

  showStatus(message, type) {
    this.status.textContent = '';
    const box = document.createElement('div');
    box.className = `status ${type}`;
    box.textContent = message;
    this.status.appendChild(box);
  }

  clearStatus() {
    this.status.textContent = '';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new PlaygroundUI(new BitcoinScriptEngine());
});
