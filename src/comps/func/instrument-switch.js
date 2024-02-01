
import * as Tone from "tone";

const instrumentSwitch = function(id){
    switch(id){
        case 0: return new Tone.PolySynth(Tone.Synth).toDestination();
        case 1: return new Tone.PolySynth(Tone.DuoSynth).toDestination();
        case 2: return new Tone.PolySynth(Tone.FMSynth).toDestination();
        //case 3: return new Tone.MembraneSynth.toDestination();
        //case 4: return new Tone.PolySynth(Tone.MetalSynth).toDestination();
        case 5: return new Tone.PolySynth(Tone.MonoSynth).toDestination();
        //case 6: return new Tone.PolySynth(Tone.NoiseSynth).toDestination();
        //case 7: return new Tone.PolySynth(Tone.PluckSynth).toDestination();
        case 8: return new Tone.PolySynth(Tone.AMSynth).toDestination();
        default: return new Tone.PolySynth(Tone.Synth).toDestination();
    }
}
export default instrumentSwitch;