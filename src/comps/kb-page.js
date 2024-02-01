//scss
import '../App.scss';
import './cob.scss';
//
import { useRef } from 'react';
//func
import note from './func/note';
import options from './func/options';
//pages
import Keyboard from "./kb/keyboard";
import Tracker from './track/tracker';
import SmallPlayer from './small-player';

export default function KbPage(props) {    
    //refs
    const kbRef = useRef();    
    const kbCob0 = useRef();    const kbCob1 = useRef();    const kbCob2 = useRef();    
    const m0Ref = useRef();    const m1Ref = useRef();    const m2Ref = useRef();
    const trackRef = useRef();

    let kbTrack = true;
    function kbPageChange() { //maybe clean this up with css animations?
        if (kbTrack === true) { // display keyboard
            kbRef.current.classList.add("hide");
            kbCob1.current.classList.add("hide");
            kbCob2.current.classList.add("hide");

            m0Ref.current.classList.remove("ogkb");
            m0Ref.current.classList.add("trak");

            setTimeout(function(){
                m1Ref.current.classList.remove("ogkb");
                m1Ref.current.classList.add("trak");

                kbCob0.current.classList.add("hide");
            }, 300);    
            setTimeout(function(){
                m2Ref.current.classList.remove("ogkb");
                m2Ref.current.classList.add("trak");
            }, 600);     
            setTimeout(function(){
                kbCob0.current.classList.remove("hide");            
                trackRef.current.classList.remove("hide");
            }, 900);      
            kbTrack = false;
        }
        else { // display tracker
            trackRef.current.classList.add("hide");
            
            m0Ref.current.classList.remove("trak");
            m0Ref.current.classList.add("ogkb");

            kbCob0.current.classList.add("hide");
            setTimeout(function(){
                m1Ref.current.classList.remove("trak");
                m1Ref.current.classList.add("ogkb");
            }, 300);    
            setTimeout(function(){
                kbCob0.current.classList.remove("hide");

                m2Ref.current.classList.remove("trak");
                m2Ref.current.classList.add("ogkb");
                
                kbRef.current.classList.remove("hide");
            }, 600);   
            setTimeout(function(){
                kbCob1.current.classList.remove("hide");
                kbCob2.current.classList.remove("hide");
            }, 1200);    
            kbTrack = true;
        }
    }

    function changeOctave(changeTo = 3, behave = "smooth") {   //NEEDS WORK
        const octEls = document.querySelectorAll(".keyboard--oct-group");    
        if (octEls[changeTo - 1]) {
            const kbToScrollTo = octEls[changeTo - 1].offsetLeft;
            document.querySelector(".keyboard").scrollTo({top: 0, left: kbToScrollTo, behavior: behave});
            options.octave = changeTo;
        }
        else if (octEls[0]){console.log("stop. min/max octave")}
        else {
        setTimeout(function(){
            console.log("try qselect again");
            changeOctave(changeTo, behave);
        }, 300)} 
    }
    changeOctave(3, "instant");

    return (      
        <div className='kb-page'>
            <div>
                <div ref={kbCob0} className='kb-page--cob' id='kbcob-0'></div>
                <div ref={kbCob1} className='kb-page--cob' id='kbcob-1'></div>
                <div ref={kbCob2} className='kb-page--cob' id='kbcob-2'><SmallPlayer /></div>

                <div ref={m0Ref} className='kb-page--cob cobm' id='kbcob-m-0' onClick={kbPageChange}></div>
                <div ref={m1Ref} className='kb-page--cob cobm' id='kbcob-m-1'>
                    <div className='kb-page--cob--octave' style={{top: 0}}    onClick={() => changeOctave(options.octave + 1)}></div>
                    <div className='kb-page--cob--octave' style={{bottom: 0}} onClick={() => changeOctave(options.octave - 1)}></div>
                </div>
                <div ref={m2Ref} className='kb-page--cob cobm' id='kbcob-m-2' onClick={note.recordGo}><div className='red-spot center'></div></div>
            </div>

            <Keyboard kbRef={kbRef}/>
            <Tracker trackRef={trackRef}/>
        </div>
    );
}