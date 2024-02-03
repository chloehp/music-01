
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

let b32 = (options.noteLength / 32);                          // hemidemisemiquaver
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
    for (let i = 0; i < activeNotes.length; i++) {if (activeNotes[i].n === note) {return}}  // check if note is already being played, return if true
    startTime = ((new Date()) - recordStartTime);           // start time
    activeNotes.push({n : note, t : startTime});                  // push to array
    instrument.triggerAttack(note, now + hL);                                 // attack note
    document.getElementById("kk-" + note).style.filter = "contrast(0.3)";     // visual press key
    //console.log("attack note");
    displayNote();
  },
  //
  releaseNote : function(note, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {
      if (activeNotes[i].n === note) {
        try {     
          instrument.triggerRelease(note, now + hL);                      // release note 
          if (record) {                                                   // if recording
            const position = track.length;
            const identifier = position + "-id-" + Math.floor(Math.random() * 1000);
            const startTime = activeNotes[i].t / b32;
            const noteLength = ((new Date()) - activeNotes[i].t) / b32;                                                                     // note length is difference between now and when note was pressed, divided by 1/64th note
            const newPoint = {id : identifier, note : note, start : startTime, len : noteLength, ins : options.instrumentSelect, eff : effect};  // create object to be recorded
            for (let i = 0; i < activeNotes.length - 1; i++) {track[position].push([])}                                 // pushes blanks to be at different locations
            track[position].push(newPoint);                                                                   // push object to array
          }
          activeNotes.splice(i, 1);                                           // remove from array
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
    const dateStartRec = new Date();

    const thisInt = setInterval(function(){
      if (record) {
        const timeSinceStart = (new Date()) - dateStartRec;
        options.trackhead = Math.round(timeSinceStart / b32);
        console.log(options.trackhead);
        if ((options.recordAdd) && (options.trackhead === track.length)) {track.push([]); track.push([]); track.push([])}
        //options.trackhead++;
      }
      else {
        clearInterval(thisInt);
        console.log("Finished recording")
        console.log(tr.tracks[options.trackSelection]);
        return
      }
    }, b32);   
  },
  //
  playGo : function() {
    //console.log("recordGo");
    play = !play;

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
    }, b32);   
  },
  //  
  playNoteAtPoint : function(x) {
    const trx = track[x];
    for (let y = 0; y < trx.length; y++) {
      const pN = trx[y].n;
      if (pN !== 0) {
        const useInstr = instrumentSwitch(trx[y].ins);                            // get instrument
        const noteLen = trx[y].l * b32;                                           // multiplied by 1/64th note
        //console.log("play" + pN + "for " + noteLen);
        useInstr.triggerAttack(pN, now + 0.3);                                    // attack note
        setTimeout(function(){useInstr.triggerRelease(pN, now + 0.3)}, noteLen)   // release note   
      }
    }
  }
}

export default note;