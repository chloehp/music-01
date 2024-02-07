
import options from './options';
import tr from './tracks';
import dragElement from './dragdrop';

function trackFill(trackno = options.trackSelection, roundBeats = true) {
    //console.log("print track " + trackno);
    const trackEl = document.querySelectorAll(".track--track")[trackno];
    
    trackEl.innerHTML = null;
    
    const trackSel = options.trackSelection;
    if ((trackno === trackSel) && (tr.tracks[trackSel])){
        const trackArray = tr.tracks[trackSel];
        const trackDetails = tr.evalTrackForDisplay(trackArray);
        console.log(trackDetails);
        console.log(trackArray);
        const trackLength = options.trackLength || Math.ceil(trackDetails.trackLen);

        for (let x = 0; x < trackDetails.highActiveNotes; x++) { // active note columns
            if (x !== 0) {
                const colSpace = document.createElement("div");
                colSpace.setAttribute("class", "track--track--colspace");
                trackEl.appendChild(colSpace);                        
            }
            const column = document.createElement("div");
            column.setAttribute("class", "track--track--column");
            trackEl.appendChild(column);

            for (let y = 0; y < trackLength; y++) { // beat rows
                const row = document.createElement("div");
                row.setAttribute("class", "track--track--column--row");
                column.appendChild(row);
            }
            for (let z = 0; z < trackArray.length; z++) { // notes
                const trkPnt = trackArray[z];
                if (trkPnt.pos === x) {
                    const point = document.createElement("div");
                    point.setAttribute("class", "track--track--column--point");
                    point.setAttribute("id", trkPnt.id);
                    if (roundBeats === true) {  // round the notes to the beat
                        trkPnt.start = Math.round(trkPnt.start);
                        trkPnt.len = Math.round(trkPnt.len);
                    }
                    if (trkPnt.pos < 0) {trkPnt.pos = 0}        // do not allow position below zero
                    if (trkPnt.start < 0) {trkPnt.start = 0}    // do not allow start below zero

                    if (trkPnt.start > trackLength) {trkPnt.len = 0; trkPnt.start = 0}  // if all of the note is past notelength, get rid of
                    else if (trkPnt.start + trkPnt.len > trackLength) {trkPnt.len += trackLength - (trkPnt.start + trkPnt.len)}   // if just part of the note is over, limit to track end

                    point.innerHTML = trkPnt.n;
                    point.style.top = ((trkPnt.start) * 15) + "px"; // position 
                    point.style.height = ((trkPnt.len) * 15) + "px"; // height is note length, * 15 as each row (beat) is 15 px. i don't know why it needs to be divided by 3 but it 'just works' (???)
                    column.appendChild(point);      
                    
                    const btm = document.createElement("div");
                    btm.setAttribute("class", "track--track--column--point--btm");
                    point.appendChild(btm);
                    
                    btm.onmousedown = function(){console.log(dragElement(point, true))};
                    btm.onmouseup = function(){dragElement(point, false)};
                    dragElement(point, false);
                }           
            }
        }
    }
}  

export default trackFill;