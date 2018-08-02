//获取所有的DOM节点
function getDom(html) {
    var nodes = [];
    if (!html) {
        return nodes;
    } else {
        nodes.push(html);
        if (html.firstChild) {
            var childs = html.childNodes;
            nodes.concat(objTr(childs));
            objTr().forEach(getDom);
        }
    }
    return nodes;
}

function objTr() {
    return Array.prototype.slice.call(arguments);
}

var html = document.getElementsByTagName('html');
getDom(html);

//深度优先
const getChildren = (node) => {
    return Array.from(node.children).reduce((acc, cur) =>
        cur.children.length ? acc.concat(cur, getChildren(cur)) : acc.concat(cur), []);
}

//广度优先
const getChildren = (node) => {
    const stack = [];
    stack.push(...node.children);
    let i = 0;
    while (i < stack.length) {
        if (stack[i].children.length) {
            stack.push(...stack[i].children);
        }
        i++;
    }
    return stack;
}

//数组的扁平化
// 全部扁平化
const flatten = (arr) => {
    return [...(
        function* fn(arr) {
            for (let i = 0, l = arr.length; i < l; i++) {
                if (Array.isArray(arr[i])) {
                    yield* fn(arr[i]);
                } else {
                    yield arr[i]
                }
            }
        }
    )(arr)]
}
flatten([1, [2, [3, [4]]]])

//
const flatten = (arr) => arr.reduce((a, b) => {
    if (Array.isArray(b)) {
        return a.concat(flatten(b));
    }
    return a.concat(b);
}, []);
flatten([1, [2, [3, [4]]]])

//n层扁平化
const fnn = (arr, n) => {
    let result = arr
    for (let i = 0; i < n; i++) {
        result = result.reduce((acc, index) => acc.concat(index), [])
    }
    return result
}

//
const flatten = (arr, depth = 1) => arr.reduce((a, b) => {
    if (Array.isArray(b) && depth - 1) {
        return a.concat(flatten(b, depth - 1));
    }
    return a.concat(b);
}, []);
flatten([1, [2, 3, [4, 5, [10]], 6], 7], 2)
//[1,[2,3,[4,5,[10]],6],7]=>[1,2,3,4,5,[10],6,7];

//destructuringArray([1, [2, 3], 4], '[a, [b ], c]') => {a: 1, b: 2, c: 4}
// let [a, [b ], c]=[1, [2, 3], 4]
const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
    let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
    let fn = (arr, act) => {
        return act.reduce((acc, item, index) => {
            return Array.isArray(item) ? {
                ...acc,
                ...fn(arr[index], item)
            } : {
                ...acc,
                [item]: arr[index]
            }
        }, {})
    }
    return fn(arr, act)
}


const destructuringArray = (arr = [1, [2, 3], 4], str = '[a, [b, d], c]') => {
    let act = JSON.parse(str.replace(/([a-z])+/g, '"$1"'))
    let fn = (arr, act) => {
        return act.reduce((acc, item, index) => {
            return Array.isArray(item) ? Object.assign({}, acc, fn(arr[index], item)) :
                Object.assign({[item]: arr[index]}, acc)
        }, {})
    }
    return fn(arr, act)
}

var arrString = 'abcdaabc';
var arrAr = arrString.split('');
var fn = arrAr => arrAr.reduce((res, cur) => {
    res[cur] ? res[cur]++ : res[cur] = 1;
    return res;
}, {})
fn(arrAr)


var arrString = "abcdaabc12AB";
var arr = arrString.replace(/[^a-zA-Z]*/g, '')
arr
"abcdaabcAB"

repeat = (str) => {
    let arr = [];
    return (n) => {
        for (let i = 0; i < n; i++) {
            arr.push(str);
        }
        arr.join('');
        return this;
    }
}

let fn = {
    setStr (str) {
        this.str = str;
        return this;
    },
    arr:[],
    repeat (n) {
        for (let i = 0; i < n; i++) {
            this.arr.push(this.str);
        }
        let s=this.arr.join('');
        console.log(s);
        this.arr=[];
        return this;
    }
}
fn.setStr("rer");
fn.repeat(1);




//事件循环机制
// demo02
console.log('golb1');

setTimeout(function() {//macro
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {//macro
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {//micro
    console.log('glob1_nextTick');
})

new Promise(function(resolve) {//micro
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {//macro
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {//micro
    console.log('glob2_nextTick');
})

new Promise(function(resolve) {//micro
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {//macro
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})

//bind的手动实现
//1.用法
const id = 'window';
function test () {
    console.log(this.id)
}

const fn = test.bind(window);
const obj = {
    id: 'obj',
    hehe:fn
};

fn();// window
obj.hehe(); // window

//拆分思路
//1.返回一个新函数
/*return function(){

}*/
//2.目标是当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数以及新函数传来的参数。
Function.prototype.bind=function (that) {
    var arr=Array.prototype.slice.apply(arguments,[1])//从第二个参数开始取 相当于arguments.slice(1);
    var _this = this;//经测试这里的this 就很明确了，指向调用bind的对象，即这里的test对象
    console.log(this);
    return function () {
        _this.apply(that,arr.concat(Array.prototype.slice.call(arguments)));
    }
}

//测试
var test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('bind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
}
var obj = {
    value:'ok'
}
var fun_new = test.bind(obj,{value2:'also ok'});
fun_new ('hello bind');


