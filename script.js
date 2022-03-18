function add(a, b) {
  return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) { 
    return a * b;
} 

function divide(a, b) {
    return a / b;
}

function operate(a, b, c) {
    if (b == '+') {
      let result = add(a, c);
    }
    else if (b == '-') {
      let result = subtract(a, c);
    }
    else if (b == '*') {
      let result = multiply(a, c);
    }
    else {
      let result = divide(a, c);
    } 
}


function display(a) {
  let text = document.getElementById('display').innerHTML = a;
  return a;
}

function display2(b) {
  let text = document.getElementById('display').innerHTML = a;
}



display('456');

const num = [0];
const num2 = [0];
function getNum(a) {
  if (num[0] == 0) {
    num.pop();
    // console.log(num)
  }
  num.push(a);
  let value = num.join('');
  display(value);
  
}

function step2(a) {
  let temp = num;
  
}



document.getElementById('2').addEventListener('click', () => getNum(2));
document.getElementById('3').addEventListener('click', () => getNum(3));
document.getElementById('4').addEventListener('click', () => getNum(4));
document.getElementById('5').addEventListener('click', () => getNum(5));
document.getElementById('6').addEventListener('click', () => getNum(6));
document.getElementById('7').addEventListener('click', () => getNum(7));
document.getElementById('8').addEventListener('click', () => getNum(8));
document.getElementById('9').addEventListener('click', () => getNum(9));
document.getElementById('0').addEventListener('click', () => getNum(0));
document.getElementById('1').addEventListener('click', () => getNum(1));

document.getElementById('+').addEventListener('click', () => step2('+'));


