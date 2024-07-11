function toggleOutput() {
    var button = document.getElementById('toggleButton');
    if (button.value === 'Decimal') {
        button.value = 'Fraction';
    } else {
        button.value = 'Decimal';
    }
    calculateResult();
}
document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
    const key = event.key;
    const display = document.getElementById('display');
    if (['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Delete', 'Escape'].includes(key)) {
        event.preventDefault();
    }

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            display.value += key;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            display.value += key;
            break;
        case '=':
        case 'Enter':
            calculateResult();
            break;
        case 'Backspace':
            display.value = display.value.slice(0, -1);
            break;
        case 'Delete':
        case 'Escape':
            display.value = '';
            break;
        default:
            break;
    }
}
function calculateResult() {
    var display = document.getElementById('display');
    var expression = display.value;
    var result;

    if (expression) {  
        try {
            result = eval(expression);  
            if (document.getElementById('toggleButton').value === 'Fraction') {
                result = fraction(result);
            }
        } catch (e) {
            result = 'Error';
        }

        display.value = result;
    }
}

function fraction(decimal) {
    if (Number.isInteger(decimal)) {
        return decimal.toString();
    }
    var tolerance = 1.0E-6;
    var h1 = 1,
        h2 = 0,
        k1 = 0,
        k2 = 1;
    var b = decimal;
    do {
        var a = Math.floor(b);
        var aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    return h1 + "/" + k1;
}
