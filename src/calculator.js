#!/usr/bin/env node
/**
 * src/calculator.js
 *
 * Node.js CLI calculator (app)
 * Supported operations:
 * - add
 * - subtract
 * - multiply
 * - divide
 *
 * Usage:
 *   calculator add 2 3
 *   calculator subtract 5 2
 *   calculator multiply 4 2
 *   calculator divide 5 2
 *
 * Flags:
 *   -h, --help     Show help
 *   -v, --version  Show version (reads package.json when available)
 */

const fs = require('fs');
const path = require('path');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function getVersion() {
  try {
    // Attempt to read package.json relative to repo root
    const pkgPath = path.resolve(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version || '0.0.0';
  } catch (_) {
    return '0.0.0';
  }
}

function printUsage() {
  console.log('Calculator CLI — supports: add, subtract, multiply, divide');
  console.log('Usage: calculator <operation> <num1> <num2>');
  console.log('Flags: -h, --help    Show help');
  console.log('       -v, --version Show version');
}

function runCLI(argv) {
  const args = argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printUsage();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    console.log(getVersion());
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Invalid number of arguments.');
    printUsage();
    process.exit(1);
  }

  const [opRaw, n1Raw, n2Raw] = args;
  const op = opRaw.toLowerCase();
  const a = parseFloat(n1Raw);
  const b = parseFloat(n2Raw);

  if (!isFinite(a) || !isFinite(b)) {
    console.error('Both operands must be valid finite numbers.');
    process.exit(1);
  }

  try {
    let result;
    switch (op) {
      case 'add':
      case '+':
        result = add(a, b);
        break;
      case 'subtract':
      case 'sub':
      case '-':
        result = subtract(a, b);
        break;
      case 'multiply':
      case 'mul':
      case '*':
        result = multiply(a, b);
        break;
      case 'divide':
      case 'div':
      case '/':
        result = divide(a, b);
        break;
      default:
        console.error(`Unknown operation: ${opRaw}`);
        printUsage();
        process.exit(1);
    }

    // Print integer results without a decimal point
    if (Number.isFinite(result) && Number.isInteger(result)) {
      console.log(result);
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
}

if (require.main === module) {
  runCLI(process.argv);
}

module.exports = { add, subtract, multiply, divide, runCLI };
