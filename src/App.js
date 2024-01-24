import './App.scss';
import * as Tone from "tone";
//import { useRef } from 'react';
import KbPage from "./comps/kb-page";

function App() {
  
  const activeNotes = [];
  const activeTones = [];
  const now = Tone.now();  

  let attackNote = function(note){
    if (activeNotes.indexOf(note) === -1){
      activeNotes.push(note);
      activeTones.push(new Tone.Synth().toDestination());
      activeTones[activeNotes.length - 1].triggerAttack(note + "4");
    }
    displayNote();
  }
  let releaseNote = function(note){
    const thisNoteIndex = activeNotes.indexOf(note);
    if (thisNoteIndex !== -1){
      activeTones[thisNoteIndex].triggerRelease(now);

      activeNotes.splice(thisNoteIndex, 1);
      activeTones.splice(thisNoteIndex, 1);
    }
    displayNote();
  }
  let displayNote = function(){
    document.getElementById("note-displayer").innerText = activeNotes;
  }

  return (
    <div className="App" >
      <KbPage keyPress={attackNote} keyRelease={releaseNote}/>
      <p id='note-displayer'></p>
    </div>
  );
}

export default App;
