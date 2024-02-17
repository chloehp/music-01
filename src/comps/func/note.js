
//plugins
import * as Tone from "tone";
//functions
import options from "./options";
import tr from "./tracks";
import instrumentSwitch from "./instrument-switch";
import trackFill from "./track-fill";
import animation from "./animation";
//import { Time } from "tone";
    
// func vars
const everyNote = ["Ab", "A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#"];
const activeNotes = [];
let track = tr.tracks[options.trackSelection];
const now = Tone.now();
let recordStartTime = new Date();

let quaVar = options.beat64Len;                              // hemidemisemiquaver
let instrument = instrumentSwitch[options.instruSelect].x;   // instrument choice
let playInsts = [];                                          // instruments used in playback
let effect = null;                                           // effect choice
let pausePoint = 0;

// display active notes (the array) // fix to be more efficient
function displayNote(){
  let notesBeingPlayed = "";
  for (let i = 0; i < activeNotes.length; i++) {notesBeingPlayed += activeNotes[i].n + " "}
  document.getElementById("note-displayer").innerHTML = notesBeingPlayed;
}

const note = {
  //
  validate : function(n) {
    if (
       ((n.length === 3) || (n.length === 2)) 
    && (everyNote.includes(n.slice(0, -1)) === true)
    && (isNaN(n.charAt(n.length - 1)) === false)
    ) {
      const ins = instrumentSwitch[0].x;
      try {
        ins.triggerAttack(n, now + 0.15);
        setTimeout(function(){
          ins.triggerRelease(n, now + 0.15)   
        }, 300);
        return true
      }
      catch {console.error("Uh oh. How did you get this? Please write in and let me know."); return false}      
    }
    else {
      return false
    }
  },
  //
  attackNote : function(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {if (activeNotes[i].n === playNote) {return}}  // check if note is already being played, return if true
    const startTime = ((new Date()) - recordStartTime);                                         // start time
    activeNotes.push({n : playNote, t : startTime, p : activeNotes.length});                    // push to array
    instrument.triggerAttack(playNote, now + hL);                                               // attack note
    document.getElementById("kk-" + playNote).style.filter = "contrast(0.3)";                   // visual press key
    //console.log("attack note");
    displayNote();
  },
  //
  releaseNote : function(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {
      if (activeNotes[i].n === playNote) {
        instrument.triggerRelease(playNote, now + hL);                                  // release note 
        if (options.record === true) {                                                  // if recording
          const nowTime = (new Date()) - recordStartTime;                               //
          const identifier = track.length + "-id-" + Math.floor(Math.random() * 1000);  // make new id
          const startTime = (activeNotes[i].t / quaVar) + pausePoint;                   //
          const noteLength = (nowTime - activeNotes[i].t) / quaVar;                     // note length is difference between now and when note was pressed, divided by 1/64th note
          const newPoint = {id : identifier, n : playNote, start : startTime, len : noteLength, ins : options.instruSelect, eff : effect, on : false, pos : activeNotes[i].p};  // create object to be recorded
          track.push(newPoint);                                                         // push object to array     
          if ((nowTime / quaVar) > options.trackLength) {note.recordGo()}               // if reached track length, stop recording
        }
        activeNotes.splice(i, 1);                                                       // remove from array
        document.getElementById("kk-" + playNote).style.filter = "contrast(1)"          // visual press key
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
      animation.beatCountInit();                                    // turn on beat counter
      document.getElementById("red-spot").classList.add("r-s-on");  // change red spot 
      console.log("record go");
    }    
    const recordInterval = setInterval(function(){                                    //set interval
      if ((options.trackhead > options.trackLength) || (options.record === false)) {  // if record reaches end of track or recording is turned off
        clearInterval(recordInterval);                                                // stop interval
        note.trackSet()                                                               // reset track
        document.getElementById("red-spot").classList.remove("r-s-on");               // change red spot
        trackFill();                                                                  // save recording
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
    const pauseSpot = document.getElementById("pause-spot");
    const playSpot = document.getElementById("play-spot");
    if (options.play === true) {
      playInsts = [];
      options.play = false; 
      pauseSpot.style.opacity = 0;
      playSpot.style.opacity = 1;
      return
    } 
    else {
      options.play = true;
      recordStartTime = (new Date() - 60) + 180;
      for (let i = 0; i < tr.tracks.length; i++) {
        if (tr.tracks[i][0]) {
          const instruFromTrck = tr.tracks[i][0].ins;               // get instrument used to play this track
          playInsts.push(instrumentSwitch[instruFromTrck].x);       // push to array 
        }
      }
      animation.beatCountInit();                                    // turn on beat counter
      pauseSpot.style.opacity = 1;                                  // show pause symbol
      playSpot.style.opacity = 0;                                   // hide play symbol
      console.log(playInsts);
    }

    setTimeout(function(){
      const playInterval = setInterval(function(){
        if (options.play === false) {                     // paused
          clearInterval(playInterval);                    // stop interval
          pausePoint = options.trackhead;                 // set point at which track is paused
          console.log("paused at " + options.trackhead);
          return
        }
        else {
          for (let i = 0; i < tr.tracks.length; i++) {note.playTrack(tr.tracks[i], i)}   // play all tracks
        }
      }, quaVar);   
    }, 60);
  },
  //  
  playTrack : function(track, ti) {
    const timeNow = (((new Date()) - recordStartTime) / quaVar) + pausePoint;
    if (timeNow > options.trackLength) {note.trackSet(); return}  // if reached track length, reset
    options.trackhead = timeNow;                                  // set trackhead
    //console.log(timeNow);
    const trackLen = track.length;
    for (let y = 0; y < trackLen; y++) {
      if (
        (timeNow > track[y].start) && (timeNow < track[y].start + track[y].len) // if timenow is between the start and end of a note
        &&  (track[y].on === false)                                             // if note is not already being played
      ) {               
        track[y].on = true;                                 // note is being played
        const useInstr = playInsts[ti];                     // get instrument
        const noteLen = (track[y].len * quaVar);            // multiplied by 1/32nd note
        useInstr.triggerAttack(track[y].n, now + 0.15);     // attack note
        // eslint-disable-next-line
        setTimeout(function(){
          useInstr.triggerRelease(track[y].n, now + 0.15)   // after notelength, release note
          track[y].on = false;                              // note is no longer being played
        }, noteLen);
      }
    }
  },
  //
  trackSet : function(x = 0) {  // set track to 
    recordStartTime = new Date();
    options.trackhead = x;
    pausePoint = x;
  },

}

export default note;