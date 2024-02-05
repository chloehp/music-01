
//plugins
import * as Tone from "tone";
//functions
import options from "./options";
import tr from "./tracks";
import instrumentSwitch from "./instrument-switch";
import trackFill from "./track-fill";
//import { Time } from "tone";
    
// func vars
const activeNotes = [];
let track = tr.tracks[options.trackSelection];
const now = Tone.now();

let recordStartTime = new Date();
let pausePoint = 0;

let b32 = (options.noteLength / 32);                          // demisemiquaver
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
  attackNote : function(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {if (activeNotes[i].n === playNote) {return}}  // check if note is already being played, return if true
    const startTime = ((new Date()) - recordStartTime);           // start time
    activeNotes.push({n : playNote, t : startTime, p : activeNotes.length});                  // push to array
    instrument.triggerAttack(playNote, now + hL);                                 // attack note
    document.getElementById("kk-" + playNote).style.filter = "contrast(0.3)";     // visual press key
    //console.log("attack note");
    displayNote();
  },
  //
  releaseNote : function(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {
      if (activeNotes[i].n === playNote) {
        instrument.triggerRelease(playNote, now + hL);                      // release note 
        if (record) {                                                   // if recording
          const nowTime = (new Date()) - recordStartTime;
          if ((nowTime / b32) > options.trackLength) {note.recordGo(); return}            // if reached track length, stop recording
          const identifier = track.length + "-id-" + Math.floor(Math.random() * 1000);  // make new id
          //const identifier = Math.random();
          const startTime = activeNotes[i].t / b32;
          const noteLength = (nowTime - activeNotes[i].t) / b32;                                                                     // note length is difference between now and when note was pressed, divided by 1/64th note
          const newPoint = {id : identifier, n : playNote, start : startTime, len : noteLength, ins : options.instrumentSelect, eff : effect, on : false, pos : activeNotes[i].p};  // create object to be recorded
          track.push(newPoint);       // push object to array
        }
        activeNotes.splice(i, 1);                                           // remove from array
        document.getElementById("kk-" + playNote).style.filter = "contrast(1)"; // visual press key
        displayNote(); 
      }
    }
  },
  
  //
  recordGo : function() {
    console.log("recordGo");
    if (play === true) {return}
    if (record) {
      console.log(tr.tracks[options.trackSelection]);
      record = false;
      trackFill(options.trackSelection);
      document.getElementById("red-spot").classList.remove("r-s-on");
      console.log("recording stopped");
    }
    else {
      track = tr.tracks[options.trackSelection];
      options.trackhead = 0;  
      recordStartTime = new Date(); 
      record = true;
      document.getElementById("red-spot").classList.add("r-s-on");
      console.log("recording started");
    }
  },
  //
  playGo : function() {
    if (play) {play = false} 
    else {
      recordStartTime = new Date() - pausePoint;
      console.log("pausePoint" + pausePoint);
      play = true;
    }

    const thisInt = setInterval(function(){
      if (play) {
        for (let i = 0; i < tr.tracks.length; i++) {
          note.playTrack(tr.tracks[i]);
        }
      }
      else {
        clearInterval(thisInt);
        console.log("pause");
        return
      }
    }, b32);   
  },
  //
  trackReset : function() {
    recordStartTime = new Date();
    pausePoint = 0;
  },
  //  
  playTrack : function(track) {
    const timeNow = (((new Date()) - recordStartTime) / b32);
    pausePoint = timeNow * b32;
    if (timeNow > options.trackLength) {note.trackReset(); return}            // if reached track length, stop recording
    //console.log(timeNow);
    const trackLen = track.length;
    for (let y = 0; y < trackLen; y++) {
      if ((timeNow > track[y].start) && (timeNow < track[y].start + track[y].len)) {
        if (track[y].on === false) {
          track[y].on = true;
          const useInstr = instrumentSwitch(track[y].ins);                            // get instrument
          const noteLen = (track[y].len * b32);                                         // multiplied by 1/32nd note
          useInstr.triggerAttack(track[y].n, now + 0.3);                                    // attack note
          // eslint-disable-next-line
          setTimeout(function(){
            useInstr.triggerRelease(track[y].n, now + 0.3)
            track[y].on = false;
          }, noteLen)   // release note   
        }
      }
    }
  }

}

//console.log(note);

export default note;