
import * as Tone from "tone";

const instrumentSwitch = function(id){
    switch(id){
        default: return new Tone.Synth().toDestination();
    }
}
export default instrumentSwitch;