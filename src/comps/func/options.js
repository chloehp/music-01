
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
                        // 
  trackSelection : 0,   // select active track for editing or recording on
  trackhead : 0,        // where you are in the track, measured in fractions of a beat // what fraction is this
  instruSelect : 0,     // live instrument selection from instrument-switch.js
  beatFraction : 16,    // beatFLen is this fraction of a whole beat ( 1/x )
  beatFLen : 31.25,        // beat fraction length in milliseconds
  trackLength : 240,    // track length in beats
  timeSigTop    : 4,    // top of time signature
  timeSigBottom : 4,    // bottom of time signature
  measureSelect : 0,    // select type of time measure (small player)

  record : false,       // is track currently recording
  play : false,         // is track currently playing

  // funcs
  //
  changeVisNotes : function() {
    const keyNotes = document.querySelectorAll(".key-note");
    const knLen = keyNotes.length;
    if (options.visibleNotes === true) {
      options.visibleNotes = false;                                           // set visibleNotes option false
      for (let i = 0; i < knLen; i++) {keyNotes[i].style.display = "none"}    // for each key note, display: none
      //document.getElementById("sm-notes").style.filter = "brightness(0.75)";  // sm-notes button lower brightness
      console.log("Visible Notes: OFF");
    }
    else {
      options.visibleNotes = true;                                            // set visibleNotes option true
      for (let i = 0; i < knLen; i++) {keyNotes[i].style.display = "block"}   // for each key note, display: block
      //document.getElementById("sm-notes").style.filter = "brightness(1)";     // sm-notes button full brightness
      console.log("Visible Notes: ON");
    }
    return options.visibleNotes;
  },
  //
  changeMusicalQwerty : function() {
    if (options.musicalQwerty === true) {
      options.musicalQwerty = false;                                          // set musicalQwerty option false
      //document.getElementById("sm-qwerty").style.filter = "brightness(0.75)"; // sm-qwerty button lower brightness
      console.log("Musical QWERTY: OFF");                            
    }
    else {
      options.musicalQwerty = true;                                           // set musicalQwerty option true
      //document.getElementById("sm-qwerty").style.filter = "brightness(1)";    // sm-qwerty button full brightness
      console.log("Musical QWERTY: ON");                             
    }
    return options.musicalQwerty;
  },
  //
  changeBeatRounding : function() {
    if (options.beatRounding === true) {
      options.beatRounding = false;                                             // set beatRounding option true
      //document.getElementById("sm-rounding").style.filter = "brightness(0.75)"; // sm-rounding button lower brightness
    }
    else {
      options.beatRounding = true;                                              // set beatRounding option true
      //document.getElementById("sm-rounding").style.filter = "brightness(1)";    // sm-rounding button full brightness
    }
    console.log(options.beatRounding)
    return options.beatRounding;
  },
  //
  getBPM : function() { return 60 / ((options.beatFLen * options.beatFraction) / 1000) }, // calc BPM from beatLength
  getNewBeatFLenFromNewBPM : function(newBPM) { return ((60 / newBPM) * 1000) / options.beatFraction }, // change beatLength based on new BPM
  getNewBeatFractionFromNewBeatFLen : function(newBeatFLen) { return ((60 / options.getBPM()) * 1000) / newBeatFLen }, // double check this works correctly before using
}
export default options;