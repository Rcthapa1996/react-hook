import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

const INIT = { name: "Ram", count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT": return { ...state, count: state.count + 1 };
        case "UPDATE_NAME": return { name: action.payload, count: state.count };
        case "RESET": return INIT;
        default: return state;
    }
}

function UseStateHook({ defaultName }) {
    const [state, dispatch] = useReducer(reducer, INIT);
    console.log("State:", state);
    const [next, setNext] = useState(0);
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/comments").then((response) => {
            console.log("response: ", response, response.data);
            dispatch({ type: "UPDATE_NAME", payload: response.data[next].email })
        })
    }, [next])
    return (
        <>
            <h1>Hello {state.name} count = {state.count} Next : {next}</h1>
            <input type={'text'} name="name" onChange={(val) => dispatch({ type: "UPDATE_NAME", payload: val.target.value })} />
            <button onClick={() => dispatch({ type: "INCREMENT" })} >Click Me</button>
            <button onClick={() => dispatch({ type: "RESET" })} >Reset</button>
            <button onClick={() => setNext(next + 1)} >Next</button>
            <button onClick={() => setNext(next - 1)} >Pre</button>
        </>
    );
}

export default UseStateHook;
