
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

let quaVar = (options.beatLength / options.beatFraction);     // demisemiquaver
let instrument = instrumentSwitch(options.instrumentSelect);  // instrument choice
let effect = null;                                            // effect choice
let pausePoint = 0;

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
        instrument.triggerRelease(playNote, now + hL);                            // release note 
        if (options.record === true) {                                            // if recording
          const nowTime = (new Date()) - recordStartTime;
          const identifier = track.length + "-id-" + Math.floor(Math.random() * 1000);  // make new id
          const startTime = (activeNotes[i].t / quaVar) + pausePoint;
          const noteLength = (nowTime - activeNotes[i].t) / quaVar;               // note length is difference between now and when note was pressed, divided by 1/64th note
          const newPoint = {id : identifier, n : playNote, start : startTime, len : noteLength, ins : options.instrumentSelect, eff : effect, on : false, pos : activeNotes[i].p};  // create object to be recorded
          track.push(newPoint);       // push object to array
          if ((nowTime / quaVar) > options.trackLength) {note.recordGo()}         // if reached track length, stop recording
        }
        activeNotes.splice(i, 1);                                                 // remove from array
        document.getElementById("kk-" + playNote).style.filter = "contrast(1)"    // visual press key
        displayNote(); 
      }
    }
  },
  
  //
  recordGo : function() {
    if (options.play === true) {console.log("cannot record while playing track"); return}    
    if (options.record === true) {options.record = false; return} 
    else {
      options.record = true;
      track = tr.tracks[options.trackSelection];                    // set selected track as track to record to
      recordStartTime = new Date();                                 // record starts from now
      document.getElementById("red-spot").classList.add("r-s-on");  // change red spot 
      console.log("record go");
    }    
    const recordInterval = setInterval(function(){                                    //set interval
      if ((options.trackhead > options.trackLength) || (options.record === false)) {  // if record reaches end of track or recording is turned off
        clearInterval(recordInterval);                                                // stop interval
        note.trackSet()                                                               // reset track
        document.getElementById("red-spot").classList.remove("r-s-on");               // change red spot
        trackFill(options.trackSelection);                                            // save recording
        console.log("record stop");
        return
      }
      else {
        const timeNow = (((new Date()) - recordStartTime) / quaVar) + pausePoint;     // get time now compared to when the recording started
        options.trackhead = timeNow;                                                  // move trackhead
      }
    }, 75); 
  },

  //
  playGo : function() {
    if (options.play === true) {options.play = false; return} 
    else {
      options.play = true;
      recordStartTime = new Date();
    }

    const playInterval = setInterval(function(){
      if (options.play === false) {                     // paused
        clearInterval(playInterval);                    // stop interval
        pausePoint = options.trackhead;                 // set point at which track is paused
        console.log("paused at " + options.trackhead);
        return
      }
      else {
        for (let i = 0; i < tr.tracks.length; i++) {note.playTrack(tr.tracks[i])}   // play all tracks
      }
    }, quaVar);   
  },
  //
  trackSet : function(x = 0) {  // set track to 
    recordStartTime = new Date();
    options.trackhead = x;
    pausePoint = x;
  },
  //  
  playTrack : function(track) {
    const timeNow = (((new Date()) - recordStartTime) / quaVar) + pausePoint;
    if (timeNow > options.trackLength) {note.trackSet(); return}  // if reached track length, reset
    options.trackhead = timeNow;                                  // set trackhead
    //console.log(timeNow);
    const trackLen = track.length;
    for (let y = 0; y < trackLen; y++) {
      if (
        (timeNow > track[y].start) && (timeNow < track[y].start + track[y].len) // if timenow is between the start and end of a note
        &&  (track[y].on === false)                           // if note is not already being played
      ) {               
        track[y].on = true;                                   // note is being played
        const useInstr = instrumentSwitch(track[y].ins);      // get instrument
        const noteLen = (track[y].len * quaVar);              // multiplied by 1/32nd note
        useInstr.triggerAttack(track[y].n, now + 0.3);        // attack note
        // eslint-disable-next-line
        setTimeout(function(){
          useInstr.triggerRelease(track[y].n, now + 0.3)      // after notelength, release note
          track[y].on = false;                                // note is no longer being played
        }, noteLen);
      }
    }
  }

}

//console.log(note);

export default note;