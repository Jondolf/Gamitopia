<template>
  <div class="calculator">
    <button @click="$emit('toggle-fullscreen')" class="toggle-fullscreen-button">
      <i class="material-icons">{{ isFullscreen ? 'fullscreen' : 'fullscreen_exit' }}</i>
    </button>

    <CalculatorInput
      @toggle-is-deg="toggleIsDegAndSetCalculation()"
      :calculation="calculation"
      :currentResult="currentResult"
      :isDeg="calculator.isDeg"
    />
    <CalculatorMoreCommandsMenu
      @open-menu="isMoreCommandsMenuOpen = true"
      @close-menu="isMoreCommandsMenuOpen = false"
      @toggle-menu="isMoreCommandsMenuOpen = !isMoreCommandsMenuOpen"
      @add-symbol-to-calculation="addSymbolToCalculation"
      :isMenuOpen="isMoreCommandsMenuOpen"
    />
    <CalculatorButtonContainer
      @add-symbol-to-calculation="addSymbolToCalculation"
      @remove-symbol-from-calculation="handleBackspaceEvent()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorMoreCommandsMenu from '@/components/games/calculator/CalculatorMoreCommandsMenu.vue';
import CalculatorButtonContainer from '@/components/games/calculator/CalculatorButtonContainer.vue';
import CalculatorInput from '@/components/games/calculator/CalculatorInput.vue';
import { Calculator } from '@/components/games/calculator/calculator';
import Decimal from 'decimal.js';

export default defineComponent({
  name: 'Calculator',

  components: {
    CalculatorMoreCommandsMenu,
    CalculatorButtonContainer,
    CalculatorInput
  },

  props: {
    isFullscreen: Boolean
  },

  data() {
    return {
      calculator: new Calculator(),
      calculation: '0',
      currentResult: '',
      isMoreCommandsMenuOpen: false
    };
  },

  methods: {
    toggleIsDegAndSetCalculation() {
      this.calculator.isDeg = !this.calculator.isDeg;
      this.calculation === '0'
        ? this.resetCalculation()
        : (this.currentResult = `=${this.calculator.countCalculation(this.calculation).toString()}`);
    },

    addSymbolToCalculation(symbol: string | number): void {
      if (symbol === 'Enter') {
        return;
      }

      const operators = ['+', '-', 'x', '÷', '^', 'mod', 'sin', 'cos', 'tan', 'log', 'ln', 'lg'];
      const numberSymbols = '0123456789πe';
      const lastSymbolOfCalc = this.calculation[this.calculation.length - 1];

      // Don't allow two operators in a row
      if (operators.includes(symbol.toString()) && operators.includes(lastSymbolOfCalc.toString())) {
        return;
      }
      // Don't allow operator as first symbol (except minus symbol)
      if (operators.includes(symbol.toString()) && this.calculation === '0' && symbol !== '-') {
        return;
      }
      // Parentheses restrictions
      if (
        symbol === '(' &&
        (numberSymbols.includes(lastSymbolOfCalc.toString()) || lastSymbolOfCalc === ')') &&
        this.calculation !== '0'
      ) {
        return;
      } else if (symbol === ')' && operators.includes(lastSymbolOfCalc)) {
        return;
      } else if (operators.includes(symbol.toString()) && lastSymbolOfCalc === '(' && symbol !== '-') {
        return;
      }
      // Don't allow numbers right after closing parentheses
      if (numberSymbols.includes(symbol.toString()) && lastSymbolOfCalc === ')') {
        return;
      }
      // Calculate calculation and clear current result field if equals symbol is pressed
      if (symbol.toString() === '=') {
        this.calculation = `=${this.formatNumber(this.countCalculation())}`;
        this.currentResult = '';
        return;
      }
      // Reset calculation to defaults if first symbol of calculation is equals but equals symbol isn't pressed
      if (this.calculation[0] === '=') {
        this.resetCalculation();
      }
      // Remove initial zero before first symbol is added
      if (this.calculation === '0') {
        this.calculation = '';
      }
      this.calculation += symbol.toString();
      this.currentResult = `=${this.formatNumber(this.countCalculation())}`;
    },

    handleBackspaceEvent(): void {
      if (this.calculation.length === 1 || this.calculation[0] === '=') {
        this.resetCalculation();
      } else if (this.checkIfTwoCharMathFunction()) {
        this.calculation = this.calculation.slice(0, this.calculation.length - 2);
        this.calculation === '' ? this.resetCalculation() : this.calculation;
      } else if (this.checkIfThreeCharMathFunction()) {
        this.calculation = this.calculation.slice(0, this.calculation.length - 3);
        this.calculation === '' ? this.resetCalculation() : this.calculation;
      } else {
        this.calculation = this.removeLastChar(this.calculation);
      }
      if (this.calculation !== '0') {
        this.currentResult = `=${this.formatNumber(this.countCalculation())}`;
      }
    },

    countCalculation(): string {
      const result = this.calculator.countCalculation(this.calculation);
      const significantDigits = 15;
      const amountOfDigits: number = result.toString().replace(/\./g, '').length;
      const roundedResult =
        amountOfDigits > significantDigits
          ? result.toPrecision(significantDigits) // If there are more digits than significantDigits, use scientific notation
          : result.toFixed(); // Else just remove leftover zeroes
      return roundedResult;
    },

    formatNumber(num: number | string | Decimal): string {
      const numSplitAtDot = num.toString().includes('.') ? num.toString().split('.') : [num.toString()];
      // Add spaces between digits, but not to the digits e.g. 1 250 010.12504
      const formattedNum =
        numSplitAtDot.length === 1
          ? this.addSpacesToNumber(numSplitAtDot[0])
          : `${this.addSpacesToNumber(numSplitAtDot[0])}.${numSplitAtDot[1]}`;
      return formattedNum;
    },

    addSpacesToNumber(num: number | string | Decimal): string {
      // First remove all spaces, then add the correct spaces
      return num
        .toString()
        .replace(/ /, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    removeLastChar(str: string): string {
      return str.substring(0, str.length - 1);
    },

    resetCalculation(): void {
      this.calculation = '0';
      this.currentResult = '';
    },

    // Used for deleting entire words
    checkIfTwoCharMathFunction(): boolean {
      const twoCharMathFunctions = 'ln lg';
      const twoLastLettersOfCalculation = this.calculation.slice(this.calculation.length - 2);
      return twoCharMathFunctions.includes(twoLastLettersOfCalculation);
    },
    // Used for deleting entire words
    checkIfThreeCharMathFunction(): boolean {
      const threeCharMathFunctions = 'mod sin cos tan log';
      const threeLastLettersOfCalculation = this.calculation.slice(this.calculation.length - 3);
      return threeCharMathFunctions.includes(threeLastLettersOfCalculation);
    },

    handleEvent(e: KeyboardEvent): void {
      /*
    If route has changed, remove keydown eventlistener. ngOnDestroy doesn't really work anymore, because Ionic keeps previous pages running.
    This made typing into other pages' inputs (on keyboard) impossible because the event listener with preventDefault() was still there.
    */
      e.preventDefault();
      if (e.key === ' ') {
        return;
      }
      // Numbers
      if (+e.key >= 0 && +e.key <= 9) {
        this.addSymbolToCalculation(e.key);
      }
      // Plus, minus, pow, percent, factorial
      if ('+-^%!'.includes(e.key)) {
        this.addSymbolToCalculation(e.key);
      }
      // Multiply and divide
      if (e.key === '*' || e.key === '/') {
        this.addSymbolToCalculation(e.key === '*' ? 'x' : '÷');
      }
      // Decimal separator
      if (e.key === '.') {
        this.addSymbolToCalculation(e.key);
      }
      // Parentheses
      if (e.key === '(' || e.key === ')') {
        this.addSymbolToCalculation(e.key);
      }
      // Get result
      if (this.calculation[0] !== '=' && (e.key === 'Enter' || e.key === '=')) {
        if (this.calculation[0] !== '=') {
          this.calculation = `=${this.formatNumber(this.countCalculation())}`;
        }
        this.currentResult = '';
      }
      // Remove
      if (e.key === 'Backspace') {
        this.handleBackspaceEvent();
      }
    }
  },

  mounted() {
    document.addEventListener('keydown', this.handleEvent);
  },

  unmounted() {
    document.removeEventListener('keydown', this.handleEvent);
  }
});
</script>

<style lang="scss" scoped>
.calculator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;

  .toggle-fullscreen-button {
    background: rgba(68, 204, 255, 0);
    border: none;
    border-radius: 50%;
    transition: 0.2s ease-out;
    outline: none;
    width: 40px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    &:active {
      background-color: rgba(68, 204, 255, 0.25);
    }

    i {
      color: black;
      font-size: 32px;
    }
  }
}
</style>
