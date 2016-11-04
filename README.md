# calp
Call Proxy

## Installation
```
    npm i calp --save
```

## Usage
```
    const calp = require('calp');
    var host = calp(func[, target])
```

## Examples

### Without Target

```
    const calp = require('calp');
    var obj = calp(function (name, a, b) {
        switch (name){
            case 'add':
                return a + b;
            case 'sub':
                return a - b;
            case 'mul':
                return a * b;
            case 'div':
                return a / b;
        }
    });

    var A = 10;
    var B = 5;

    assert(obj.add(A, B) === 15);
    assert(obj.sub(A, B) === 5);
    assert(obj.mul(A, B) === 50);
    assert(obj.div(A, B) === 2);    
```

### With Target

```
        class Test {

            _doMath(name, a, b){
                if(!(this instanceof Test)){
                    throw new TypeError('Invalid call!');
                }

                switch (name){
                    case 'add':
                        return a + b;
                    case 'sub':
                        return a - b;
                    case 'mul':
                        return a * b;
                    case 'div':
                        return a / b;
                }
            }

            get math(){
                return calp(this._doMath, this);
            }
        }
        
        var test = new Test();

        var A = 10;
        var B = 5;

        assert(test.math.add(A, B) === 15);
        assert(test.math.sub(A, B) === 5);
        assert(test.math.mul(A, B) === 50);
        assert(test.math.div(A, B) === 2);

```

## Notes
**Please see the tests for other examples**

## Change Log
- v1.0.0 Initial release