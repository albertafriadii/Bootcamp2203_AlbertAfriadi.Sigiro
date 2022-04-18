import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

const element = <h1>This is React</h1>;
const nav = 
<div class="nav">
    <h2>BOOTCAMP Batch 1 : Experiment with REACTJS</h2>
        <div class="nav-items">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
</div>

ReactDOM.render(element, document.getElementById("root"));
ReactDOM.render(nav, document.getElementById("nav"));