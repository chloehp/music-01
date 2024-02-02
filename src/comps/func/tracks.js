
import options from "./options";
const tr = {
    //array for track storage
    tracks : [[]],

    //
    newTrack : function(){
        const a = [];
        tr.tracks.push(a);
        options.trackSelection = tr.tracks.length;
        console.log(tr.tracks);
    },
    //
    evalTrackForDisplay : function(thisTrack){
        let han = 0;    // highest active notes
        const len = thisTrack.length;
        const insts = [];
        for (let i = 0; i < len; i++) {
            if (thisTrack[i].length > han) {han = thisTrack[i].length} // find max active notes in track for width
            if ((thisTrack[i].ins) && (insts.includes(thisTrack[i].ins) !== false)) {insts.push(thisTrack[i].ins)} // if instrument not yet included in 'insts' array, push
        }
        return {highActiveNotes : han, trackLen : len, trackInsts : insts}
    }
}
export default tr;