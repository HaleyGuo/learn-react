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
            for(let i = 0, l = arr.length; i < l;i++) {
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
const flatten = (arr, depth = 1)  => arr.reduce((a, b) => {
    if (Array.isArray(b) && depth - 1) {
        return a.concat(flatten(b, depth - 1));
    }
    return a.concat(b);
}, []);
flatten([1,[2,3,[4,5,[10]],6],7],2)
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
                Object.assign({ [item]: arr[index] }, acc)
        }, {})
    }
    return fn(arr, act)
}

var arrString = 'abcdaabc';
var arrAr=arrString.split('');
var fn=arrAr=>arrAr.reduce((res,cur)=>{
    res[cur] ? res[cur]++ : res[cur]  = 1;
    return res;
},{})
fn(arrAr)



var arrString = "abcdaabc12AB";
var arr=arrString.replace(/[^a-zA-Z]*/g,'')
arr
"abcdaabcAB"


