
import * as Tone from "tone";

//const instrumentSwitch = function(id){
//    switch(id){
//        case 0: return new Tone.PolySynth(Tone.Synth).toDestination();
//        case 1: return new Tone.PolySynth(Tone.DuoSynth).toDestination();
//        case 2: return new Tone.PolySynth(Tone.FMSynth).toDestination();
//        //case 3: return new Tone.MembraneSynth.toDestination();
//        //case 4: return new Tone.PolySynth(Tone.MetalSynth).toDestination();
//        case 5: return new Tone.PolySynth(Tone.MonoSynth).toDestination();
//        //case 6: return new Tone.PolySynth(Tone.NoiseSynth).toDestination();
//        //case 7: return new Tone.PolySynth(Tone.PluckSynth).toDestination();
//        case 8: return new Tone.PolySynth(Tone.AMSynth).toDestination();
//        case 9: return new Tone.Sampler({
//            urls: {
//              "C4": "C4.mp3",
//              "D#4": "Ds4.mp3",
//              "F#4": "Fs4.mp3",
//              "A4": "A4.mp3",
//            },
//            release: 1,
//            baseUrl: "https://tonejs.github.io/audio/salamander/",
//          }).toDestination();    
//        default: return new Tone.PolySynth(Tone.Synth).toDestination();
//    }
//}

const instrumentSwitch = [
  {t : "Synth", x : new Tone.PolySynth(Tone.Synth).toDestination()},                    // 0
  {t : "DuoSynth", x : new Tone.PolySynth(Tone.DuoSynth).toDestination()},              // 1
  {t : "FMSynth", x : new Tone.PolySynth(Tone.FMSynth).toDestination()},                // 2
  {t : "MonoSynth", x : new Tone.PolySynth(Tone.MonoSynth).toDestination()},            // 3
  {t : "AMSynth", x : new Tone.PolySynth(Tone.AMSynth).toDestination()},                // 4
  {t : "Piano", x : new Tone.Sampler({                                                  // 5
    urls: {  "C4": "C4.mp3",  "D#4": "Ds4.mp3",  "F#4": "Fs4.mp3",  "A4": "A4.mp3",},
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination()},
]
export default instrumentSwitch;