//Calculator begins here
const num = [];
let n1 = 0;
let n2;
let answer;
let firstPass = true;
let operator;
let nextOperator;
let operationEnabled = false;
let decimalUsed = false;

function getNum(a) { 
    //After using = on an expression, the user can either press a num or operator
    //This logic lets a new expression be made when a num is pressed.
    if (answer != undefined) {
        answer = undefined;
        n2 = undefined;
        firstPass = true;
        display2('');
        display3('');
    }

    

    num.push(a);

    // Fixes issue where num of 1.00002 won't show zeros until 2 is entered
    //Joining as num first removes leading zeros before decimal
    if (num.includes('.')) {
        n1 = num.join('');
        n1 = n1.toString();
    }
    else { 
        n1 = Number(num.join(''));
    }
        
    display(n1);

    n1 = Number(n1);

    //operationEnabled only becomes false when cleared or refresh page. 
    //n2 will always be defined otherwise so you can do operations on it
    if (n2 != undefined) {
        operationEnabled = true;
    }
}

function step2(nextOperator) {
    //After using = on an expression, the user can either press a num or operator or =
    //If they press operator, this logic allows expression continuation

    //If user presses another = after evaluating expression this prevents weird things
    //2nd else if blocks user inputs [ .7 = .8 =], answer = undefined and tries to pass to n2
    if (nextOperator == '=' && operator == '=' && answer != undefined) {
        n2 = answer;
        console.log('activated')
    }
    else if (nextOperator == '=' && operator == '=' && answer == undefined) {
        n2 = n1;
        display2(n2);
    }
    else if (answer != undefined) {   
            n2 = answer;
            answer = undefined;
            display2(n2);
            console.log('Error')
    }
    
    //Fixes issue of 0 showing at the front of a num. Allows doing operation on 0
    if (num.length == 0) {
        num.push(0);
    }
    
    //firstPass only resets to true when clear is used or page is refreshed cuz user 
    //can continuie operations after = 
    if (firstPass == true && n2 == undefined) {
        n2 = n1;
        display2(n2);
        display3(nextOperator);
        firstPass = false;
    }

    if (operationEnabled == true) {  
        doMath(operator, nextOperator);
    }

    operator = nextOperator;

    if (operator != '=') {
        display3(operator);
    }

    clearNum();

    decimalUsed = false;
}




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
  
function display(a) {
      let text = document.getElementById('display').innerHTML = a;
}
  
  function display2(n2) {
      let text = document.getElementById('display2').innerHTML = n2;
}
  
function display3(operator) {
      if (n2 != undefined) {
          let text = document.getElementById('display3').innerHTML = operator;
      }
      else {
          let text = document.getElementById('display3').innerHTML = '';
      }    
}

function doMath(operator, nextOperator) {
    if (nextOperator != '=') {
        if (operator == '+') {
            n2 = add(n2, n1);
            n2 = charLimit(n2);
            display2(n2);
            operationEnabled = false;
        }
        if (operator == '-') {
            n2 = subtract(n2, n1);
            n2 = charLimit(n2);
            display2(n2);
            operationEnabled = false;
        }
        if (operator == '*') {
            n2 = multiply(n2, n1);
            n2 = charLimit(n2);
            display2(n2);
            operationEnabled = false;
        }
        if (operator == '÷') {
            n2 = divide(n2, n1);
            n2 = charLimit(n2);
            display2(n2);
            operationEnabled = false;
        }
    }

    else {
        if (num.length == 2 && num[1] == '.') {
            display('Error');
            n1 = 0;
            n2 = undefined;
            operationEnabled = false;
            operator = undefined;
            decimalUsed = false;
            firstPass = true;
        }
        else {

            if (n2 == undefined) {
                console.log('n2 is undefined for some reaosn')
            }
            else {
                if (operator == '+') {
                    display2(n2 + ' + ' + n1);
                    display3('=');
                    answer = add(n2, n1);
                    answer = charLimit(answer);
                    display(answer);
                }
                if (operator == '-') {
                    display2(n2 + ' - ' + n1);
                    display3('=');
                    answer = subtract(n2, n1);
                    answer = charLimit(answer);
                    display(answer);
                }
                if (operator == '*') {
                    display2(n2 + ' * ' + n1);
                    display3('=');
                    answer = multiply(n2, n1);
                    answer = charLimit(answer);
                    display(answer);
                }
                if (operator == '÷') {
                    if (n1 == 0) {
                        alert('Can\'t divide by 0')
                        clearButton();
                    }
                    else {
                        display2(n2 + ' ÷ ' + n1);
                        display3('=');
                        answer = divide(n2, n1);
                        answer = charLimit(answer);
                        display(answer);
                    }
                }
                
                n1 = 0;
                n2 = undefined;
                operator = undefined;
            }
        }
    }
}

function charLimit(numb) {
    numb = numb.toString();
    if (numb.length > 14) {
        numb = numb.slice(0, 13);
        console.log(numb);
    }
    numb = Number(numb);
    return numb;
}

function clearButton() {
    while (num.length != 0) {
        num.pop();
        n1 = Number(num.join(''));
    }
    
    n1 = 0;
    display(n1);
    n2 = undefined;
    operationEnabled = false;
    operator = undefined;
    firstPass = true;
    operator = undefined;
    decimalUsed = false;
    answer = undefined;
    display2('');
    display3('');

}

function decimalButton() {
    if (decimalUsed == false) {
        if (n1 == 0) {
            //Fixes when 0000.123 won't show as 0.123 cuz num contains multiple zeros before decimal
            //Original line is while (num.length > 1) {
            //Changed to test something
            while (num.length > 0) {
                num.pop();
            }
            num.push('.');
            n1 = num.join('');
            n1 = n1.toString();
            display(num.join(''));
            decimalUsed = true;

            //Ex: 2 + . is input. 2nd getNum will not be called so operations won't be enabled
            operationEnabled = true;
            
        }
        else {
            num.push('.');
            n1 = Number(num.join(''));

            //Fixes when decimal doesn't show til further numbers are added
            display(n1 + '.');
            decimalUsed = true;
        }
    }
}

function deleteButton() {
    if (num.length > 0) {
        let popped = num.pop();
        if (popped == '.') {
            decimalUsed = false;
        }
        n1 = num.join('');
        display(n1);
    }
}

function clearNum() {
    //num[0] will always be 0 so we remove everything after that
    // Allows n1 to recieve new input
    while (num.length != 0 && nextOperator != '=') {
        num.pop();
        n1 = num.join('');
        // display(n1);
    }
        
    while (num.length != 0 && nextOperator == '=') {
        num.pop();
        n1 = num.join('');
    }

}

window.addEventListener('keydown', function checkKeyDown(e) {
    for (let i = 0; i < 9; i++) {
        if (e.key == i) {
            getNum(i);
        }
    }
    if (e.key == 'Backspace') {
        deleteButton();
    }
    if (e.key == '.') {
        decimalButton();
    }
    if (e.key == '+') {
        step2('+')
    }
    if (e.key == '-') {
        step2('-')
    }
    if (e.key == '*') {
        step2('*')
    }
    if (e.key == '/') {
        step2('÷')
    }
    if (e.key == 'Enter') {
        step2('=')
    }
    console.log(e);


});

document.getElementById('one').addEventListener('click', () => getNum(1));
document.getElementById('two').addEventListener('click', () => getNum(2));
document.getElementById('three').addEventListener('click', () => getNum(3));
document.getElementById('four').addEventListener('click', () => getNum(4));
document.getElementById('five').addEventListener('click', () => getNum(5));
document.getElementById('six').addEventListener('click', () => getNum(6));
document.getElementById('seven').addEventListener('click', () => getNum(7));
document.getElementById('eight').addEventListener('click', () => getNum(8));
document.getElementById('nine').addEventListener('click', () => getNum(9));
document.getElementById('zero').addEventListener('click', () => getNum(0));

document.getElementById('add').addEventListener('click', () => step2('+'));
document.getElementById('subtract').addEventListener('click', () => step2('-'));
document.getElementById('multiply').addEventListener('click', () => step2('*'));
document.getElementById('divide').addEventListener('click', () => step2('÷'));
document.getElementById('equals').addEventListener('click', () => step2('='));

document.getElementById('clear').addEventListener('click', () => clearButton());
document.getElementById('decimal').addEventListener('click', () => decimalButton());
document.getElementById('delete').addEventListener('click', () => deleteButton());