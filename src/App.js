import './App.scss';

//plugins
import * as Tone from "tone";
import { useRef } from 'react';
//import React, { useState } from 'react'; 

//pages
import KbPage from "./comps/kb-page";

//functions
import keySwitch from "./comps/func/key-switch";
import tra from "./comps/func/tracks";


export default function App() {  
  
  const activeNotes = [];
  const activeTones = [];
  const now = Tone.now();  

  //user options
  let octave = 3;
  let hitLatency = 0.03; //control for performance

  //track options
  let tempo = 30;
  let track = tra.ck00;
  let trackhead = 0;

  //PC keyboard -> musical keyboard
  window.addEventListener('keydown', function(event) {  //keyboard keyboard attack
    if (event.repeat) return;                           //prevent usual keydown continuous fire
    const hit = keySwitch(event.key, octave);           //keyswitch
    if (hit){attackNote(hit)};                          //attack
  });
  window.addEventListener('keyup', function(event) {    //keyboard keyboard release
    const hit = keySwitch(event.key, octave);           //keyswitch
    if (hit){releaseNote(hit)};                         //release
  });

  const attackNote = function(note){ 
    if (activeNotes.indexOf(note) === -1){
      let instrument = new Tone.Synth().toDestination();                            //instrument choice
      activeNotes.push(note);                                                       // push to array
      activeTones.push(instrument);                                                 // push to array
      activeTones[activeTones.length - 1].triggerAttack(note, ('+' + hitLatency));  //make sound    
      document.getElementById("kk-" + note).style.filter = "contrast(0.3)";         //visual press key
      displayNote();
    }
  }
  const releaseNote = function(note){ 
    const thisNoteIndex = activeNotes.indexOf(note);
    if (thisNoteIndex !== -1){
      try {
        activeTones[thisNoteIndex].triggerRelease(now);                             // release note   
        activeNotes.splice(thisNoteIndex, 1);                                       // remove from array
        activeTones.splice(thisNoteIndex, 1);                                       // remove from array
        document.getElementById("kk-" + note).style.filter = "contrast(1)";         // visual press key
        activeNotes.push(note + "*");
        displayNote();
    
        setTimeout(function(){
          activeNotes.splice(activeNotes.indexOf(note + "*"), 1)
          displayNote();
        }, tempo);    
      }
      catch {
        console.warn("note overload, stop all");
        for (let i = 0; i < activeTones.length; i++) {
          activeTones[i].triggerRelease(now);
          activeNotes.splice(i, 1);
          activeTones.splice(i, 1);
        }
      }
    }
  }

  const noteDisplayer = useRef();
  const displayNote = function(){        
    if (noteDisplayer.current){noteDisplayer.current.innerText = activeNotes}
  }

  let recBool = false
  const recordOnOff = function(){
    recBool = !recBool;
    record();
  }
  const record = function(){  
    if (recBool === true) {
      const an = [];
      for (let i = 0; i < activeNotes.length; i++) {an.push(activeNotes[i])}
      setTimeout(function(){
        const newPoint = {n : an};
        track.splice(trackhead, 0, newPoint); // add newpoint at trackhead in recording track
        trackhead++;                          // move trackhead forward
        record();
      }, tempo);    
    }
    else {
        console.log(track);
    }
  }
  return (
    <div className="App">
      <KbPage keyPress={attackNote} keyRelease={releaseNote} recButton={recordOnOff}/>
      <p ref={noteDisplayer} id='note-displayer'></p>
    </div>
  );
}

