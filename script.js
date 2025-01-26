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
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}
function updateDisplay(arg){
    let display = document.querySelector('.display');
    display.innerText = arg;
}
function clearDisplay(){
    updateDisplay('0');
}

let arg1;
let arg2;
let operator;

function buttonHandler(e){
    console.log(e); 
}
let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonHandler);
})
