// actions/counter.js  先来写action创建函数。通过action创建函数，可以创建action~
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment(){
    return {type:INCREMENT};
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}