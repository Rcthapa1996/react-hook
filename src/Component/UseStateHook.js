import React, { useState, useReducer } from 'react';
const INIT = { name: "Ram", count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT": return { ...state, count: state.count + 1 };
        case "UPDATE_NAME": return { name: action.payload, count: state.count };
        case "RESET": return INIT;
        default: return state;
        // default: throw new Error();
    }
}

function UseStateHook({ defaultName }) {

    // const [name, setName] = useState(defaultName);
    // const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(reducer, INIT);
    console.log("State:", state);
    return (
        <>
            <h1>Hello {state.name} count = {state.count}</h1>
            <input type={'text'} name="name" onChange={(val) => dispatch({ type: "UPDATE_NAME", payload: val.target.value })} />
            <button onClick={() => dispatch({ type: "INCREMENT" })} >Click Me</button>
            <button onClick={() => dispatch({ type: "RESET" })} >Reset</button>
        </>
    );
}

export default UseStateHook;
