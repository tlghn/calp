/**
 * Created by tolgahan on 04.11.2016.
 */
"use strict";

const chai = require('chai');
const assert = chai.assert;
const calp = require('../');

describe('Tests', function () {
    describe('Without target', function () {
        it('Call', function (done) {
            var obj = calp(function (name) {
                assert(name === 'test');
                assert(arguments.length === 1);
                done();
            });

            obj.test();
        });

        it('Return value', function () {

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

        });

        it('Multiple references', function () {

            function test() {

            }

            assert(calp(test) === calp(test));
        });
    });
    describe('With target', function () {

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

        it('Call', function () {
            var test = new Test();
            test.math.add(1, 2);
        });

        it('Return value', function () {
            var test = new Test();

            var A = 10;
            var B = 5;

            assert(test.math.add(A, B) === 15);
            assert(test.math.sub(A, B) === 5);
            assert(test.math.mul(A, B) === 50);
            assert(test.math.div(A, B) === 2);

        });

        it('Multiple references', function () {
            var test = new Test();
            assert(test.math === test.math);
        });
    });
});