
import options from "./options";
const tr = {
    //array for track storage
    tracks : [[]],

    //
    newTrack : function(){
        const a = [];
        tr.tracks.push(a);
        options.trackSelection = tr.tracks.length - 1;
        console.log(tr.tracks);
    },
    //
    evalTrackForDisplay : function(thisTrack){
        let han = 0;    // highest active notes
        let len = 0;
        const insts = [];
        for (let i = 0; i < thisTrack.length; i++) {
            if (thisTrack[i].pos > han) {han = thisTrack[i].pos} // find max active notes in track for width
            if (insts.includes(thisTrack[i].ins) !== false) {insts.push(thisTrack[i].ins)} // if instrument not yet included in 'insts' array, push
            const timeOfLastNote = thisTrack[i].start + thisTrack[i].len;
            if (timeOfLastNote > len) {len = timeOfLastNote}
        }
        return {highActiveNotes : han + 1, trackLen : len, trackInsts : insts}
    }
}
export default tr;