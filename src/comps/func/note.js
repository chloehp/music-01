
//plugins
import * as Tone from "tone";
//functions
import options from "./options";
import tra from "./tracks";
import instrumentSwitch from "./instrument-switch";

  //track options
let tempo = 30;
let track = tra.ck00;
let trackhead = 0;

let insSelect = 0;
    
  //func
const activeNotes = [];
const activeTones = [];
const now = Tone.now();

//
//noteDisplayer : useRef(),
const displayNote = function(){        
    //if (note.noteDisplayer.current){note.noteDisplayer.current.innerText = activeNotes}
    document.getElementById("note-displayer").innerText = activeNotes;
}

const note = {
  //
  attackNote : function(note){ 
    if (activeNotes.indexOf(note) === -1){
      let instrument = instrumentSwitch(insSelect);                            //instrument choice
      activeNotes.push(note);                                                  // push to array
      activeTones.push(instrument);                                            // push to array
      activeTones[activeTones.length - 1].triggerAttack(note, ('+' + options.hitLatency));  //make sound    
      document.getElementById("kk-" + note).style.filter = "contrast(0.3)";         //visual press key
      displayNote();
    }
  },
  //
  releaseNote : function(note){ 
    const thisNoteIndex = activeNotes.indexOf(note);
    if (thisNoteIndex !== -1){
      try {
        activeTones[thisNoteIndex].triggerRelease(now);                   // release note   
        activeNotes.splice(thisNoteIndex, 1);                                  // remove from array
        activeTones.splice(thisNoteIndex, 1);                                  // remove from array
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
  },
  
  //
  recBool : false,
  recordOnOff : function(){
    console.log("recordonoff");
    note.recBool = !note.recBool;
    if (note.recBool === true) {note.record()}    
  },
  record : function(){  
    console.log("record");
    if (note.recBool === true) {
      const an = [];
      for (let i = 0; i < activeNotes.length; i++) {an.push(activeNotes[i])}
      setTimeout(function(){
        const newPoint = {n : an, i : insSelect};
        track.splice(trackhead, 0, newPoint); // add newpoint at trackhead in recording track
        trackhead++;                          // move trackhead forward
        note.record();
      }, tempo);    
    }
    else {
        console.log(track);
    }
  },
}

export default note;