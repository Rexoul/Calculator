function toggleOutput() {
    var button = document.getElementById('toggleButton');
    if (button.value === 'Decimal') {
        button.value = 'Fraction';
    } else {
        button.value = 'Decimal';
    }
    calculateResult();
}

function calculateResult() {
    var display = document.getElementById('display');
    var expression = display.value;
    var result;

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

function fraction(decimal) {
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