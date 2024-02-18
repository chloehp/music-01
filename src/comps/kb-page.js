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
import InstrusAndEffects from './instrus-effects';

export default function KbPage(props) {    
    //refs   
    const kbCob0 = useRef(); const kbCob1 = useRef(); const kbCob2 = useRef(); const kbCob3 = useRef();
    const m0Ref = useRef();    const m1Ref = useRef();    const m2Ref = useRef();    
    const kbRef = useRef(); const trackRef = useRef(); const trPlayBtn = useRef(); const scalesWinRef = useRef();

    let kbTrack = true;
    function kbPageChange() { //maybe clean this up with css animations?
        if (kbTrack === true) { // display tracker
            kbRef.current.classList.add("hide");
            kbCob1.current.classList.add("hide");
            kbCob2.current.classList.add("hide");
            kbCob3.current.classList.add("hide");
            m0Ref.current.classList.remove("ogkb");
            m0Ref.current.classList.add("trak");

            setTimeout(function(){
                m1Ref.current.classList.remove("ogkb");
                m1Ref.current.classList.add("trak");
                //kbCob0.current.classList.add("hide");
                trPlayBtn.current.classList.add("trak");
            }, 300);    
            setTimeout(function(){
                m2Ref.current.classList.remove("ogkb");
                m2Ref.current.classList.add("trak");
            }, 600);     
            setTimeout(function(){
                //kbCob0.current.classList.remove("hide");            
                trackRef.current.classList.remove("hide");
            }, 900);      
            kbTrack = false;
        }
        else { // display keyboard
            trackRef.current.classList.add("hide");            
            m0Ref.current.classList.remove("trak");
            m0Ref.current.classList.add("ogkb");
            //kbCob0.current.classList.add("hide");
            trPlayBtn.current.classList.remove("trak");
            setTimeout(function(){
                m1Ref.current.classList.remove("trak");
                m1Ref.current.classList.add("ogkb");
            }, 300);    
            setTimeout(function(){
                //kbCob0.current.classList.remove("hide");
                m2Ref.current.classList.remove("trak");
                m2Ref.current.classList.add("ogkb");                
                kbRef.current.classList.remove("hide");
            }, 600);   
            setTimeout(function(){
                kbCob1.current.classList.remove("hide");
                kbCob2.current.classList.remove("hide");
                kbCob3.current.classList.remove("hide");
            }, 1200);    
            kbTrack = true;
        }
    }

    function changeOctave(changeTo = 3, behave = "smooth") {   //NEEDS WORK
        if ((changeTo > 6) || (changeTo < 1)) {return}
        const octEls = document.querySelectorAll(".keyboard--oct-group");    
        if (octEls[0]) {
            const kbToScrollTo = octEls[changeTo - 1].offsetLeft;
            document.querySelector(".keyboard").scrollTo({top: 0, left: kbToScrollTo, behavior: behave});
            options.octave = changeTo;
        }
        else {
        setTimeout(function(){
            console.log("try qselect again");
            changeOctave(changeTo, "instant");
        }, 300)} 
    }
    changeOctave(3, "instant");
    
    function clickPlayButton(){
        note.playGo();
        animation.bobble(trPlayBtn.current);
    }

    function m2Click() {
        if (scalesWinRef.current.classList.contains("win-open") === true) {scalesWinRef.current.classList.remove("win-open")}
        else {scalesWinRef.current.classList.add("win-open")}
    }

    return (      
        <div className='kb-page'>
            <div>
                <div ref={kbCob0} className='kb-page--cob' id='kbcob-0'>
                    <div id='main-menu'>
                        <div className='sm-item' id='sm-latency'>Hit latency</div>
                        <div className='sm-item' id='sm-rounding'>Beat Rounding</div>
                        <div className='sm-item' id='sm-fraction'>Beat Fraction</div>
                        <div className='sm-item' id='sm-bpm'>BPM</div>
                        <div className='sm-item' id='sm-length'>Track Length</div>
                        <div className='sm-item' id='sm-qwerty'>Qwerty Keyboard</div>
                        <div className='sm-item' id='sm-notes'>Visible Notes</div>
                    </div>
                    <p >Credits</p>
                </div>
                <div ref={kbCob1} className='kb-page--cob' id='kbcob-1'><InstrusAndEffects /></div>
                <div ref={kbCob2} className='kb-page--cob' id='kbcob-2'><SmallPlayer /></div>
                <div ref={kbCob3} className='kb-page--cob' id='kbcob-3'>
                    <div className='beatCounter' id='beatCounter'>
                        <div className='beatCounter--C1L'></div><div className='beatCounter--C1R'></div>
                        <div className='beatCounter--C2L'></div><div className='beatCounter--C2R'></div>
                        <div className='beatCounter--C1L'></div><div className='beatCounter--C1R'></div>
                        <div className='beatCounter--C2L'></div><div className='beatCounter--C2R'></div>
                    </div>
                </div>

                <div ref={m0Ref} className='kb-page--cob cobm' id='kbcob-m-0' onClick={kbPageChange}><p className='cobm--p'>Tracker</p></div>
                <div ref={m1Ref} className='kb-page--cob cobm' id='kbcob-m-1'>
                    <p className='cobm--p'>Octave</p>
                    <div className='cobm--octave' style={{top: 0}}    onClick={() => changeOctave(options.octave + 1)}></div>
                    <div className='cobm--octave' style={{bottom: 0}} onClick={() => changeOctave(options.octave - 1)}></div>
                </div>
                <div ref={m2Ref} className='kb-page--cob cobm' id='kbcob-m-2' onClick={m2Click}><p className='cobm--p'>Scales</p></div>
                <div ref={trPlayBtn} id='tracker-play-btn' onMouseDown={clickPlayButton}>Play/Pause</div>
            </div>
            
            <ScalesList scalesWinRef={scalesWinRef}/>

            <Keyboard kbRef={kbRef}/>
            <Tracker trackRef={trackRef}/>
        </div>
    );
}