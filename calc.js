document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.querySelector('.result');
    const buttons = document.querySelectorAll('button');
    const body = document.body;
    const toggleSwitch = document.getElementById('toggle_switch');

    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if ((buttonText >= '0' && buttonText <= '9') || buttonText === '.') {
                if (resultDisplayed) {
                    resultDisplayed = false;
                    resultDisplay.textContent = buttonText === '.' ? '0.' : buttonText;
                } else {
                    if (buttonText === '.' && resultDisplay.textContent.includes('.')) return;
                    resultDisplay.textContent = resultDisplay.textContent === '0' ? buttonText : resultDisplay.textContent + buttonText;
                }
            } else if (buttonText === 'DEL') {
                resultDisplay.textContent = resultDisplay.textContent.slice(0, -1) || '0';
            } else if (buttonText === 'RESET') {
                firstOperand = '';
                secondOperand = '';
                currentOperator = '';
                resultDisplay.textContent = '0';
            } else if (buttonText === '=') {
                secondOperand = resultDisplay.textContent;
                if (firstOperand && secondOperand && currentOperator) {
                    const result = calculate(firstOperand, secondOperand, currentOperator);
                    resultDisplay.textContent = result.length > 16 ? 'error' : result;
                    firstOperand = result.length <= 16 ? result : '';
                    secondOperand = '';
                    currentOperator = '';
                    resultDisplayed = true;
                }
            } else {
                if (firstOperand && currentOperator) {
                    secondOperand = resultDisplay.textContent;
                    const result = calculate(firstOperand, secondOperand, currentOperator);
                    resultDisplay.textContent = result.length > 16 ? 'error' : result;
                    firstOperand = result.length <= 16 ? result : '';
                    secondOperand = '';
                } else {
                    firstOperand = resultDisplay.textContent;
                }
                currentOperator = getOperator(buttonText);
                resultDisplayed = true;
            }
        });
    });

    function calculate(first, second, operator) {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);
        let result;
        if (operator === '+') result = num1 + num2;
        if (operator === '-') result = num1 - num2;
        if (operator === 'x') result = num1 * num2;
        if (operator === '/') {
            if (num2 === 0) {
                result = 'Error';
            } else {
                result = num1 / num2;
                result = parseFloat(result.toFixed(5));  // Limit to 5 decimal places
            }
        }
        result = result.toString();
        return result.length > 16 ? 'error' : result;
    }

    function getOperator(symbol) {
        if (symbol === '+') return '+';
        if (symbol === '-') return '-';
        if (symbol === 'x') return 'x';
        if (symbol === '/') return '/';
    }

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            body.classList.add('button-white');
        } else {
            body.classList.remove('button-white');
        }
    });
});
