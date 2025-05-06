"use strict";
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
function triangle(value1, type1, value2, type2) {
    const radToDeg = (radians) => radians * (180 / Math.PI);
    const getKey = (type1, type2) => `${type1}_${type2}`;
    let hypotenuse, leg1, leg2, angle1, angle2;
    if (value1 <= 0 || value2 <= 0) {
        console.log("Дані не можуть бути нижчі за 0 чи дорівнювати йому. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
        return "failed";
    }
    switch (getKey(type1, type2)) {
        case "leg_leg":
            leg1 = Math.min(value1, value2);
            leg2 = Math.max(value1, value2);
            hypotenuse = Math.sqrt(leg1 ** 2 + leg2 ** 2);
            angle1 = Math.atan(leg1 / leg2);
            angle2 = Math.PI / 2 - angle1;
            break;
        case "leg_hypotenuse":
        case "hypotenuse_leg":
            leg1 = type1 === "leg" ? value1 : value2;
            hypotenuse = type1 === "hypotenuse" ? value1 : value2;
            if (hypotenuse < leg1) {
                console.log("Катет не може бути більшим за гіпотенузу. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
                return "failed";
            }
            leg2 = Math.sqrt(hypotenuse ** 2 - leg1 ** 2);
            angle2 = Math.asin(leg1 / hypotenuse);
            angle1 = Math.PI / 2 - angle2;
            break;
        case "leg_opposite angle":
        case "opposite angle_leg":
            leg1 = type1 === "leg" ? value1 : value2;
            angle2 = degToRad(type1 === "opposite angle" ? value1 : value2);
            hypotenuse = leg1 / Math.sin(angle2);
            leg2 = leg1 / Math.tan(angle2);
            angle1 = Math.PI / 2 - angle2;
            break;
        case "leg_adjacent angle":
        case "adjacent angle_leg":
            leg1 = type1 === "leg" ? value1 : value2;
            angle1 = degToRad(type1 === "adjacent angle" ? value1 : value2);
            hypotenuse = leg1 / Math.cos(angle1);
            leg2 = leg1 * Math.tan(angle1);
            angle2 = Math.PI / 2 - angle1;
            break;
        case "hypotenuse_angle":
        case "angle_hypotenuse":
            hypotenuse = type1 === "hypotenuse" ? value1 : value2;
            angle1 = degToRad(type1 === "angle" ? value1 : value2);
            leg1 = hypotenuse * Math.cos(angle1);
            leg2 = hypotenuse * Math.sin(angle1);
            angle2 = Math.PI / 2 - angle1;
            break;
        default:
            console.log("Ти ввів несумісну пару параметрів трикутника. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
            return "failed";
    }
    let alpha = radToDeg(angle1);
    let beta = radToDeg(angle2);
    if (alpha >= 90 || beta >= 90) {
        console.log("Кут не може бути більший за 90 чи дорівнювати йому. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
        return "failed";
    }
    console.log(`a = ${leg1.toFixed(3)}`);
    console.log(`b = ${leg2.toFixed(3)}`);
    console.log(`c = ${hypotenuse.toFixed(3)}`);
    console.log(`alpha = ${alpha.toFixed(3)}°`);
    console.log(`beta = ${beta.toFixed(3)}°`);
    return "success";
}
console.log("Ця консольна програма дозволяє обчислити прямокутний трикутник за заданими параметрами.");
console.log("Можливі комбінації типів:");
console.log("\t'leg' 'leg': Два катети.");
console.log("\t'leg' 'hypotenuse': Катет і гіпотенуза.");
console.log("\t'leg' 'opposite angle': Катет і протилежний кут.");
console.log("\t'leg' 'adjacent angle': Катет і прилеглий кут.");
console.log("\t'hypotenuse' 'angle': Гіпотенуза і гострий кут.");
console.log("Використання: triangle(value1, type1, value2, type2)");
console.log("Приклад: triangle(7, 'leg', 18, 'hypotenuse')");
