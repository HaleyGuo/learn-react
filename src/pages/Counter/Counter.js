import React, {Compoment} from 'react';
import{increment, decrement,reset} from 'actions/counter';
import { connect } from 'react-redux';
//connect接收两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops,
// 就是把发射actions的方法，转为Props属性函数。
class Counter extends React.Component {
    render() {
        return (
            <div>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={() => {
                    console.log('调用自增函数');
                    this.props.increment();
                }}>自增
                </button>
                <button onClick={() => {
                    console.log('调用自减函数');
                    this.props.decrement();
                }}>自减
                </button>
                <button onClick={() => {
                    console.log('调用重置函数');
                    this.props.reset()
                }}>重置
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
