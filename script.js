const screen = document.querySelector('.calculator-screen');
        const historyDisplay = document.querySelector('#history');

        window.onload = function() {
            if (localStorage.getItem('screenValue')) {
                screen.value = localStorage.getItem('screenValue');
            }
            if (localStorage.getItem('history')) {
                historyDisplay.textContent = localStorage.getItem('history');
            }
        };

        function updateLocalStorage() {
            localStorage.setItem('screenValue', screen.value);
            localStorage.setItem('history', historyDisplay.textContent);
        }

        function appendNumber(number) {
            screen.value += number;
            updateLocalStorage();
        }

        function appendOperation(operation) {
            screen.value += " " + operation + " ";
            historyDisplay.textContent = screen.value;
            updateLocalStorage();
        }

        function appendDot() {
            screen.value += ".";
            updateLocalStorage();
        }

        function calculateResult() {
            try {
                const expression = screen.value;
                if (expression.includes('/ 0')) {
                    throw new Error("Деление на 0");
                }
                let result = eval(expression.replace('×', '*').replace('÷', '/'));
                if (!isFinite(result)) {
                    throw new Error("Ошибка");
                }
                result = parseFloat(result.toPrecision(12)).toString(); // формируем число
                historyDisplay.textContent = expression;
                screen.value = result;
                updateLocalStorage();
            } catch {
                screen.value = "Ошибка";
            }
        }

        function clearAll() {
            screen.value = "";
            historyDisplay.textContent = "";
            updateLocalStorage();
        }

        function deleteLast() {
            screen.value = screen.value.slice(0, -1);
            updateLocalStorage();
        }
