import React from 'react'
import "../css/NumericKeyPad.css"
import backspace from "../../src/backspace.svg"

export default function NumericKeyPad(props) {
    return (
        <div className="numericKeyPad">
            <button className="keyPadBtn" onClick={() => props.addToPin(1)}>1</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(2)}>2</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(3)}>3</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(4)}>4</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(5)}>5</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(6)}>6</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(7)}>7</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(8)}>8</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(9)}>9</button>
            <button className="keyPadBtn" onClick={() => props.addToPin(0)}>0</button>
            <div className="keyPadBtn backspace"><img src={backspace} alt="BackSpace" onClick={props.removePin}></img></div>
        </div>
    )
}
