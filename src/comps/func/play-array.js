
import * as Tone from "tone";

const instrument = new Tone.Synth().toDestination();
const playArray = {
    C1: {n: "C1", p: 0, i: instrument},
};