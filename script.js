const DIVISION_SYMBOL = '÷';
const MAX_DISPLAY_LENGTH = 10;

console.log('loaded');
function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}
function operate(num1, num2, operator){
    console.log(`operate called with: ${num1} ${num2} ${operator}`)
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    // console.log(`parsedFloat num1: ${num1} num2: ${num2}`)
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === 'x') return multiply(num1, num2);
    if (operator === DIVISION_SYMBOL) return divide(num1, num2);
}
function getDisplay(){
    let display = document.querySelector('.display');
    return display.innerText;
}
function updateDisplay(arg){
    let display = document.querySelector('.display');
    // display.innerText = arg
    if ((!isNaN(arg)) && arg.length > MAX_DISPLAY_LENGTH){
        if (activeDecimal === true) {
            let numDecimals = getNumDecimalPlaces(arg);
            let lengthWhole = arg.length - numDecimals - 1;
            console.log(lengthWhole);
            if (lengthWhole > MAX_DISPLAY_LENGTH){
                display.innerText = 'overflow - clear';
                return;
            }
            let lengthDecimalsRounded = MAX_DISPLAY_LENGTH - lengthWhole - 1;
            console.log(`arg: ${arg} length: ${arg.length} lengthWhole: ${lengthWhole} numDecimals: ${numDecimals} lengthDecimalsRounded: ${lengthDecimalsRounded}`);
            if (lengthDecimalsRounded > 0) {
                display.innerText = round(parseFloat(arg), lengthDecimalsRounded);
            }
        } else {
            console.log(arg.length);
            if (arg.length > MAX_DISPLAY_LENGTH){
                display.innerText = 'overflow - clear';
                return;
            }
            display.innerText = arg;
        }
    } else {
        display.innerText = arg;
    }
}
function clearDisplay(){
    updateDisplay('0');
}

let arg1;
let arg2;
let operator;
let activeArgIndicator;
let activeDecimal;
resetGlobals();

function resetGlobals(){
    arg1 = null;
    arg2 = null;
    operator = null;
    activeArgIndicator = 1; // equals 1 or 2
    activeDecimal = false;
}
function getNumDecimalPlaces(num){
    let numString = num.toString();
    let numDecimals;
    if (numString.includes('.')){
        numDecimals = numString.split('.')[1].length;
    } else {
        numDecimals = 0;
    }
    return numDecimals;
}
function round(num, numDecimalPlaces){
    let factor = Math.pow(10, numDecimalPlaces);
    return Math.round(num * factor) / factor;
}
function digitHandlerHelper(digit){
    let curVal = (activeArgIndicator === 1) ? arg1 : arg2;
    if ((curVal !== null) && 
        curVal.length === MAX_DISPLAY_LENGTH - 1) {
        console.log('max length for display reached. not adding');
        return
    }
    // console.log(`curVal: ${curVal}`);
    if (curVal === null || curVal === '0'){
        curVal = digit.toString();
    } else {
        curVal += digit.toString();
    }
    if (activeArgIndicator === 1){
        arg1 = curVal;
    } else if (activeArgIndicator === 2){
        arg2 = curVal;
    }
    // console.log(`arg1: ${arg1} arg2: ${arg2}`)
    updateDisplay(curVal);
}
function digitHandler(e){
    let digit = parseInt(e.target.innerText);
    digitHandlerHelper(digit);
}
function decimalHandler(e){
    // console.log('decimalHandler called');
    // console.log(`activeArgIndicator: ${activeArgIndicator}`);
    if (activeDecimal === true) {
        console.log('only 1 decimal alloewd');
    } else {
        activeDecimal = true;
        if (activeArgIndicator === 1){
            if (arg1 === null) { arg1 = ''; }
            arg1 += '.';
            updateDisplay(arg1);
        } else {
            if (arg2 === null) {arg2 = '';}
            arg2 += '.';
            updateDisplay(arg2);
        }
    }
}   
function clearHandler(e){
    resetGlobals();
    clearDisplay();
}
function equalKeyHelper(){
    if (operator === DIVISION_SYMBOL && arg2 === '0'){
        updateDisplay('no divide by 0');
        resetGlobals();
        return;
    }
    let displayResult = operate(arg1, arg2, operator);
    displayResult = displayResult.toString();
    updateDisplay(displayResult);
    arg1 = displayResult;
    arg2 = null;
    operator = null;
    activeArgIndicator = 2;
    activeDecimal = false;
}
function operatorHandlerHelper(targetOperator){
    if (arg1 === null){
        console.log('arg1 null');
        return
    }
    if (operator !== null && arg2 !== null){
        equalKeyHelper();
    } else {
        // console.log(`arg1: ${arg1} arg2: ${arg2} operator: ${operator} target operator: ${targetOperator}`)
        if (arg2 === null && targetOperator !== '='){
            operator = targetOperator;
            activeArgIndicator = 2;
            activeDecimal = false;
        }
    }
}
function operatorHandler(e){
    let targetOperator = e.target.innerText;
    operatorHandlerHelper(targetOperator);
}
function buttonHandler(e){
    let target = e.target;
    let classes = target.classList;
    let targetType;
    if (classes.contains('operator')){
        targetType = 'operator';
        operatorHandler(e);
    } else if (classes.contains('decimal')) {
        targetType = 'decimal';
        decimalHandler(e);
    } else if (classes.contains('clear')) {
        targetType = 'clear';
        clearHandler();
    } else if (classes.contains('digit')) {
        targetType = 'digit';
        digitHandler(e);
    }
    // console.log(targetType);
}
let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonHandler);
})
document.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key === '1'){
        digitHandlerHelper(1);
    } else if (key === '2'){
        digitHandlerHelper(2);
    } else if (key === '3'){
        digitHandlerHelper(3);
    } else if (key === '4'){
        digitHandlerHelper(4);
    } else if (key === '5'){
        digitHandlerHelper(5);
    } else if (key === '6'){
        digitHandlerHelper(6);
    } else if (key === '7'){
        digitHandlerHelper(7);
    } else if (key === '8'){
        digitHandlerHelper(8);
    } else if (key === '9'){
        digitHandlerHelper(9);
    } else if (key === '0'){
        digitHandlerHelper(0);
    } else if (key === '/'){
        operatorHandlerHelper(DIVISION_SYMBOL);
    } else if (key === '*'){
        operatorHandlerHelper('x');
    } else if (key === '-'){
        operatorHandlerHelper('-');
    } else if (key === '+'){
        operatorHandlerHelper('+');
    } else if (key === 'Enter'){
        operatorHandlerHelper('=');
    } else if (key === '.') {
        decimalHandler(e);
    }
    // console.log(key);
})