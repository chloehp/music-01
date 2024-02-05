
import options from './options';
import tr from './tracks';
import dragElement from './dragdrop';

function trackFill(trackno = options.trackSelection) {
    console.log("print track " + trackno);
    const trackEl = document.querySelectorAll(".track--track")[trackno];
    
    trackEl.innerHTML = null;
    
    const trackSel = options.trackSelection;
    if ((trackno === trackSel) && (tr.tracks[trackSel])){
        const trackArray = tr.tracks[trackSel];
        const trackDetails = tr.evalTrackForDisplay(trackArray);
        console.log(trackDetails);
        const trackLength = Math.ceil(trackDetails.trackLen);

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
                if (trackArray[z].pos === x) {
                    const point = document.createElement("div");
                    point.setAttribute("class", "track--track--column--point");
                    point.setAttribute("id", trackArray[z].id);
                    point.setAttribute("draggable", "true");

                    point.innerHTML = trackArray[z].n;
                    point.style.top = ((trackArray[z].start) * 15) + "px"; // position 
                    point.style.height = ((trackArray[z].len) * 15) + "px"; // height is note length, * 15 as each row (beat) is 15 px. i don't know why it needs to be divided by 3 but it 'just works' (???)
                    column.appendChild(point);      
                    
                    //point.onmousedown = function(e){
                    //    e = e || window.event;
                    //    console.log(point.id);
                    //    const mX = e.clientX; const mY = e.clientY;
                    //    point.onmousedown = function(){
                    //        const moveX = e.clientX - mX;
                    //        const moveY = e.clientY - mY;
                    //        console.log("move: X" + moveX + " Y" + moveY);
                    //    }
                    //}
                    dragElement(point);
                }           
            }
        }
    }
}  

export default trackFill;