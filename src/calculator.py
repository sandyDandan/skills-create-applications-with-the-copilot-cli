#!/usr/bin/env python3
"""
src/calculator.py

Python CLI calculator

Supported operations:
- add
- subtract
- multiply
- divide

Usage:
  python src/calculator.py add 2 3
  python src/calculator.py divide 5 2

Exit codes:
 0 - success
 1 - invalid arguments
 2 - runtime error (e.g., division by zero)
"""

import sys
import argparse


def add(a, b):
    """Return a + b"""
    return a + b


def subtract(a, b):
    """Return a - b"""
    return a - b


def multiply(a, b):
    """Return a * b"""
    return a * b


def divide(a, b):
    """Return a / b; raise ZeroDivisionError on division by zero"""
    if b == 0:
        raise ZeroDivisionError("division by zero")
    return a / b


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Simple Python CLI calculator")
    parser.add_argument('operation', choices=['add', 'subtract', 'multiply', 'divide'],
                        help='operation to perform')
    parser.add_argument('num1', type=float, help='first operand (number)')
    parser.add_argument('num2', type=float, help='second operand (number)')
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    a = args.num1
    b = args.num2

    try:
        if args.operation == 'add':
            result = add(a, b)
        elif args.operation == 'subtract':
            result = subtract(a, b)
        elif args.operation == 'multiply':
            result = multiply(a, b)
        elif args.operation == 'divide':
            result = divide(a, b)
        else:
            print(f"Unknown operation: {args.operation}", file=sys.stderr)
            return 1

        # Print integer results without decimal when appropriate
        if isinstance(result, float) and result.is_integer():
            print(int(result))
        else:
            print(result)

        return 0

    except ZeroDivisionError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 2
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 2


if __name__ == '__main__':
    sys.exit(main())
