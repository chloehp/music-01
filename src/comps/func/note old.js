
//plugins
//import * as Tone from "tone";
//functions
import options from "./options";
import tr from "./tracks";
import instrumentSwitch from "./instrument-switch";
    
// func vars
const activeNotes = [];
const recNotesToDestroy = [];
//const now = Tone.now();

let tempo = options.noteLength;
//let trackhead = options.trackhead;
let track = tr.tracks(options.trackSelection);

let record = false;
let play = false;

let instrument = instrumentSwitch(options.instrumentSelect);                            // instrument choice

// display active notes (the array) // fix to be more efficient
function displayNote(){document.getElementById("note-displayer").innerText = activeNotes}

const note = {
  //
  attackNote : function(note, hL = options.hitLatency){ 
    if (activeNotes.indexOf(note) === -1){
      //console.log("attack note");
      activeNotes.push(note);                                                 // push to array
      instrument.triggerAttack(note, hL);                     //
      document.getElementById("kk-" + note).style.filter = "contrast(0.3)";   // visual press key
      displayNote();
    }
  },
  //
  releaseNote : function(note, hL = options.hitLatency){ 
    //console.log("release note");
    const thisNoteIndex = activeNotes.indexOf(note);
    if (thisNoteIndex !== -1){
      try {     
        instrument.triggerRelease(note, hL);                // release note 
        activeNotes.splice(thisNoteIndex, 1);                               // remove from array
        document.getElementById("kk-" + note).style.filter = "contrast(1)"; // visual press key
        activeNotes.push(note + "*");                                       // push note closer
        displayNote();    
        setTimeout(function(){
            activeNotes.splice(activeNotes.indexOf(note + "*"), 1)          // remove note closer
            displayNote();
        }, tempo);    
      }
      catch {
        console.warn("note overload, stop all");        // when lots of notes are played at once, can trip over itself, // now fixed 
        note.clearAllNotes();
        //instrument.triggerRelease(note, options.hitLatency);  
      }
    }
  },
  clearAllNotes : function() {
    for (let i = 0; i < activeNotes.length; i++) {
      note.releaseNote(activeNotes[i])
    }
  },
  
  //
  startStopRecording : function(){
    console.log("startStopRecording");
    record = !record;
    if (record) {note.recordFun()}
  },
  recordFun : function(){  
    //console.log("record");
    if (record === true) {
      const an = [];
      for (let i = 0; i < activeNotes.length; i++) {an.push(activeNotes[i])}
      setTimeout(function(){
        const newPoint = {n : an, i : options.instrumentSelect};
        track.splice(options.trackhead, 0, newPoint);       // add newpoint at trackhead in recording track
        options.trackhead++;                                // move trackhead forward
        note.recordFun();
      }, tempo);    
    }
    else { // 
        console.log("Recording has ended. Processing...");
        const trackLength = track.length;
        for (let x = 0; x < trackLength; x++) {
          const noteArray = track[x].n;
          //console.log(noteArray);
          if (noteArray) {
            for (let y = 0; y < noteArray.length; y++) {
              //console.log(x + ": " + noteArray[y]);
              for (let z = 0; z < recNotesToDestroy.length; z++) {
                if (noteArray[y] === recNotesToDestroy[z] + "*") {          // if release note ("*") reached
                  recNotesToDestroy.splice(z, 1);                           // remove note from destroyer array
                }
                if (noteArray[y] === recNotesToDestroy[z]) {                // if note is in destroyer array
                  track[x].n.splice(y, 1);                                  // destroy from recording
                }
              }
              if ((noteArray[y])&&(noteArray[y].endsWith("*")) === false){  // if array note does not end with "*" (bugs out without "(noteArray[y])")
                recNotesToDestroy.push(noteArray[y])                        // add note to array of notes to be destroyed (without destroying self)
              } 
            }
            //console.log(recNotesToDestroy.length);
          }
        }    
        console.log("Track recorded.");
        console.log(track);
    }
  },
  
  playRecord : function(){
    play = !play;
    options.trackhead = 0;
    const pTracks = tr.tracks.slice();
    const thisInt = setInterval(function(){
      //console.log(tempo)
      if (play) {note.playItFun(pTracks)}
      else {clearInterval(thisInt)}
    }, tempo);   
    //console.log(tr.tracks);
  },
  playItFun : function(pTracks) {
    if (pTracks.length < 1) {return}
    //console.log(pTracks[0]);
    options.trackhead++;
    console.log("play it " + options.trackhead);
    for (let x = 0; x < pTracks.length; x++) {
      //console.log(pTracks[x]);
      const cNote = pTracks[x][options.trackhead];
      if (cNote){
        //console.log("cNote: " + cNote);
        //const activeI = instrumentSwitch(cNote.i);
        const activeNLen = cNote.n.length;
          for (let y = 0; y < activeNLen; y++) {
            let pNote = cNote.n[y];
            //console.log(pNote);
            if (pNote.endsWith("*")){                     // release note
              const rlNN = pNote.slice(0, -1);            // take off "*"
              //note.releaseNote(rlNN, 0.3);              // note.releaseNote option
              instrument.triggerRelease(rlNN, 0.3);       // direct note.js option
              console.log("end " + rlNN);
            }
            else {                                        // attack note
              //note.attackNote(pNote, 0.3);              // note.releaseNote option
              instrument.triggerAttack(pNote, 0.3);       // direct note.js option
              console.log("start " + pNote);
            }
          }
      }
      else {
        pTracks.splice(x, 1);
        console.log("rmvd" + pTracks);
        if (pTracks.length < 1) {
          console.log("end play at trackhead " + options.trackhead);
          play = false;
          instrument.triggerRelease();
          //note.clearAllNotes();
          return
        }
      }
    }
  }
}

export default note;