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
import SmallPlayer from './small-player';
import ScalesList from './scales-list';
import InstrusAndEffects from './instrus-effects/instrus-effects';
import Scales from './scales/scales';
import Settings from './settings/settings';
//import BeatCounter from './scales/beat-counter';

export default function KbPage(props) {    
    //refs   
    const menuCob = useRef(); const instrusEfctsCob = useRef(); const smallPlayerCob = useRef(); const scalesCob = useRef();
    const mOctUp = useRef();    const mOctave = useRef();    const mOctDown = useRef();    
    const kbRef = useRef(); const trackRef = useRef(); const trPlayBtn = useRef(); const scalesWinRef = useRef();

    let kbTrack = true;
    function kbPageChange() { //maybe clean this up with css animations?
        if (kbTrack === true) { // display tracker
            kbRef.current.classList.add("hide");
            instrusEfctsCob.current.classList.add("hide");
            smallPlayerCob.current.classList.add("hide");
            scalesCob.current.classList.add("hide");
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
                instrusEfctsCob.current.classList.remove("hide");
                smallPlayerCob.current.classList.remove("hide");
                scalesCob.current.classList.remove("hide");
                trackRef.current.setAttribute("aria-hidden", "true");
            }, 1200);    
            kbTrack = true;
        }
    }

    function changeOctave(changeTo = 3, behave = "smooth") {
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
    }
    changeOctave(3, "instant");     // default start octave
    
    function clickPlayButton(){
        note.playGo();
        animation.bobble(trPlayBtn.current);
    }

    let settingsOpen = false;
    function displaySettings() {
        const setEl = document.getElementById("settings");
        if (settingsOpen === false) {
            setEl.setAttribute("aria-hidden", "false");
            setEl.classList.remove("hide");
            settingsOpen = true;
        }
        else {
            setEl.setAttribute("aria-hidden", "true");
            setEl.classList.add("hide");
            settingsOpen = false
        }
    }

    //function m2Click() {
    //    if (scalesWinRef.current.classList.contains("win-open") === true) {scalesWinRef.current.classList.remove("win-open")}
    //    else {scalesWinRef.current.classList.add("win-open")}
    //}

    return (      
        <div className='kb-page'>
            <Settings />
            <Tracker trackRef={trackRef}/>
            <div>
                <div ref={menuCob} className='kb-page--cob' id='cob-menu'></div>
                    <button className='kb-page--cob cobm' id='kbcob-m-tracker' onClick={kbPageChange}>
                        <p className='cobm--p'>Tracker</p>
                    </button>
                    <button className='kb-page--cob cobm' id='kbcob-m-settings' onClick={displaySettings}>
                        <p className='cobm--p'>Settings</p>
                    </button>
                    <button className='kb-page--cob cobm' id='kbcob-m-help'>
                        <p className='cobm--p'>Help</p>
                    </button>

                <div ref={instrusEfctsCob} className='kb-page--cob' id='cob-instrus-efcts'>
                    <InstrusAndEffects />
                </div>
                <div ref={smallPlayerCob} className='kb-page--cob' id='cob-smallplayer'>
                    <SmallPlayer />
                </div>
                <div ref={scalesCob} className='kb-page--cob' id='cob-scales'>
                    <Scales />
                    {/*<BeatCounter />*/}
                </div>

                <button ref={mOctUp} className='kb-page--cob cobm' id='kbcob-m-oct-up' onClick={() => changeOctave(options.octave + 1)} aria-label='Octave: Up 1'></button>
                <div ref={mOctave} className='kb-page--cob cobm' id='kbcob-m-oct'>
                    <p className='cobm--p'>Octave</p>
                </div>
                <button ref={mOctDown} className='kb-page--cob cobm' id='kbcob-m-oct-down' onClick={() => changeOctave(options.octave - 1)} aria-label='Octave: Down 1'></button>

                <div ref={trPlayBtn} id='tracker-play-btn' onMouseDown={clickPlayButton}></div>
            </div>
            
            <Keyboard kbRef={kbRef}/>
            <ScalesList scalesWinRef={scalesWinRef}/>
        </div>
    );
}