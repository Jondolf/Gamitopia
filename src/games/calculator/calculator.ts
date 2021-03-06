import Decimal from 'decimal.js';

export class Calculator {
  isDeg = false; // Default is radians but can be changed to degrees

  countCalculation(calculation: string): Decimal | number {
    try {
      this.checkForInvalidMathFunctions(calculation);
      const formattedCalculation = this.formatCalculation(calculation);
      this.checkIfAllParenthesesClosed(formattedCalculation);
      const result: Decimal = this.countPlus(formattedCalculation);
      return result;
    } catch {
      return NaN;
    }
  }

  /**
   * Checks if the calculation given by the user includes the one letter versions of the mathematical functions.
   * If yes, it should throw an error.
   */
  private checkForInvalidMathFunctions(calculation: string): void | Error {
    const invalidFunctions = ['a', 'b', 'c', 'd', 'f', 'h', 'i', 'm'];
    if (invalidFunctions.some(mathFunc => calculation.includes(mathFunc + '(')) && calculation) {
      throw new Error('Incorrect math function name.');
    }
  }

  private checkIfAllParenthesesClosed(calculation: string): void | Error {
    if (calculation.replace(/[^(]/g, '').length !== calculation.replace(/[^)]/g, '').length) {
      throw new Error('All parentheses must be closed.');
    }
  }

  /**
   * Replaces calculation symbols with working code math operators (*, / etc.) instead of x and ÷ etc.
   * Each of these "commands" has to be one symbol long, so the letters for sin, cos, tan, log, ln and lg are alphabetically chosen,
   * but some letters (like e) were skipped to avoid problems where the letter was already in use.
   */
  private formatCalculation(calculation: string): string {
    return calculation
      .replace(/x/g, '*').replace(/÷/g, '/').replace(/mod/g, 'm') // multiply, divide, modulo
      .replace(/sin/g, 'a').replace(/cos/g, 'b').replace(/tan/g, 'c') // sin, cos, tan
      .replace(/log/g, 'd').replace(/ln/g, 'f').replace(/lg/g, 'h') // log base 10, log base e, log base 2 (the letters are random)
      .replace(/abs/g, 'i') // abs
      .replace(/sqrt/g, '√').replace(/pi/g, 'π')
      .replace(/([0-9πe])π/g, '$1*π').replace(/([0-9πe])e/g, '$1*e') // Replace ππ and ee with π*π and e*e
      .replace(/(\))([(0-9πe])/g, '$1*$2') // Replace calculations like (5+5)2 and (5+5)(1+1) with (5+5)*2 and (5+5)*(1+1)
      .replace(/([0-9πe])(\()/g, '$1*$2') // Replace calculations like 3(5+5) with 3*(5+5)
      .replace(/(\))([%])/g, '$1/100'); // Replace calculations like (2+3)% with (2+3)/100;
  }

  private split(calculation: string, operator: string): string[] {
    const result = [];
    let braces = 0;
    let currentChunk = '';
    for (const currentChar of calculation) {
      if (currentChar === '(') {
        braces++;
      } else if (currentChar === ')') {
        braces--;
      }
      if (braces === 0 && operator === currentChar) {
        result.push(currentChunk);
        currentChunk = '';
      } else { currentChunk += currentChar; }
    }
    if (currentChunk !== '') {
      result.push(currentChunk);
    }
    if (operator === '-' && result[0] === '') {
      result[0] = '0';
    }
    return result;
  }

  // +, -, *, /, **, %
  private countPlus(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, '+');
    const numbers: Decimal[] = numberStrings.map((numberString: string) => this.countMinus(numberString));
    const intitialValue = new Decimal(0.0);
    const result = numbers.reduce((acc: Decimal, num: Decimal) => acc.plus(num), intitialValue);
    return result;
  }
  // -, *, /, **, %
  private countMinus(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, '-');
    const numbers: Decimal[] = numberStrings.map((numberString: string) => this.countMultiply(numberString));
    const intitialValue = new Decimal(numbers[0]);
    const result = numbers.slice(1).reduce((acc: Decimal, num: Decimal) => acc.minus(num), intitialValue);
    return result;
  }
  // *, /, **, %
  private countMultiply(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, '*');
    const numbers: Decimal[] = numberStrings.map((numberString: string) => this.countDivide(numberString));
    const intitialValue = new Decimal(1.0);
    const result = numbers.reduce((acc: Decimal, num: Decimal) => acc.mul(num), intitialValue);
    return result;
  }
  // /, **, %
  private countDivide(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, '/');
    const numbers: Decimal[] = numberStrings.map((numberString: string) => this.countPow(numberString));
    const intitialValue = new Decimal(numbers[0]);
    const result = numbers.slice(1).reduce((acc: Decimal, num: Decimal) => acc.div(num), intitialValue);
    return result;
  }
  // **, %
  private countPow(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, '^');
    const numbers: Decimal[] = numberStrings.map((numberString: string) => this.countModulo(numberString));
    const intitialValue = new Decimal(numbers[0]);
    const result = numbers.slice(1).reduce((acc: Decimal, num: Decimal) => acc.pow(num), intitialValue);
    return result;
  }
  // %
  private countModulo(calculation: string): Decimal {
    const numberStrings: string[] = this.split(calculation, 'm'); // m means modulo here because % is already it's own command
    const numbers: Decimal[] = numberStrings.map((numberString: string) => {
      if (numberString[0] === '(') {
        const calc = numberString.substr(1, numberString.length - 2);
        // Recursive
        return this.countPlus(calc);
      }
      if (numberString === 'π') {
        return Decimal.acos(-1); // pi
      }
      if (numberString === 'e') {
        return Decimal.exp(1); // euler
      }

      if (numberString.length > 1) {
        // Mathematical functions, like sin(...)
        const calculatedStringAfterMathFunction: Decimal = this.countPlus(numberString.substring(1, numberString.length));
        switch (numberString[0]) {
          case '√': // square root
            return Decimal.sqrt(calculatedStringAfterMathFunction);
          /*
          sin, cos, tan, log, ln and lg have the "new Decimal(new Decimal(...).toFixed(50).toFixed())" to avoid problems with pi and euler.
          For example, with a calculation like sin(π) the result would be very, very close to zero but not quite.
          The same thing happens with ln(e). It returns 0.9999999999999999999...
          I round the result at 50 decimals to avoid this problem. It's a bit ugly, but the only properly working solution I could find.
          */
          case 'a': // sin
            return new Decimal(new Decimal(this.isDeg
              ? Decimal.sin(this.convertToRadians(calculatedStringAfterMathFunction)).toFixed(50)
              : Decimal.sin(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'b': // cos
            return new Decimal(new Decimal(this.isDeg ?
              Decimal.cos(this.convertToRadians(calculatedStringAfterMathFunction)).toFixed(50)
              : Decimal.cos(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'c': // tan
            return new Decimal(new Decimal(this.isDeg
              ? Decimal.tan(this.convertToRadians(calculatedStringAfterMathFunction)).toFixed(50)
              : Decimal.tan(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'd': // log
            return new Decimal(new Decimal(Decimal.log10(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'f': // ln
            return new Decimal(new Decimal(Decimal.ln(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'h': // lg
            return new Decimal(new Decimal(Decimal.log2(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
          case 'i': // abs
            return new Decimal(new Decimal(Decimal.abs(calculatedStringAfterMathFunction).toFixed(50)).toFixed());
        }
      }
      // Mathematical functions where the function is after the number, like 25% or 10!
      const stringBeforeMathFunction: string = numberString.substring(0, numberString.length - 1);
      switch (numberString[numberString.length - 1]) {
        case '%': // percent
          return this.countPlus(stringBeforeMathFunction).div(100);
        case '!': // factorial
          return this.countFactorial(this.countPlus(stringBeforeMathFunction));
      }
      return new Decimal(numberString);
    });
    const intitialValue = new Decimal(numbers[0]);
    const result = numbers.slice(1).reduce((acc: Decimal, num: Decimal) => acc.mod(num), intitialValue);
    return result;
  }

  private countFactorial(num: Decimal): Decimal {
    // Avoid ridiculously large numbers for better performance
    if (num.greaterThan(200)) {
      return new Decimal(Infinity);
    }
    let result = new Decimal(1);
    for (let i = 2; new Decimal(i).lessThanOrEqualTo(num); i++) {
      result = result.times(i);
    }
    return result;
  }

  private convertToRadians(angle: Decimal): Decimal {
    return angle.mul(Decimal.acos(-1).div(new Decimal(180)));
  }
}