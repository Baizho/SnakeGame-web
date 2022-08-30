import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
    const [ScreenWidth, setWidth] = useState(0);
    const [ScreenHeight, setHeight] = useState(0);
    const [gameLength, setLength] = useState(0);
    useEffect(() => {
        //console.log(ScreenWidth,ScreenHeight,gameLength)
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if(window.innerWidth<window.innerHeight){setLength(window.innerWidth);}
         else {setLength(window.innerHeight);}
    }, [ScreenWidth,ScreenHeight,gameLength]);
    //street chef always insulted, challenges worlds no 1 chef to an cooking comepetition
    return (
        <>
            <div id="Menu" style={{position: "absolute"}}>
                <div id="innerMenu" className="Flexcol center" style={{ position: "absolute", width: ScreenWidth, height: ScreenHeight }}>
                    <div style={{ backgroundColor: "white", width: `${100/2.5}%`, height: `${100/2.5}%`}}>
                        <div className="Flexrow center" style={{ position: "absolute", width: `${100/2.5}%` }}>
                            <h3 id="Score" >Score: 0</h3>
                            <h3 id="Mxscore" style={{ paddingLeft: `${100/5.8}%` }}>Max Score: 0</h3>
                        </div>
                        <div className="Flexcol center" style={{ gap:2,position: "absolute", width: `${100/2.5}%`,height: `${100/2.5}%`}}>
                            <label htmlFor="speed" ><strong>Speed (between 1 and 3):</strong></label>
                            <select id="speed"style={{zIndex:501}}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <div><strong>Space to Pause</strong></div>
                            <p><strong>WASD or ArrowKeys to move</strong></p>
                        </div>
                        <div className="Flexcol center" style={{ position: "absolute", width: `${100/2.5}%`, height: `${100/2.5}%`, justifyContent: "flex-end" }}>
                            <button id="Playbtn" style={{ marginBottom: 20, backgroundColor: "whitesmoke", color: "black", width: `${100/2}%`, height: `${100/6}%`, fontSize: "100%" }}>Play / Press R</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Game" className="Flexcol center" style={{ backgroundColor: "lightgrey", borderStyle: "solid", borderWidth: "2px 2px", width: gameLength, height: gameLength }}></div>
            <Script src="script.js" ></Script>
        </>
    )
}