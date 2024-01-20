import './App.scss';
import * as Tone from "tone";
//import React, { Component } from "react";
import KbPage from "./comps/kb-page";
import React from 'react';

function App() {
  

  let playNote = function(note, element){
    //console.log("keypress note: " + note);
    //let element = useRef(null);
    console.log(element.myRef.current);
    get

    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

    synth.triggerAttack(note + "4");
    window.onmouseup = function(){synth.triggerRelease(now)}
  }

  return (
    <div className="App">
      <KbPage keyPress={playNote} React={React}/>
    </div>
  );
}

export default App;
