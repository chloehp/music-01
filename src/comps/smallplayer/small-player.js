import './smallplayer.scss';
//func
import note from '../func/note';
import options from '../func/options';
import animation from '../func/animation';
import { useRef } from 'react';
import { useState } from 'react';
//import options from './func/options';
let smallPlayerRenders = 0;

export default function SmallPlayer(props) {     
    smallPlayerRenders++;
    const thisRender = smallPlayerRenders;

    const [newBPM, setBPM] = useState(options.getBPM());
    const [timeNow, setTimeNow] = useState(0);
    const [chooseMeasure, setMeasure] = useState(options.measureSelect);
    const [measureLabel, setMeasureLabel] = useState("b/" + options.beatFraction);
    //let chooseMeasure = 0;  //0: small beats //1: beats //2: milliseconds //3: minutes and seconds
    let measTrkLen = 0;
    if      (chooseMeasure === 0) {measTrkLen = options.trackLength}
    else if (chooseMeasure === 1) {measTrkLen = options.trackLength / options.beatFraction}
    else if (chooseMeasure === 2) {measTrkLen = Math.trunc(options.trackLength * options.beatFLen)}
    else    {//chooseMeasure === 3
        const tSec = (options.trackLength * options.beatFLen) / 1000;
        if (tSec > 60) {                                // if performance issues occur, make extra var to only do this every 6th interval, 450 milliseconds
            const mins = Math.floor(tSec / 60);
            const secs = Math.round(tSec % 60);
            if (secs < 10) {measTrkLen = mins + ":0" + secs}
            else {measTrkLen = mins + ":" + secs}                
        }
        else {measTrkLen = tSec.toFixed(2)}
    }

    function changeMeasure(x) {
        let meas = chooseMeasure;
        const labels = [("b/" + options.beatFraction), "Beats", "ms", "M:S"];
        if (x < 0) {meas--}
        else {meas++}
        
        if (meas < 0) {meas = labels.length - 1}
        if (meas > labels.length - 1) {meas = 0}

        options.measureSelect = meas;
        setMeasure(meas);
        setMeasureLabel(labels[meas]);
        console.log("new time measure type " + meas + ": " + labels[meas]);
    }

    function changeBPM(x) {
        console.log(options.beatFLen);
        let xBPM = options.getBPM() + x;
        if (xBPM < 30) {xBPM = 30}
        if (xBPM > 995) {xBPM = 995}
        setBPM(xBPM);
        options.beatFLen = options.getNewBeatFLenFromNewBPM(xBPM);
        console.log(options.beatFLen);
    }
    
    function clickBackButton(event){
        note.trackSet();
        animation.bobble(event.target);
    }
    function clickPlayButton(event){
        note.playGo();
        animation.bobble(event.target);
    }
    function clickRecButton(event){
        note.recordGo();
        animation.bobble(event.target);
    }
    
    function seek(event, down) {
        const seekPos = event.nativeEvent.offsetX / event.target.offsetWidth;   // returns decimal
        //options.trackhead = options.trackLength * seekPos;
        note.trackSet(options.trackLength * seekPos);
    }

    //const timeNow = useRef(); 
    const trackHead = useRef();
    let tNow = 0;
    const trackInterval = setInterval(function () {
        if (smallPlayerRenders > thisRender) {      // if higher re-renders exist
            clearInterval(trackInterval);           // clear interval to prevent multiple instances
            return
        }

        if      (options.measureSelect === 0) {tNow = Math.trunc(options.trackhead)}    // small beats
        else if (options.measureSelect === 1) {tNow = Math.trunc(options.trackhead / options.beatFraction + 1)}    // beats, +1 to start at 1
        else if (options.measureSelect === 2) {tNow = Math.trunc(options.trackhead * options.beatFLen)}  // milliseconds
        else    {//chooseMeasure === 3      // minutes:seconds
            const tSec = (options.trackhead * options.beatFLen) / 1000;
            if (tSec > 60) {
                const mins = Math.floor(tSec / 60);
                const secs = Math.round(tSec % 60);
                if (secs < 10) {tNow = mins + ":0" + secs}
                else {tNow = mins + ":" + secs}                
            }
            else {tNow = tSec.toFixed(2)}
        }
        //console.log(thisRender);
        try {
            trackHead.current.style.left = ((options.trackhead / options.trackLength) * 100) + "%";
            setTimeNow(tNow);
        } catch {}
    }, 90);

    return (      
        <div>
            <div className='smallplayer'>
                <div className='optionSelect' id='sp-bpm' title='BPM'>
                    <button className='optionSelect--arrow optionSelect--up' aria-label='Raise BPM' onClick={() => changeBPM(5)}></button>
                    <p className='optionSelect--p'>{newBPM}</p>
                    <button className='optionSelect--arrow optionSelect--down' aria-label='Lower BPM' onClick={() => changeBPM(-5)}></button>
                </div>
                <button className='smallplayer--btn' id='back-button' onClick={(e) => clickBackButton(e)} aria-label='Restart track'>
                    <div id='restart-spot' className='smallplayer--btn--icon'></div>
                </button>
                <button className='smallplayer--btn' id='play-button' onClick={(e) => clickPlayButton(e)} aria-label='Play track'>
                    <div id='play-spot' className='smallplayer--btn--icon'></div>
                    <div id='pause-spot' className='smallplayer--btn--icon'></div>
                </button>
                <button className='smallplayer--btn' id='rec-button'  onClick={(e) => clickRecButton(e)} aria-label='Record track'>
                    <div id='red-spot' className='smallplayer--btn--icon'></div>
                </button>
                <div className='optionSelect' id='sp-meas' title='Time measure'>
                    <button className='optionSelect--arrow optionSelect--up' aria-label='Previous time measure' onClick={() => changeMeasure(-1)}></button>
                    <p className='optionSelect--p'>{measureLabel}</p>
                    <button className='optionSelect--arrow optionSelect--down' aria-label='Next time measure' onClick={() => changeMeasure(1)}></button>
                </div>
            </div>

            <div className='seeker'>
                <input className='seeker--t' type='text' value={timeNow}></input>
                <div className='seeker--track' onMouseDown={(e) => seek(e, true)} onMouseUp={(e) => seek(e, false)}>
                    <div className='seeker--track--line'></div>
                    <div className='seeker--track--head' ref={trackHead}></div>
                </div>
                <input className='seeker--t' type='text' value={measTrkLen}></input>
            </div>
        </div>
    );
}