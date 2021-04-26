##
```
npm install rpn-ts
```

## usage
```javascript
import Rpn from "rpn-calculator"
const rpn = new Rpn();

const value = rpn.valueOf("sin(10ded)^ * cos(10deg)^") // 1
const value = rpn.valueOf("2x + 3!")//

if(value === null && rpn.last.details.isFunction){
   // rpn.last.details.funcVarNames // return ["x"]
	const values = rpn.valuesOf([{x: 1}, {x:2}]); // [8, 10]
}
```

## methods
- valueOf("expression") - return value of mathematical expression or null if is functions
- valuesOf([{x: number, y:number}], ?:IExpression) - return array of values for given array of arguments - if you don't pass expression it will calculate it for last computed expression;
- last - return last computed IExpression
- lastValue - return last computed value
- expressionFrom - compute rpn expression for given string

-  use(extension: func | IProcces, ?: (race: proccessedId[]) => number)
-  exclude - remove given procces from computed pipe
- extend(processId: string, transform(process: IProcess) => IProcess) -extend given procc

##allowed expressions
- Values
  - "1.41545" - floated number
  - "-45" - negative number
  - "3Pi" - 3 * 3,14
  - "2e" - 2 * const e
  - "3x + 5z + 9t" - any letter is threaded as variable (expect e)
- Basic operation
    - "1 + 2" - Summation
    - "1 - 2" - Subtraction
    - "1 * 2" - Multiplication
    - "2 / 2" - Division
    - "3!" - Factorial 
    - "3^" - 2 to power of 2
- Functions
    - "sin(3)" sin of number 3
    - "cos(3deg)" cos of angle 3 degrees
    - "ctg(3x)" cotangent of variable 3 * x
    - "tg(3)" tangent
    - "ln()" - natural logarithm
    - "log(3,2)" - logarithm of 3 on base 2
    - "sqrt(3)" - square root of number 3
    - "root(27, 3)" - third root of 27
    - "pow(2,5)" - 2 to power of 5
    - "abs(-4)" - absolut value of -4
    - "| -4 |" - absolute value of -4
- Grouping and organization
    - "3 * (4 + 1)" - brackets
    - "5 + [1  + 2] *2" - brackets
    - "pow(3, 5)" - comma separator of function args
- Comparisons
    - "1 > 3" - greeter
    - "1 >= 3" - greeter or equal
    - "3 < 5" - less
    - "6 <= 6" - less or equal
    - "3x = 3" - equal

## expression erros

```javascript
import Rpn from "rpn-calculator"
const rpn = new Rpn();

const value = rpn.valueOf("()[(pow(4)))") 
if(!value && rpn.last.errors){
    rpn.last.errors.forEach(error =>{
        console.log(error.id, error.message, error.position)
    })
    //will print 
    // EmptyBracket, Expression contains empty bracket pattern, 2
    // BracketMissmatch, Incorrect sequence of brackets, 10
    // FunctionArgument, Function power expect to have 2 arguments
}
```