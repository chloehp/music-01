
import { useState } from 'react'; 
import './track.scss';

import options from '../func/options';
import tr from '../func/tracks';

import Track from './track';

export default function Tracker(props) {    
    const firstTrackObject = { trackno : 0 }
    const [trCompsAr, setTracks] = useState([firstTrackObject])

    function addTrack() {
        tr.newTrack();                                                  // adds new track array, changes trackSelection to new track
        const newTrackObject = { trackno : options.trackSelection };    //
        setTracks([...trCompsAr, newTrackObject]);
        
        console.log("track added");
        console.log(options.trackSelection);
    }

    function addScroll() {document.getElementById("addNew").style.top = document.getElementById("wholeTracker").scrollTop + "px"}    

    return (      
        <div ref={props.trackRef} onScroll={addScroll} id={"wholeTracker"} className='tracker hide'>
            <div className='fill' style={{display: "flex"}}>
                {trCompsAr.map((x) => ( <Track trackno={x.trackno} />))}
                <div className='add-new' id={"addNew"}>
                    <div className='add-new--a clicker' onClick={addTrack}><p className='add-new--a--plus center'>+</p></div>
                </div>
            </div>
        </div>
    );
}