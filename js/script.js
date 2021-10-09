const atividades = {
    b: {
        firstArray: [
            [ 2,  3, -1],
            [-2, -3,  3],
            [ 1,  2,  1],
        ],
        middleArray: ["x", "y", "z"],
        lastArray: [-4, 10, 3],
        solution: {x: -2, y: 1, z: 3}
    },
    c: {
        firstArray: [
            [ 1, -2,  5],
            [-4,  2, -1],
            [ 1,  1,  1],
        ],
        middleArray: ["x", "y", "z"],
        lastArray: [-89, 20, 13],
        solution: {x: 7, y: 18, z: -12}
    },
    e: {
        firstArray: [
            [ 1,  1,  1],
            [ 2, -1, -2],
            [-1, -1, -5],
        ],
        middleArray: ["x", "y", "z"],
        lastArray: [-9, -16, 17],
        solution: {x: -9, y: 2, z: -2}
    },
}

let detA = [
    [1,  1, 1],
    [2, -1, 3],
    [1, -3 ,-1],
]

/*
00   01   02   00   01
10   11   12   10   11
20   21   22   20   21
= (00*11*22 + 01*12*20 + 02*10*21) - (01*10*22 + 00*12*21 + 02*11*20)

|1   1   1| 1   1
|2  -1   3| 2  -1
|1  -3  -1| 1  -3

= (1*-1*-1 + 1*3*1 + 1*2*-3) - (1*2*-1 + 1*3*-3 + 1*-1*1)
= (1 + 3 - 6) - (-2 - 9 -1)
= -2 - (-12)
= -2 + 12
= 10

*/

function putInsideParenteses(num){
    if(num < 0){
        return "("+num+")"
    } else {
        return ""+num
    }
}

function get3x3ArrayDeterminant(paramArray){
    
    const firstStep_logic = { // (a*b*c + d*e*f + g*h*i) - (j*k*l + m*n*o + p*q*r)
        a: paramArray[0][0],
        b: paramArray[1][1],
        c: paramArray[2][2],
        d: paramArray[0][1],
        e: paramArray[1][2],
        f: paramArray[2][0],
        g: paramArray[0][2],
        h: paramArray[1][0],
        i: paramArray[2][1],
        j: paramArray[0][1],
        k: paramArray[1][0],
        l: paramArray[2][2],
        m: paramArray[0][0],
        n: paramArray[1][2],
        o: paramArray[2][1],
        p: paramArray[0][2],
        q: paramArray[1][1],
        r: paramArray[2][0],
    }
    const secondStep_logic = { // (a + b + c) - (d + e + f)
        a: firstStep_logic.a * firstStep_logic.b * firstStep_logic.c,
        b: firstStep_logic.d * firstStep_logic.e * firstStep_logic.f,
        c: firstStep_logic.g * firstStep_logic.h * firstStep_logic.i,
        d: firstStep_logic.j * firstStep_logic.k * firstStep_logic.l,
        e: firstStep_logic.m * firstStep_logic.n * firstStep_logic.o,
        f: firstStep_logic.p * firstStep_logic.q * firstStep_logic.r,
    }
    const thirdStep_logic = { // a - b
        a: secondStep_logic.a + secondStep_logic.b + secondStep_logic.c,
        b: secondStep_logic.d + secondStep_logic.e + secondStep_logic.f,
    }
    const result_logic = thirdStep_logic.a - thirdStep_logic.b

    // (a*b*c + d*e*f + g*h*i) - (j*k*l + m*n*o + p*q*r)
    const firstStep_string = `(${putInsideParenteses(firstStep_logic.a)}*${putInsideParenteses(firstStep_logic.b)}*${putInsideParenteses(firstStep_logic.c)} + ${putInsideParenteses(firstStep_logic.d)}*${putInsideParenteses(firstStep_logic.e)}*${putInsideParenteses(firstStep_logic.f)} + ${putInsideParenteses(firstStep_logic.g)}*${putInsideParenteses(firstStep_logic.h)}*${putInsideParenteses(firstStep_logic.i)}) - (${putInsideParenteses(firstStep_logic.j)}*${putInsideParenteses(firstStep_logic.k)}*${putInsideParenteses(firstStep_logic.l)} + ${putInsideParenteses(firstStep_logic.m)}*${putInsideParenteses(firstStep_logic.n)}*${putInsideParenteses(firstStep_logic.o)} + ${putInsideParenteses(firstStep_logic.p)}*${putInsideParenteses(firstStep_logic.q)}*${putInsideParenteses(firstStep_logic.r)})`

    // (a + b + c) - (d + e + f)
    const secondStep_string = `(${secondStep_logic.a} + ${secondStep_logic.b} + ${secondStep_logic.c}) - (${secondStep_logic.d} + ${secondStep_logic.e} + ${secondStep_logic.f})`.replace("+ -", "- ")

    // a - b
    const thirdStep_string = `${thirdStep_logic.a} - ${putInsideParenteses(thirdStep_logic.b)}`

    const result_string = ""+result_logic

    return {
        logic: {
            firstStep: firstStep_logic,
            secondStep: secondStep_logic,
            thirdStep: thirdStep_logic,
            result: result_logic,
        },
        string: {
            firstStep: firstStep_string,
            secondStep: secondStep_string,
            thirdStep: thirdStep_string,
            fourthStep: thirdStep_logic.b < 0 ? `${thirdStep_logic.a} + ${thirdStep_logic.b*-1}` : "",
            result: result_string,
        }
    }
}

function replaceArrayColumn(firstArray, lastArray, variable){
    const newArray = firstArray
    
    const column = variable == "x" ? 0 : variable == "y" ? 1 : 2
    
    for(let i = 0; i <= 2; i++){
        newArray[i][column] = lastArray[i]
    }

    return newArray
}

function isNumber(param){
    let isNumber = true
    for(char in param){
        if(param[char] != "0" && param[char] != "1" && param[char] != "2" && param[char] != "3" && param[char] != "4" && param[char] != "5" && param[char] != "6" && param[char] != "7" && param[char] != "8" && param[char] != "9"){
            isNumber = false
        }
    }

    return isNumber
}

function extractOnlyNumber(param){
    let number = ""
    for(char in param){
        const currentChar = param[char]
        if(isNumber(currentChar)){
            number += currentChar
        }
    }
    return number
}

function explodeEquation(equation){

    const equationArray = []
    let currentPart = ""
    for(letter in equation){
        if(equation[letter] == "+" || equation[letter] == "-"){
            equationArray.push(currentPart)
            currentPart = equation[letter]
        } else if(equation[letter] != "=") {
            currentPart += equation[letter]
        }
    }
    equationArray.push(currentPart)

    const equationObject = {
        x: {
            positive: equationArray[0][0] == "-" ? false : equationArray[0][0] == "+" ? true : isNumber(equationArray[0][0]) ? true : false,
            module: extractOnlyNumber(equationArray[0])
        },
        y: {
            positive: equationArray[1][0] == "-" ? false : equationArray[1][0] == "+" ? true : isNumber(equationArray[1][0]) ? true : false,
            module: extractOnlyNumber(equationArray[1])
        },
        z: {
            positive: equationArray[2][0] == "-" ? false : equationArray[2][0] == "+" ? true : isNumber(equationArray[2][0]) ? true : false,
            module: extractOnlyNumber(equationArray[2])
        },
        result: equationArray[3]
    }

    console.log(equationObject)
}
explodeEquation("2x+3y-1z=-4")