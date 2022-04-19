import React from 'react';

const nav = () => {
return(
    <React.Fragment>    
        <div class="nav">
            <h2>BOOTCAMP Batch 1 : Experiment with REACTJS</h2>
            <div class="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>{new Date().toLocaleTimeString()}</li>
                </ul>
            </div>
        </div>
    </React.Fragment>
)}

export default nav;
