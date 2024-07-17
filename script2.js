document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    let currentNumber = '';
    let previousNumber = '';
    let operator = '';

    function updateDisplay(number) {
        display.innerText = number;
    }

    function appendNumber(number) {
        if (currentNumber === '0' && number === '0') return;
        currentNumber += number;
        updateDisplay(currentNumber);
    }

    function appendDot() {
        if (!currentNumber.includes('.')) {
            currentNumber += '.';
            updateDisplay(currentNumber);
        }
    }

    function setOperator(op) {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
            calculate();
        }
        operator = op;
        previousNumber = currentNumber;
        currentNumber = '';
    }

    function calculate() {
        if (currentNumber === '' || previousNumber === '' || operator === '') return;
        let result;
        let prev = parseFloat(previousNumber);
        let current = parseFloat(currentNumber);
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        updateDisplay(result);
        currentNumber = result;
        previousNumber = '';
        operator = '';
    }

    function backspace() {
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber === '') {
            currentNumber = '0';
        }
        updateDisplay(currentNumber);
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;
            if (!isNaN(value)) {
                appendNumber(value);
            } else if (value === '.') {
                appendDot();
            } else if (value === '←') {
                backspace();
            } else if (value === '=') {
                calculate();
            } else {
                setOperator(value);
            }
        });
    });

    updateDisplay('0');
});
