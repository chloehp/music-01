import animation from "./animation";

const options = {    
  // user options
  language : "en",      // available languages: not in use yet
  octave : 3,           // octave for live instrument
  hitLatency : 0.015,   // control for performance
  beatRounding : true,  // round note start and length to fractions of a beat
  scalesChoice : "",    //
  recordAdd : false,    // bool for adding notes to tracker, not set up to work yet
  musicalQwerty : true, // does pressing notes on a physical keyboard make notes - bool
  visibleNotes : true,  //
  
  // track options       
  beat64Len : 30,       // beat length in milliseconds
                        // 
  trackSelection : 0,   // select active track for editing or recording on
  trackhead : 0,        // where you are in the track, measured in fractions of a beat
  instruSelect : 0,     // live instrument selection from instrument-switch.js
  trackLength : 200,    // track length in beats
  timeSigTop    : 4,    // top of time signature
  timeSigBottom : 4,    // bottom of time signature

  record : false,       // is track currently recording
  play : false,         // is track currently playing

  // funcs
  //
  changeVisNotes : function() {
    const keyNotes = document.querySelectorAll(".key-note");
    const knLen = keyNotes.length;
    if (options.visibleNotes === true) {
      options.visibleNotes = false;
      for (let i = 0; i < knLen; i++) {keyNotes[i].style.display = "none"}
      document.getElementById("sm-notes").style.filter = "brightness(0.75)";
      animation.consoleLog("Visible Notes: OFF");
    }
    else {
      options.visibleNotes = true;
      for (let i = 0; i < knLen; i++) {keyNotes[i].style.display = "block"}
      document.getElementById("sm-notes").style.filter = "brightness(1)";
      animation.consoleLog("Visible Notes: ON");
    }
  },
  //
  changeMusicalQwerty : function() {
    if (options.musicalQwerty === true) {
      options.musicalQwerty = false;
      document.getElementById("sm-qwerty").style.filter = "brightness(0.75)";
      animation.consoleLog("Musical QWERTY: OFF");
    }
    else {
      options.musicalQwerty = true;
      document.getElementById("sm-qwerty").style.filter = "brightness(1)";
      animation.consoleLog("Musical QWERTY: ON");
    }
  }
}
export default options;