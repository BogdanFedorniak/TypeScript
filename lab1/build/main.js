function triangle(value1, type1, value2, type2) {
    if (value1 <= 0 || value2 <= 0) {
        console.log('Значення аргументів повинні бути додатніми.');
        return "failed";
    }
    var a, b, c, alpha, beta;
    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        if (type1 === "leg") {
            a = value1;
            c = value2;
        }
        else {
            a = value2;
            c = value1;
        }
        // Перевірка на більшу гіпотенузу
        if (c <= a) {
            console.log('Гіпотенуза має бути більшою за катет.');
            return "failed";
        }
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        alpha = Math.asin(a / c);
        beta = Math.acos(a / c);
    }
    else if ((type1 === "leg" && type2 === "angle") || (type1 === "angle" && type2 === "leg")) {
        var leg = void 0, angle = void 0;
        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        }
        else {
            leg = value2;
            angle = value1;
        }
        // Перевірка на гострий кут
        if (angle <= 0 || angle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }
        angle = angle * (Math.PI / 180);
        a = leg;
        alpha = angle;
        b = a * Math.tan(alpha);
        c = a / Math.sin(alpha);
        beta = Math.acos(a / c);
    }
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        var hypotenuse = void 0, angle = void 0;
        if (type1 === "hypotenuse") {
            hypotenuse = value1;
            angle = value2;
        }
        else {
            hypotenuse = value2;
            angle = value1;
        }
        // Перевірка на гострий кут
        if (angle <= 0 || angle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }
        angle = angle * (Math.PI / 180);
        c = hypotenuse;
        a = c * Math.cos(angle);
        b = c * Math.sin(angle);
        alpha = angle;
        beta = Math.acos(a / c);
    }
    else if ((type1 === "opposite angle" && type2 === "leg") || (type1 === "leg" && type2 === "opposite angle")) {
        var oppositeAngle = void 0, leg = void 0;
        if (type1 === "opposite angle") {
            oppositeAngle = value1;
            leg = value2;
        }
        else {
            oppositeAngle = value2;
            leg = value1;
        }
        // Перевірка на гострий кут
        if (oppositeAngle <= 0 || oppositeAngle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }
        oppositeAngle = oppositeAngle * (Math.PI / 180);
        a = leg;
        alpha = oppositeAngle;
        b = a * Math.tan(alpha);
        c = a / Math.sin(alpha);
        beta = Math.acos(a / c);
    }
    else {
        console.log('Некоректна комбінація аргументів.');
        return "failed";
    }
    console.log("a = ".concat(a.toFixed(2)));
    console.log("b = ".concat(b.toFixed(2)));
    console.log("c = ".concat(c.toFixed(2)));
    console.log("alpha = ".concat((alpha * (180 / Math.PI)).toFixed(2), " \u0433\u0440\u0430\u0434\u0443\u0441\u0456\u0432"));
    console.log("beta = ".concat((beta * (180 / Math.PI)).toFixed(2), " \u0433\u0440\u0430\u0434\u0443\u0441\u0456\u0432"));
    console.log("'success'");
    return "success";
}
// Виклики функції з іншими значеннями
triangle(5, "leg", 2, "hypotenuse"); // Перевірка гіпотенузи
triangle(9, "leg", 90, "angle"); // Перевірка гострого кута
triangle(7, "hypotenuse", 15, "angle"); // Інші значення
