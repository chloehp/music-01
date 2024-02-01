
//plugins
import * as Tone from "tone";
//functions
import options from "./options";
import tr from "./tracks";
import instrumentSwitch from "./instrument-switch";
//import { Time } from "tone";
    
// func vars
const activeNotes = [];
const track = tr.tracks[options.trackSelection];
const now = Tone.now();

let b64 = (options.noteLength / 64);                          // hemidemisemiquaver
let instrument = instrumentSwitch(options.instrumentSelect);  // instrument choice
let effect = null;                                            // effect choice

let record = false;
let play = false;

// display active notes (the array) // fix to be more efficient
function displayNote(){
  let notesBeingPlayed = "";
  for (let i = 0; i < activeNotes.length; i++) {notesBeingPlayed += activeNotes[i].n + " "}
  document.getElementById("note-displayer").innerHTML = notesBeingPlayed;
}

const note = {
  //
  attackNote : function(note, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {if (activeNotes[i].n === note) {return}}

    activeNotes.push({n : note, t : new Date(), pos : options.trackhead});  // push to array
    instrument.triggerAttack(note, now + hL);                                     // attack note
    document.getElementById("kk-" + note).style.filter = "contrast(0.3)";   // visual press key
    //console.log("attack note");
    displayNote();
  },
  //
  releaseNote : function(note, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {
      if (activeNotes[i].n === note) {
        const noteLength = ((new Date()) - activeNotes[i].t) / b64; // note length is difference between now and when note was pressed, divided by 1/64th note
        //console.log("release note after " + time);
        try {     
          instrument.triggerRelease(note, now + hL);                      // release note 
          if (record) {
            const thing = {n : note, l : noteLength, i : options.instrumentSelect, e : effect};
            track.splice(activeNotes[i].pos, 1, thing)
          }
          activeNotes.splice(i, 1);                               // remove from array
          document.getElementById("kk-" + note).style.filter = "contrast(1)"; // visual press key
          displayNote();     

        }
        catch {
          console.warn("note overload, stop all");        // when lots of notes are played at once, can trip over itself, // now fixed 
          note.clearAllNotes();
        }
        return
      }
    }
  },
  //
  clearAllNotes : function() {
    for (let i = 0; i < activeNotes.length; i++) {
      note.releaseNote(activeNotes[i])
    }
  },
  
  //
  recordGo : function() {
    console.log("recordGo");
    record = !record;
    options.trackhead = 0;

    const thisInt = setInterval(function(){
      if (record) {
        if ((options.recordAdd) && (options.trackhead === track.length)) {
          console.log("push");
          track.push({n : 0})
        }
        options.trackhead++;
      }
      else {
        clearInterval(thisInt);
        console.log("Finished recording")
        console.log(tr.tracks[options.trackSelection]);
        return
      }
    }, b64);   
  },
  //
  playGo : function() {
    //console.log("recordGo");
    play = !play;
    options.trackhead = 0;

    const thisInt = setInterval(function(){
      if ((play) && (track[options.trackhead])) {
        //console.log("play");
        note.playNoteAtPoint(options.trackhead);
        options.trackhead++;
      }
      else {
        clearInterval(thisInt);
        console.log("pause");
        return
      }
    }, b64);   
  },
  //  
  playNoteAtPoint : function(x) {
    const pN = track[x].n
    if (pN !== 0) {
      const useInstr = instrumentSwitch(track[x].i);
      const noteLen = track[x].l * b64;
      //console.log("play" + pN + "for " + noteLen);
      useInstr.triggerAttack(pN, now + 0.3);
      setTimeout(function(){useInstr.triggerRelease(pN, now + 0.3)}, noteLen)      
    }
  }
}

export default note;