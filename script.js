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
            historyDisplay.textContent = screen.value; // Обновляем строку истории операции
            updateLocalStorage();
        }

        function appendDot() {
            screen.value += ".";
            updateLocalStorage();
        }

        function calculateResult() {
            try {
                const expression = screen.value;
                const result = eval(expression.replace('×', '*').replace('÷', '/'));
                historyDisplay.textContent = expression; // Показываем только операцию без результата
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