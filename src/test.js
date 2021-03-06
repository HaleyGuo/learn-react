// //获取所有的DOM节点
// function getDom(html) {
//     var nodes = [];
//     if (!html) {
//         return nodes;
//     } else {
//         nodes.push(html);
//         if (html.firstChild) {
//             var childs = html.childNodes;
//             nodes.concat(objTr(childs));
//             objTr().forEach(getDom);
//         }
//     }
//     return nodes;
// }
//
// function objTr() {
//     return Array.prototype.slice.call(arguments);
// }
//
// var html = document.getElementsByTagName('html');
// getDom(html);
//
// //深度优先
// const getChildren = (node) => {
//     return Array.from(node.children).reduce((acc, cur) =>
//         cur.children.length ? acc.concat(cur, getChildren(cur)) : acc.concat(cur), []);
// }
//
// //广度优先
// const getChildren = (node) => {
//     const stack = [];
//     stack.push(...node.children);
//     let i = 0;
//     while (i < stack.length) {
//         if (stack[i].children.length) {
//             stack.push(...stack[i].children);
//         }
//         i++;
//     }
//     return stack;
// }
//
// //数组的扁平化
// // 全部扁平化
// const flatten = (arr) => {
//     return [...(
//         function* fn(arr) {
//             for (let i = 0, l = arr.length; i < l; i++) {
//                 if (Array.isArray(arr[i])) {
//                     yield* fn(arr[i]);
//                 } else {
//                     yield arr[i]
//                 }
//             }
//         }
//     )(arr)]
// }
// flatten([1, [2, [3, [4]]]])
//
// //
// const flatten = (arr) => arr.reduce((a, b) => {
//     if (Array.isArray(b)) {
//         return a.concat(flatten(b));
//     }
//     return a.concat(b);
// }, []);
// flatten([1, [2, [3, [4]]]])
//
// //n层扁平化
// const fnn = (arr, n) => {
//     let result = arr
//     for (let i = 0; i < n; i++) {
//         result = result.reduce((acc, index) => acc.concat(index), [])
//     }
//     return result
// }
//
// //
// const flatten = (arr, depth = 1) => arr.reduce((a, b) => {
//     if (Array.isArray(b) && depth - 1) {
//         return a.concat(flatten(b, depth - 1));
//     }
//     return a.concat(b);
// }, []);
// flatten([1, [2, 3, [4, 5, [10]], 6], 7], 2)
// //[1,[2,3,[4,5,[10]],6],7]=>[1,2,3,4,5,[10],6,7];
//
// //destructuringArray([1, [2, 3], 4], '[a, [b ], c]') => {a: 1, b: 2, c: 4}
// // let [a, [b ], c]=[1, [2, 3], 4]
// const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
//     let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
//     let fn = (arr, act) => {
//         return act.reduce((acc, item, index) => {
//             return Array.isArray(item) ? {
//                 ...acc,
//                 ...fn(arr[index], item)
//             } : {
//                 ...acc,
//                 [item]: arr[index]
//             }
//         }, {})
//     }
//     return fn(arr, act)
// }
//
//
// const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
//     let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
//     let fn = (arr, act) => {
//         return act.reduce((acc, item, index) => {
//             return Array.isArray(item) ? Object.assign({}, acc, fn(arr[index], item)) :
//                 Object.assign({[item]: arr[index]}, acc)
//         }, {})
//     }
//     return fn(arr, act)
// }
//
// var arrString = 'abcdaabc';
// var arrAr = arrString.split('');
// var fn = arrAr => arrAr.reduce((res, cur) => {
//     res[cur] ? res[cur]++ : res[cur] = 1;
//     return res;
// }, {})
// fn(arrAr)
//
//
// var arrString = "abcdaabc12AB";
// var arr = arrString.replace(/[^a-zA-Z]*/g, '')
// arr
// "abcdaabcAB"
//
// repeat = (str) => {
//     let arr = [];
//     return (n) => {
//         for (let i = 0; i < n; i++) {
//             arr.push(str);
//         }
//         arr.join('');
//         return this;
//     }
// }
//
// let fn = {
//     setStr (str) {
//         this.str = str;
//         return this;
//     },
//     arr:[],
//     repeat (n) {
//         for (let i = 0; i < n; i++) {
//             this.arr.push(this.str);
//         }
//         let s=this.arr.join('');
//         console.log(s);
//         this.arr=[];
//         return this;
//     }
// }
// fn.setStr("rer");
// fn.repeat(1);
//
//
//
//
// //事件循环机制
// // demo02
// console.log('golb1');
//
// setTimeout(function() {//macro
//     console.log('timeout1');
//     process.nextTick(function() {
//         console.log('timeout1_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('timeout1_promise');
//         resolve();
//     }).then(function() {
//         console.log('timeout1_then')
//     })
// })
//
// setImmediate(function() {//macro
//     console.log('immediate1');
//     process.nextTick(function() {
//         console.log('immediate1_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('immediate1_promise');
//         resolve();
//     }).then(function() {
//         console.log('immediate1_then')
//     })
// })
//
// process.nextTick(function() {//micro
//     console.log('glob1_nextTick');
// })
//
// new Promise(function(resolve) {//micro
//     console.log('glob1_promise');
//     resolve();
// }).then(function() {
//     console.log('glob1_then')
// })
//
// setTimeout(function() {//macro
//     console.log('timeout2');
//     process.nextTick(function() {
//         console.log('timeout2_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('timeout2_promise');
//         resolve();
//     }).then(function() {
//         console.log('timeout2_then')
//     })
// })
//
// process.nextTick(function() {//micro
//     console.log('glob2_nextTick');
// })
//
// new Promise(function(resolve) {//micro
//     console.log('glob2_promise');
//     resolve();
// }).then(function() {
//     console.log('glob2_then')
// })
//
// setImmediate(function() {//macro
//     console.log('immediate2');
//     process.nextTick(function() {
//         console.log('immediate2_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('immediate2_promise');
//         resolve();
//     }).then(function() {
//         console.log('immediate2_then')
//     })
// })
//
// //bind的手动实现
// //1.用法
// const id = 'window';
// function test () {
//     console.log(this.id)
// }
//
// const fn = test.bind(window);
// const obj = {
//     id: 'obj',
//     hehe:fn
// };
//
// fn();// window
// obj.hehe(); // window
//
// //拆分思路
// //1.返回一个新函数
// /*return function(){
//
// }*/
// //2.目标是当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数以及新函数传来的参数。
// Function.prototype.bind=function (that) {
//     var arr=Array.prototype.slice.apply(arguments,[1])//从第二个参数开始取 相当于arguments.slice(1);
//     var _this = this;//经测试这里的this 就很明确了，指向调用bind的对象，即这里的test对象
//     console.log(this);
//     return function () {
//         _this.apply(that,arr.concat(Array.prototype.slice.call(arguments)));
//     }
// }
//
// //测试
// var test = function(a,b){
//     console.log('作用域绑定 '+ this.value)
//     console.log('bind参数传递 '+ a.value2)
//     console.log('调用参数传递 ' + b)
// }
// var obj = {
//     value:'ok'
// }
// var fun_new = test.bind(obj,{value2:'also ok'});
// fun_new ('hello bind');
//
//

// //获取所有的DOM节点
// function getDom(html) {
//     var nodes = [];
//     if (!html) {
//         return nodes;
//     } else {
//         nodes.push(html);
//         if (html.firstChild) {
//             var childs = html.childNodes;
//             nodes.concat(objTr(childs));
//             objTr().forEach(getDom);
//         }
//     }
//     return nodes;
// }
//
// function objTr() {
//     return Array.prototype.slice.call(arguments);
// }
//
// var html = document.getElementsByTagName('html');
// getDom(html);
//
// //深度优先
// const getChildren = (node) => {
//     return Array.from(node.children).reduce((acc, cur) =>
//         cur.children.length ? acc.concat(cur, getChildren(cur)) : acc.concat(cur), []);
// }
//
// //广度优先
// const getChildren = (node) => {
//     const stack = [];
//     stack.push(...node.children);
//     let i = 0;
//     while (i < stack.length) {
//         if (stack[i].children.length) {
//             stack.push(...stack[i].children);
//         }
//         i++;
//     }
//     return stack;
// }
//
// //数组的扁平化
// // 全部扁平化
// const flatten = (arr) => {
//     return [...(
//         function* fn(arr) {
//             for (let i = 0, l = arr.length; i < l; i++) {
//                 if (Array.isArray(arr[i])) {
//                     yield* fn(arr[i]);
//                 } else {
//                     yield arr[i]
//                 }
//             }
//         }
//     )(arr)]
// }
// flatten([1, [2, [3, [4]]]])
//
// //
// const flatten = (arr) => arr.reduce((a, b) => {
//     if (Array.isArray(b)) {
//         return a.concat(flatten(b));
//     }
//     return a.concat(b);
// }, []);
// flatten([1, [2, [3, [4]]]])
//
// //n层扁平化
// const fnn = (arr, n) => {
//     let result = arr
//     for (let i = 0; i < n; i++) {
//         result = result.reduce((acc, index) => acc.concat(index), [])
//     }
//     return result
// }
//
// //
// const flatten = (arr, depth = 1) => arr.reduce((a, b) => {
//     if (Array.isArray(b) && depth - 1) {
//         return a.concat(flatten(b, depth - 1));
//     }
//     return a.concat(b);
// }, []);
// flatten([1, [2, 3, [4, 5, [10]], 6], 7], 2)
// //[1,[2,3,[4,5,[10]],6],7]=>[1,2,3,4,5,[10],6,7];
//
// //destructuringArray([1, [2, 3], 4], '[a, [b ], c]') => {a: 1, b: 2, c: 4}
// // let [a, [b ], c]=[1, [2, 3], 4]
// const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
//     let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
//     let fn = (arr, act) => {
//         return act.reduce((acc, item, index) => {
//             return Array.isArray(item) ? {
//                 ...acc,
//                 ...fn(arr[index], item)
//             } : {
//                 ...acc,
//                 [item]: arr[index]
//             }
//         }, {})
//     }
//     return fn(arr, act)
// }
//
//
// const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
//     let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
//     let fn = (arr, act) => {
//         return act.reduce((acc, item, index) => {
//             return Array.isArray(item) ? Object.assign({}, acc, fn(arr[index], item)) :
//                 Object.assign({[item]: arr[index]}, acc)
//         }, {})
//     }
//     return fn(arr, act)
// }
//
// var arrString = 'abcdaabc';
// var arrAr = arrString.split('');
// var fn = arrAr => arrAr.reduce((res, cur) => {
//     res[cur] ? res[cur]++ : res[cur] = 1;
//     return res;
// }, {})
// fn(arrAr)
//
//
// var arrString = "abcdaabc12AB";
// var arr = arrString.replace(/[^a-zA-Z]*/g, '')
// arr
// "abcdaabcAB"
//
// repeat = (str) => {
//     let arr = [];
//     return (n) => {
//         for (let i = 0; i < n; i++) {
//             arr.push(str);
//         }
//         arr.join('');
//         return this;
//     }
// }
//
// let fn = {
//     setStr (str) {
//         this.str = str;
//         return this;
//     },
//     arr:[],
//     repeat (n) {
//         for (let i = 0; i < n; i++) {
//             this.arr.push(this.str);
//         }
//         let s=this.arr.join('');
//         console.log(s);
//         this.arr=[];
//         return this;
//     }
// }
// fn.setStr("rer");
// fn.repeat(1);
//
//
//
//
// //事件循环机制
// // demo02
// console.log('golb1');
//
// setTimeout(function() {//macro
//     console.log('timeout1');
//     process.nextTick(function() {
//         console.log('timeout1_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('timeout1_promise');
//         resolve();
//     }).then(function() {
//         console.log('timeout1_then')
//     })
// })
//
// setImmediate(function() {//macro
//     console.log('immediate1');
//     process.nextTick(function() {
//         console.log('immediate1_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('immediate1_promise');
//         resolve();
//     }).then(function() {
//         console.log('immediate1_then')
//     })
// })
//
// process.nextTick(function() {//micro
//     console.log('glob1_nextTick');
// })
//
// new Promise(function(resolve) {//micro
//     console.log('glob1_promise');
//     resolve();
// }).then(function() {
//     console.log('glob1_then')
// })
//
// setTimeout(function() {//macro
//     console.log('timeout2');
//     process.nextTick(function() {
//         console.log('timeout2_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('timeout2_promise');
//         resolve();
//     }).then(function() {
//         console.log('timeout2_then')
//     })
// })
//
// process.nextTick(function() {//micro
//     console.log('glob2_nextTick');
// })
//
// new Promise(function(resolve) {//micro
//     console.log('glob2_promise');
//     resolve();
// }).then(function() {
//     console.log('glob2_then')
// })
//
// setImmediate(function() {//macro
//     console.log('immediate2');
//     process.nextTick(function() {
//         console.log('immediate2_nextTick');
//     })
//     new Promise(function(resolve) {
//         console.log('immediate2_promise');
//         resolve();
//     }).then(function() {
//         console.log('immediate2_then')
//     })
// })
//
// //bind的手动实现
// //1.用法
// const id = 'window';
// function test () {
//     console.log(this.id)
// }
//
// const fn = test.bind(window);
// const obj = {
//     id: 'obj',
//     hehe:fn
// };
//
// fn();// window
// obj.hehe(); // window
//
// //拆分思路
// //1.返回一个新函数
// /*return function(){
//
// }*/
// //2.目标是当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数以及新函数传来的参数。
// Function.prototype.bind=function (that) {
//     var arr=Array.prototype.slice.apply(arguments,[1])//从第二个参数开始取 相当于arguments.slice(1);
//     var _this = this;//经测试这里的this 就很明确了，指向调用bind的对象，即这里的test对象
//     console.log(this);
//     return function () {
//         _this.apply(that,arr.concat(Array.prototype.slice.call(arguments)));
//     }
// }
//
// //测试
// var test = function(a,b){
//     console.log('作用域绑定 '+ this.value)
//     console.log('bind参数传递 '+ a.value2)
//     console.log('调用参数传递 ' + b)
// }
// var obj = {
//     value:'ok'
// }
// var fun_new = test.bind(obj,{value2:'also ok'});
// fun_new ('hello bind');
//
//

// var a = 1
// var b = 2
// var c = 3
// function getMax(){
//     var sum = [a,a+b,a+b+c];
//     var f=[];
//     var t;
//     var k=1;
//
//     // for(var i=1;i<3;i++){
//     //     sum[i]=sum[i-1]+
//     // }
//     for(var i=0;i<3;i++)
//     {
//         f[i][0]=sum[i];
//     }
//     for(var i=1;i<=2;i++)
//     {
//         t=Math.min(i-1,k);
//         for(var j=0;j<t;j++){
//             for(var l=1;l<=i;l++){
//                 f[i][j]=Math.max(f[i][j],f[l-1][j-1]*(sum[i]-sum[l-1]));
//             }
//         }
//
//     }
//     console.log(f[3][1]);
// }

// getMax();
// var arr=[];
// arr[0]=a;
// arr[1]=b;
// arr[2]=c;
// function bubbleSort(arr) {
//     var len = arr.length;
//     for (var i = 0; i < len-1; i++) {
//         for (var j = 0; j < len - 1 - i; j++) {
//             if (arr[j] > arr[j+1]) {        //相邻元素两两对比
//                 var temp = arr[j+1];        //元素交换
//                 arr[j+1] = arr[j];
//                 arr[j] = temp;
//
//             }
//         }
//     }
//     return arr;
// }
//
// var arr = bubbleSort(arr);
// var result = arr[2] * (arr[1] + arr[0]);
// console.log(result);

//字符串全排列
// function Permutation(str) {
//     // write code here
//     if (str.length <= 0) return '';
//     var arr = str.split("");
//     arr = derepeate(arr);//去重
//     var result = [];
//
//     function permu(arr, start, end) {
//         if (start === end) {
//             result.push(arr.join(""));
//         } else {
//             for (var i = start; i <= end; i++) {
//                 swap(arr, start, i);
//                 permu(arr, start + 1, end);
//                 swap(arr, start, i)
//             }
//         }
//
//         function swap(arr, a, b) {
//             var temp = arr[a];
//             arr[a] = arr[b];
//             arr[b] = temp;
//         }
//     }
//     function derepeate(arr) {
//         return Array.from(new Set(arr));
//     }
//     permu(arr, 0, arr.length - 1);
//     result.sort();
//     console.log(result);
// }
// var str="abca";
// Permutation(str);

/**
 * underscore 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(fn,wait,immediate){
    var timer,timestamp,args,context,result;
    var later=function(){
        var last=new Date()-timestamp;
        if(last<wait && last>=0){
            timer=setTimeout(later,wait-last);
        }else{
            timer=null;
            if(!immediate){
                result=fn.apply(context,args);
                if(!timer)context=args=null;
            }

        }
    }
    return function () {
        context=this;
        args=arguments;
        timestamp=new Date();
        var callNow=!timer && immediate;
        if(!timer){
            timer=setTimeout(later,wait);
        }
        if(callNow){
            result=fn.apply(context,args);
            context=args=null;
        }
    }
}
//循环引用的解决和恢复，使用WeakMap来实现
/*
    cycle.js
    2018-05-15
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html
    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

// The file uses the WeakMap feature of ES6.

/*jslint eval */

/*property
    $ref, decycle, forEach, get, indexOf, isArray, keys, length, push,
    retrocycle, set, stringify, test
*/

if (typeof JSON.decycle !== "function") {
    JSON.decycle = function decycle(object, replacer) {
        "use strict";

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form

//      {"$ref": PATH}

// where the PATH is a JSONPath string that locates the first occurance.

// So,

//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));

// produces the string '[{"$ref":"$"}]'.

// If a replacer function is provided, then it will be called for each value.
// A replacer function receives a value and returns a replacement value.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child element or
// property.

        var objects = new WeakMap();     // object to path mappings

        return (function derez(value, path) {

// The derez function recurses through the object, producing the deep copy.

            var old_path;   // The path of an earlier occurance of value
            var nu;         // The new object or array

// If a replacer function was provided, then call it to get a replacement value.

            if (replacer !== undefined) {
                value = replacer(value);
            }

// typeof null === "object", so go on if this value is really an object but not
// one of the weird builtin objects.

            if (
                typeof value === "object"
                && value !== null
                && !(value instanceof Boolean)
                && !(value instanceof Date)
                && !(value instanceof Number)
                && !(value instanceof RegExp)
                && !(value instanceof String)
            ) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a {"$ref":PATH} object. This uses an
// ES6 WeakMap.

                old_path = objects.get(value);
                if (old_path !== undefined) {
                    return {$ref: old_path};
                }

// Otherwise, accumulate the unique value and its path.

                objects.set(value, path);

// If it is an array, replicate the array.

                if (Array.isArray(value)) {
                    nu = [];
                    value.forEach(function (element, i) {
                        nu[i] = derez(element, path + "[" + i + "]");
                    });
                } else {

// If it is an object, replicate the object.

                    nu = {};
                    Object.keys(value).forEach(function (name) {
                        nu[name] = derez(
                            value[name],
                            path + "[" + JSON.stringify(name) + "]"
                        );
                    });
                }
                return nu;
            }
            return value;
        }(object, "$"));
    };
}


if (typeof JSON.retrocycle !== "function") {
    JSON.retrocycle = function retrocycle($) {
        "use strict";

// Restore an object that was reduced by decycle. Members whose values are
// objects of the form
//      {$ref: PATH}
// are replaced with references to the value found by the PATH. This will
// restore cycles. The object will be mutated.

// The eval function is used to locate the values described by a PATH. The
// root object is kept in a $ variable. A regular expression is used to
// assure that the PATH is extremely well formed. The regexp contains nested
// * quantifiers. That has been known to have extremely bad performance
// problems on some browsers for very long strings. A PATH is expected to be
// reasonably short. A PATH is allowed to belong to a very restricted subset of
// Goessner's JSONPath.

// So,
//      var s = '[{"$ref":"$"}]';
//      return JSON.retrocycle(JSON.parse(s));
// produces an array containing a single element which is the array itself.

        var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

        (function rez(value) {

// The rez function walks recursively through the object looking for $ref
// properties. When it finds one that has a value that is a path, then it
// replaces the $ref object with a reference to the value that is found by
// the path.

            if (value && typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (element, i) {
                        if (typeof element === "object" && element !== null) {
                            var path = element.$ref;
                            if (typeof path === "string" && px.test(path)) {
                                value[i] = eval(path);
                            } else {
                                rez(element);
                            }
                        }
                    });
                } else {
                    Object.keys(value).forEach(function (name) {
                        var item = value[name];
                        if (typeof item === "object" && item !== null) {
                            var path = item.$ref;
                            if (typeof path === "string" && px.test(path)) {
                                value[name] = eval(path);
                            } else {
                                rez(item);
                            }
                        }
                    });
                }
            }
        }($));
        return $;
    };
}

















