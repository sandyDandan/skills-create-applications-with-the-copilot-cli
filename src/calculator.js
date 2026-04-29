#!/usr/bin/env node
/**
 * src/calculator.js
 *
 * Node.js CLI calculator
 * Supported operations:
 * - add
 * - subtract
 * - multiply
 * - divide
 *
 * Usage:
 *   node src/calculator.js <operation> <num1> <num2>
 *
 * Examples:
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js divide 5 2     # 2.5
 */

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

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.error('Operations: add, subtract, multiply, divide');
}

function runCLI(argv) {
  const args = argv.slice(2);
  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [opRaw, n1Raw, n2Raw] = args;
  const op = opRaw.toLowerCase();
  const a = parseFloat(n1Raw);
  const b = parseFloat(n2Raw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Both operands must be valid numbers.');
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

    // Print result to stdout
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
}

// If run directly, execute CLI
if (require.main === module) {
  runCLI(process.argv);
}

// Export functions for testing or programmatic use
module.exports = { add, subtract, multiply, divide, runCLI };
