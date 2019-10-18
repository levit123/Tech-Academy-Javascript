// JavaScript source code
//an object to keep track of values
const calculator = {
    //displays 0 on the screen
    Display_Value: '0',
    //holds the first operand for any expressions, but we set it to null for now
    First_Operand: null,
    //checks whether or not the second operand has been input
    Wait_Second_Operand: false,
    //this will hold the operator, we set it to null for now
    operator: null,
};

function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //we are checking to see if Wait_Second_Operand is true and set Display_Value to the key that was clicked
    //if the current value of Display_Value is 0, overwrite it...
    if (Wait_Second_Operand === true) {
        calculator.Display_Value = digit;
        calculator.Wait_Second_Operand = false;
    } else {
        //otherwise, it adds onto it
        calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }

    //this section handles decimal points
    function Input_Decimal(dot) {
        //this ensures that accidental clicking of the decimal point doesn't cause bugs in your operation
        if (calculator.Wait_Second_Operand === true) return;

        //if the Display_Value does not contain a decimal point, we want to add a decimal point
        if (!calculator.Display_Value.includes(dot)) {
            calculator.Display_Value += dot;
        }
    }
}

//this section handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = calculator;
    //when an operator key is pressed, we convert the current number displayed on the screen to a number and then store the result in Calculator.First_Operand if it doesn't already exist
    const Value_of_Input = parseFloat(Display_Value);
    //checks if an operator already exists and if Wait_Second_Operand is true, then updates the operator and exits from the function
    if (operator && calculator.Wait_Second_Operand) {
        calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        calculator.First_Operand = Value_of_Input;
    } else if (operator) { //checks if an operator already exists
        const Value_Now = First_Operand || 0;
        //if operator already exists, property lookup is performed for the operator in the Perform_Calculation object and the function that matches the operator is executed
        const result = Perform_Calculation[operator](Value_Now, Value_of_Input);

        calculator.Display_Value = String(result);
        calculator.First_Operand = result;
    }

    calculator.Wait_Second_Operand = true;
    calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    calculator.Display_Value = '0';
    calculator.First_Operand = null;
    calculator.Wait_Second_Operand = false;
    calculator.operator = null;
}

//updates the screen with the contents of Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.Display_Value;
}

Update_Display();

//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //the target variable is an object that represents the element that was clicked
    const { target } = event;
    //if the element that was clicked on is not a button, exit the function
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    //ensures that All-Clear clears the numbers from the calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})