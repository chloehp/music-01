import './track.scss';
import { useRef } from 'react';

import options from '../func/options';
import tr from '../func/tracks';

export default function Track(props) {    
    const trRef = useRef();        
    const trackEL = useRef();
    
    printTrack()
    function printTrack() {
        console.log("print track");
        setTimeout(function(){

            if (trRef.current) {trRef.current.classList.add("track-rend")}
            else {console.log("track trref false")}
            const trackSel = options.trackSelection;

            if ((props.trackno === trackSel) && (tr.tracks[trackSel]) && (tr.tracks[trackSel].length > 0)){
                const trackArray = tr.tracks[trackSel];
                const trackDetails = tr.evalTrackForDisplay(trackArray);
                //trackDetails.highActiveNotes
                console.log(trackDetails.trackLen)

                for (let x = 0; x < trackDetails.highActiveNotes; x++) { // active note columns
                    if (x !== 0) {
                        const colSpace = document.createElement("div");
                        colSpace.setAttribute("class", "track--track--colspace");
                        trackEL.current.appendChild(colSpace);                        
                    }
                    const column = document.createElement("div");
                    column.setAttribute("class", "track--track--column");
                    trackEL.current.appendChild(column);

                    for (let y = 0; y < trackDetails.trackLen; y++) { // beat rows
                        const row = document.createElement("div");
                        row.setAttribute("class", "track--track--column--row");
                        column.appendChild(row);

                        if (trackArray[y][x]) {                            // point
                            const point = document.createElement("div");
                            point.setAttribute("class", "track--track--column--row--point");
                            if (trackArray[y][x].n) {
                                point.innerHTML = trackArray[y][x].n;
                                point.style.height = ((trackArray[y][x].l) * 15) + "px"; // height is note length, * 15 as each row (beat) is 15 px. i don't know why it needs to be divided by 3 but it 'just works' (???)
                            }
                            row.appendChild(point);
                        }
                    }
                }
            }
        }, 150);  
    }  


    return (      
        <div ref={trRef} className='track' id={"track" + props.trackno}>
            <div className='track--details'></div>
            <div ref={trackEL} className='track--track' onClick={printTrack}></div>
        </div>
    );
}