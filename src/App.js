import './App.scss';

//plugins
import * as Tone from "tone";
import { useRef } from 'react';
//import React, { useState } from 'react'; 

//pages
import KbPage from "./comps/kb-page";
import Start from './comps/start';

//functions
import keySwitch from "./comps/func/key-switch";
import options from "./comps/func/options";
import note from './comps/func/note';


export default function App() {  

  //PC keyboard -> musical keyboard
  window.addEventListener('keydown', function(event) {  //keyboard keyboard attack
    if (event.repeat) {return}                          //prevent usual keydown continuous fire
    const hit = keySwitch(event.key, options.octave);   //keyswitch
    if (hit){note.attackNote(hit)};                     //attack
  });
  window.addEventListener('keyup', function(event) {    //keyboard keyboard release
    const hit = keySwitch(event.key, options.octave);   //keyswitch
    if (hit){note.releaseNote(hit)};                    //release
  });

  const startRef = useRef();
  function initiate() {
    Tone.start();
    startRef.current.classList.add("hide");    
    const octEls = document.querySelectorAll(".keyboard--oct-group");    //get all octaves and keys
    console.log(octEls[0].children[0].id);
  }
  
  return (
    <div className="App">
      <Start startRef={startRef} startInitFun={initiate}/>
      <KbPage />
      <p id='note-displayer'></p>
    </div>
  );
}

