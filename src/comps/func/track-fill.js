
import options from './options';
import tr from './tracks';
import note from './note';
import dragElement from './dragdrop';

function trackFill(roundBeats = true) {
    const trackSel = options.trackSelection;
    const trackEl = document.querySelectorAll(".track--track--tofill")[trackSel];    
    trackEl.innerHTML = null;
    
    if (tr.tracks[trackSel]){
        const trackArray = tr.tracks[trackSel];
        const trackDetails = tr.evalTrackForDisplay(trackArray);
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
                if (y % 16 === 0) {row.setAttribute("class", "track--track--column--row tr-r-lvl2")}
                else if (y % (16 * options.timeSigTop) === 0) {row.setAttribute("class", "track--track--column--row tr-r-lvl3")}
                else {row.setAttribute("class", "track--track--column--row tr-r-lvl1")}
                column.appendChild(row);
                row.onmousedown = function(){note.trackSet(y)};
            }
            for (let z = 0; z < trackArray.length; z++) { // notes
                const trkPnt = trackArray[z];
                if (trkPnt.pos === x) {
                    /* Point created to represent a note in the tracker */
                    const point = document.createElement("div");
                    point.setAttribute("class", "track--track--column--point");
                    point.setAttribute("id", trkPnt.id);

                    /* Round the notes to the beat if this bool is true */
                    if (roundBeats === true) {  // 
                        trkPnt.start = Math.round(trkPnt.start);
                        trkPnt.len = Math.round(trkPnt.len);
                    }
                    if (trkPnt.pos < 0) {trkPnt.pos = 0}                                                                        // do not allow position below zero
                    //else if (trkPnt.pos > trackDetails.highActiveNotes) {trkPnt.pos = trackDetails.highActiveNotes + 1}       // do not allow position above max + 1, not in use                   
                    if (trkPnt.start < 0) {trkPnt.start = 0}                                                                    // do not allow start below zero
                    if (trkPnt.start > trackLength) {trkPnt.len = 0; trkPnt.start = 0}                                          // if all of the note is past track length, get rid of
                    else if (trkPnt.start + trkPnt.len > trackLength) {trkPnt.len += trackLength - (trkPnt.start + trkPnt.len)} // if just part of the note is over, limit to track end

                    point.style.top = ((trkPnt.start) * 15) + "px";     // position 
                    point.style.height = ((trkPnt.len) * 15) + "px";    // height is note length, * 15 as each row (beat) is 15 px
                    column.appendChild(point);      
                    
                    /* Create input to change notes in tracker */
                    const input = document.createElement("input");     
                    input.setAttribute("class", "track--track--column--point--input");
                    input.setAttribute("type", "text");
                    input.setAttribute("value", trkPnt.n);
                    point.appendChild(input);
                    input.oninput = function(){
                        const inVal = (input.value.charAt(0).toUpperCase()) + (input.value.slice(1, 3));
                        if (note.validate(inVal) === true) {trkPnt.n = inVal}
                    }
                    //const inVal = (input.value.charAt(0).toUpperCase) + (input.value.slice(1, 3));
                    
                    /* Create node to change note length in tracker */
                    const btm = document.createElement("div");          
                    btm.setAttribute("class", "track--track--column--point--btm");
                    point.appendChild(btm);
                    
                    /* Dragdrop func */
                    btm.onmousedown = function(){console.log(dragElement(point, true))};
                    btm.onmouseup = function(){dragElement(point, false)};
                    dragElement(point, false);

                    tr.trackEls[trackSel].push(point);  // push element reference to array
                }           
            }
        }        
        console.log(trackDetails);
        console.log(trackArray);
    }
}  

export default trackFill;