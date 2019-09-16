(function () {
    "use strict";

    var display = document.getElementById("display");

    // State enum.
    var state = {
        ADD: 1,
        NEW: 2
    };

    // Operator enum.
    var operator = {
        ADD: 1,
        SUBTRACT: 2,
        MULTIPLY: 3,
        DIVIDE: 4
    }

    var currState = state.NEW;

    // Record number before start new number.
    var firstNumber = null;
    var currOperator = null;

    function onNumPress(num) {
        if (currState === state.NEW) {
            display.innerText = num;
            currState = state.ADD;
        }
        else {
            display.innerText = display.innerText + num;
        }
    }

    function clearDisplay() {
        display.innerText = "0";
        firstNumber = null;
        currState = state.NEW;
    }

    function performOperation() {
        switch (currOperator) {
            case operator.ADD:
                return firstNumber + parseFloat(display.innerText);
            case operator.SUBTRACT:
                return firstNumber - parseFloat(display.innerText);
            case operator.DIVIDE:
                return firstNumber / parseFloat(display.innerText);
            case operator.MULTIPLY:
                return firstNumber * parseFloat(display.innerText);
        }
    }

    function opertionPrototype(operation) {
        if (firstNumber === null) {
            firstNumber = parseFloat(display.innerText);
            currState = state.NEW;
        }
        else {
            // When user change the operator before entering next number.
            if (currState !== state.ADD) {
            }
            else {
                display.innerText = performOperation(currOperator);
                firstNumber = parseFloat(display.innerText);
                currState = state.NEW;
            }
        }
        currOperator = operation;
    }

    function plusOp() {
        opertionPrototype(operator.ADD);
    }

    function minusOp() {
        opertionPrototype(operator.SUBTRACT);
    }

    function multiplyOp() {
        opertionPrototype(operator.MULTIPLY);
    }

    function divideOp() {
        opertionPrototype(operator.DIVIDE);
    }

    function init() {
        var btns = document.getElementsByClassName("number");
        btns = Array.from(btns);

        // Attach number button listener
        for (var i = 0; i < btns.length; i++) {
            (function () {
                var button = btns[i];
                button.addEventListener("click", function () {
                    onNumPress(button.innerText)
                }, false);
            }());
        };

        // Attach operator button listeners
        var plus = document.getElementById("plus");
        plus.addEventListener("click", plusOp);

        var minus = document.getElementById("minus");
        minus.addEventListener("click", minusOp);

        var divide = document.getElementById("divide");
        divide.addEventListener("click", divideOp);

        var multiply = document.getElementById("multiply");
        multiply.addEventListener("click", multiplyOp);

        var clear = document.getElementById("clear");
        clear.addEventListener("click", clearDisplay);
    }

    window.addEventListener("load", init, false);
})();

// attribution: http://khoury.neu.edu/~ntuck/courses/2019/09/cs5610/notes/02-browsers/page/code2.js