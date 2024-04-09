import './smallplayer.scss';
//func
import note from './func/note';
import options from './func/options';
import animation from './func/animation';
import { useRef } from 'react';
//import options from './func/options';

export default function SmallPlayer(props) { 

    let chooseMeasure = 0;  //0: small beats //1: beats //2: milliseconds //3: minutes and seconds
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
    
    function clickBackButton(event){
        note.trackSet();
        animation.bobble(event.target || document.getElementById("back-button"));
    }
    function clickPlayButton(event){
        note.playGo();
        animation.bobble(event.target || document.getElementById("play-button"));
    }
    function clickRecButton(event){
        note.recordGo();
        animation.bobble(event.target || document.getElementById("rec-button"));
    }
    
    function seek(event, down) {
        const seekPos = event.nativeEvent.offsetX / event.target.offsetWidth;   // returns decimal
        //options.trackhead = options.trackLength * seekPos;
        note.trackSet(options.trackLength * seekPos);
    }

    const timeNow = useRef(); const trackHead = useRef();
    let tNow = 0;
    setInterval(function () {
        if      (chooseMeasure === 0) {tNow = Math.trunc(options.trackhead)}    // small beats
        else if (chooseMeasure === 1) {tNow = Math.trunc(options.trackhead / options.beatFraction + 1)}    // beats
        else if (chooseMeasure === 2) {tNow = Math.trunc(options.trackhead * options.beatFLen)}  // milliseconds
        else    {//chooseMeasure === 3      // minutes:seconds
            const tSec = (options.trackhead * options.beatFLen) / 1000;
            if (tSec > 60) {                                // if performance issues occur, make extra var to only do this every 6th interval, 450 milliseconds
                const mins = Math.floor(tSec / 60);
                const secs = Math.round(tSec % 60);
                if (secs < 10) {tNow = mins + ":0" + secs}
                else {tNow = mins + ":" + secs}                
            }
            else {tNow = tSec.toFixed(2)}
        }
        try {
            trackHead.current.style.left = ((options.trackhead / options.trackLength) * 100) + "%";
            //console.log(options.trackhead);
            timeNow.current.innerHTML = tNow;
        } catch {}
    }, 72);

    return (      
        <div>
            <button className='smallplayer' id='back-button' onMouseDown={(e) => clickBackButton(e)}>
                <div id='restart-spot' className='smallplayer--icon'></div>
            </button>
            <button className='smallplayer' id='play-button' onMouseDown={(e) => clickPlayButton(e)}>
                <div id='play-spot' className='smallplayer--icon'></div>
                <div id='pause-spot' className='smallplayer--icon'></div>
            </button>
            <button className='smallplayer' id='rec-button'  onMouseDown={(e) => clickRecButton(e)}>
                <div id='red-spot' className='smallplayer--icon'></div>
            </button>

            <div className='seeker'>
                <div className='seeker--t' ref={timeNow}>0</div>
                <div className='seeker--track' onMouseDown={(e) => seek(e, true)} onMouseUp={(e) => seek(e, false)}>
                    <div className='seeker--track--line'></div>
                    <div className='seeker--track--head' ref={trackHead}></div>
                </div>
                <div className='seeker--t'>{measTrkLen}</div>
            </div>
        </div>
    );
}