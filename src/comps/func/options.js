const options = {    
  //user options
  language : "en",      // available languages: not in use yet
  octave : 3,           // octave for live instrument
  hitLatency : 0.015,   // control for performance
  beatRounding : true,  // round note start and length to fractions of a beat (beatFraction)
  scalesChoice : "",    //
  recordAdd : false,    // bool for adding notes to tracker, not set up to work yet
  
  //track options
  beatLength : 240,     // beat length in milliseconds
  beatFraction : 16,    // 1 row = 1/X fraction of beat, 1/(X*4) fraction of note
  trackSelection : 0,   // select active track for editing or recording on
  trackhead : 0,        // where you are in the track, measured in fractions of a beat (beatFraction)
  instrumentSelect : 9, // live instrument selection from instrument-switch.js
  trackLength : 200,    // track length in beats
  timeSigTop    : 4,    // top of time signature
  timeSigBottom : 4,    // bottom of time signature

  record : false,       // is track currently recording
  play : false,         // is track currently playing
}
export default options;