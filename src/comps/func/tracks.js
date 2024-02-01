
import options from "./options";
const tr = {
    tracks : [[]],

    newTrack : function(){
        const a = [];
        tr.tracks.push(a);
        options.trackSelection = tr.tracks.length;
        console.log(tr.tracks);
    },
}
export default tr;