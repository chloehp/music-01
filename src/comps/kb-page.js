//scss
import '../App.scss';
import './cob.scss';
//react
import { useRef } from 'react';
//func
import note from './func/note';
import animation from './func/animation';
import options from './func/options';
//pages
import Keyboard from "./kb/keyboard";
import Tracker from './track/tracker';
import SmallPlayer from './smallplayer/small-player';
import ScalesList from './scales/scales-list';
import InstrusAndEffects from './instrus-effects/instrus-effects';
import Scales from './scales/scales';
import Settings from './settings/settings';
//import BeatCounter from './scales/beat-counter';

export default function KbPage(props) {    
    //refs   
    const menuCob = useRef(); const cobs = useRef(); const scaleBack = useRef();
    const mOctUp = useRef();    const mOctave = useRef();    const mOctDown = useRef();    
    const kbRef = useRef(); const trackRef = useRef(); const trPlayBtn = useRef(); const scalesWinRef = useRef();

    let kbTrack = true;
    function kbPageChange(event) { //maybe clean this up with css animations?
        if (kbTrack === true) { // display tracker
            kbRef.current.classList.add("hide");
            cobs.current.classList.add("hide");
            setTimeout(function(){
                trPlayBtn.current.classList.add("trak");
            }, 300);       
            setTimeout(function(){          
                trackRef.current.classList.remove("hide");
                trackRef.current.setAttribute("aria-hidden", "false");
            }, 900);      
            kbTrack = false;
        }
        else { // display keyboard
            trackRef.current.classList.add("hide");        
            trackRef.current.setAttribute("aria-hidden", "true");
            trPlayBtn.current.classList.remove("trak");  
            setTimeout(function(){            
                kbRef.current.classList.remove("hide");
            }, 600);   
            setTimeout(function(){
                cobs.current.classList.remove("hide");
                trackRef.current.setAttribute("aria-hidden", "true");
            }, 1200);    
            kbTrack = true;
        }
        animation.bobble(event.target);
    }
    
    let settingsOpen = false;
    function displaySettings(event) {
        const setEl = document.getElementById("settings");
        if (settingsOpen === false) {
            setEl.setAttribute("aria-hidden", "true");
            setEl.classList.add("open");
            settingsOpen = true;
        }
        else {
            setEl.setAttribute("aria-hidden", "false");
            setEl.classList.remove("open");
            settingsOpen = false
        }
        animation.bobble(event.target);
        console.log(settingsOpen);
    }

    let helpActive = false;
    function displayHelp(event) {
        if (helpActive === false) {
            helpActive = true;
        }
        else {
            helpActive = false
        }
        animation.bobble(event.target);
    }

    function changeOctave(changeTo = 3, behave = "smooth", event) {
        if ((changeTo > 6) || (changeTo < 1)) {return}                      // if above or below range, don't
        const octEls = document.querySelectorAll(".keyboard--oct-group");   //
        if (octEls[0]) {                                                    // if exists
            const kbToScrollTo = octEls[changeTo - 1].offsetLeft;
            document.querySelector(".keyboard").scrollTo({top: 0, left: kbToScrollTo, behavior: behave});   // scroll to
            options.octave = changeTo;                                      // change octave option
        }
        else {
        setTimeout(function(){
            console.log("try qselect again");
            changeOctave(changeTo, "instant");                              // if it didn't work, try again without smooth scroll
        }, 300)} 
        if (event) {animation.bobble(event.target)}
    }
    changeOctave(3, "instant");     // default start octave
    
    function clickPlayButton(){
        note.playGo();
        animation.bobble(trPlayBtn.current);
    }

    //function m2Click() {
    //    if (scalesWinRef.current.classList.contains("win-open") === true) {scalesWinRef.current.classList.remove("win-open")}
    //    else {scalesWinRef.current.classList.add("win-open")}
    //}
    
    let scaleExpanded = false;
    function scaleExpand() {
        const dropdownButton = scaleBack.current.children[scaleBack.current.childElementCount - 1];
        if (scaleExpanded === false) {
            scaleBack.current.classList.add("expanded");
            dropdownButton.style.rotate = "180deg";
            scaleExpanded = true;
        }
        else {
            scaleBack.current.classList.remove("expanded");
            dropdownButton.style.rotate = "0deg";
            scaleExpanded = false;
        }
    } 

    return (      
        <div className='kb-page'>
            <Settings displaySettings={displaySettings}/>
            <Tracker trackRef={trackRef}/>
            <div>
                <div ref={menuCob} className='kb-page--cob' id='cob-menu'></div>
                <button className='kb-page--cob cobm' id='kbcob-m-tracker' onClick={(e) => kbPageChange(e)}>
                    <p className='cobm--p'>Tracker</p>
                </button>
                <button className='kb-page--cob cobm' id='kbcob-m-settings' onClick={(e) => displaySettings(e)}>
                    <p className='cobm--p'>Settings</p>
                </button>
                <button className='kb-page--cob cobm' id='kbcob-m-help' onClick={(e) => displayHelp(e)}>
                    <p className='cobm--p'>Help</p>
                </button>

                <div ref={cobs} className='cobs'>
                    <InstrusAndEffects />
                    <SmallPlayer />
                    <div className='kb-page--cob cob-scales' ref={scaleBack}>
                        <button className='cob-scales--dropdown' onClick={scaleExpand}></button>
                    </div>
                    <Scales />
                </div>

                <button ref={mOctUp} className='kb-page--cob cobm' id='kbcob-m-oct-up' onClick={(e) => changeOctave(options.octave + 1, "smooth", e)} aria-label='Octave: Up 1'></button>
                <div ref={mOctave} className='kb-page--cob cobm' id='kbcob-m-oct'>
                    <p className='cobm--p'>Octave</p>
                </div>
                <button ref={mOctDown} className='kb-page--cob cobm' id='kbcob-m-oct-down' onClick={(e) => changeOctave(options.octave - 1, "smooth", e)} aria-label='Octave: Down 1'></button>

                <div ref={trPlayBtn} id='tracker-play-btn' onMouseDown={clickPlayButton}></div>
            </div>
            
            <Keyboard kbRef={kbRef}/>
            <ScalesList scalesWinRef={scalesWinRef}/>
        </div>
    );
}