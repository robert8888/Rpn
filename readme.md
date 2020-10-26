##
```
npm install rpn-calculator
```

## usage
```javascript
import {rpn} from rpn-calculator

const value = rpn.valueOf("sin(10ded)^ * cos(10deg)^") // 1
const value = rpn.valueOf("2x + 3!")//
if(value === null && rpn.last.details.isFunction){
	const values = rpn.valuesOf([{x: 1}, {x:2}]); // [8, 10]
}
```

## methods
- value Of("expression") - return value of mathematical expression or null if is functions
- value Of([{x: number, y:number}], ?:IExpression) - return array of values for given array of arguments - if you don't pass expression it will calculate it for last computed expression;
- last - return last computed IExpression
- lastValue - return last computed value
- expressionFrom - compute rpn expression for given string

-  use(extension: func | IProcces, ?: (race: proccessedId[]) => number)
-  exclude - remove given procces from computed pipe
- extend(processId: string, transform(process: IProcess) => IProcess) -extend given procc