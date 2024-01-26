import './App.scss';
import * as Tone from "tone";
//import { useRef } from 'react';
//import React, { useState } from 'react'; 
import KbPage from "./comps/kb-page";

function App() {  
  const activeNotes = [];
  const activeTones = [];
  const now = Tone.now();  

  document.body.addEventListener('keydown', function(event) { //keyboard keyboard attack
    const hit = keySwitch(event.key, 3);
    if (hit){attackNote(hit)}; 
  });
  document.body.addEventListener('keyup', function(event) { //keyboard keyboard release
    const hit = keySwitch(event.key, 3);
    if (hit){releaseNote(hit)}; 
  });
  let keySwitch = function(key, oct){
    switch(key) {
      case "Shift": return "C" + oct;
      case "a": return "C#" + oct;
      case "z": return "D" + oct;
      case "s": return "D#" + oct;
      case "x": return "E" + oct;
      case "c": return "F" + oct;
      case "f": return "F#" + oct;
      case "v": return "G" + oct;
      case "g": return "G#" + oct;
      case "b": return "A" + oct;
      case "h": return "A#" + oct;
      case "n": return "B" + oct;
      
      case "q": return "C" + (oct + 1);
      case "2": return "C#" + (oct + 1);
      case "w": return "D" + (oct + 1);
      case "3": return "D#" + (oct + 1);
      case "e": return "E" + (oct + 1);
      case "r": return "F" + (oct + 1);
      case "5": return "F#" + (oct + 1);
      case "t": return "G" + (oct + 1);
      case "6": return "G#" + (oct + 1);
      case "y": return "A" + (oct + 1);
      case "7": return "A#" + (oct + 1);
      case "u": return "B" + (oct + 1);
      
      case "i": return "C" + (oct + 2);
      case "9": return "C#" + (oct + 2);
      case "o": return "D" + (oct + 2);
      case "0": return "D#" + (oct + 2);
      case "p": return "E" + (oct + 2);
      case "[": return "F" + (oct + 2);
      case "=": return "F#" + (oct + 2);
      case "]": return "G" + (oct + 2);
      case "Backspace": return "G#" + (oct + 2);
      case "#": return "A" + (oct + 2);

      default: return false;
    }
  }

  let hitLatency = 0.03; //control for performance
  //try turning this into global.attackNote to clean props
  let attackNote = function(note){ 
    if (activeNotes.indexOf(note) === -1){
      let instrument = new Tone.Synth().toDestination(); //instrument choice
      activeNotes.push(note);
      activeTones.push(instrument);
      activeTones[activeNotes.length - 1].triggerAttack(note, ('+' + hitLatency));
      
      document.getElementById("kk-" + note).style.filter = "contrast(0.3)";
      displayNote();
    }
  }
  let releaseNote = function(note){ 
    const thisNoteIndex = activeNotes.indexOf(note);
    if (thisNoteIndex !== -1){
      activeTones[thisNoteIndex].triggerRelease(now);

      activeNotes.splice(thisNoteIndex, 1);
      activeTones.splice(thisNoteIndex, 1);
      
      document.getElementById("kk-" + note).style.filter = "contrast(1)";
      displayNote();
    }
  }
  let displayNote = function(){
    document.getElementById("note-displayer").innerText = activeNotes;
  }

  return (
    <div className="App">
      <KbPage keyPress={attackNote} keyRelease={releaseNote}/>
      <p id='note-displayer'></p>
    </div>
  );
}

export default App;
//
