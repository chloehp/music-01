
import { useState } from 'react'; 
import './track.scss';

import options from '../func/options';
import tr from '../func/tracks';

import Track from './track';

export default function Tracker(props) {    
    const firstTrackObject = { trackno : 0 }
    const [trCompsAr, setTracks] = useState([firstTrackObject])

    function addTrack() {
        tr.newTrack();                                                  // adds mew track array, changes trackSelection to new track
        const newTrackObject = { trackno : options.trackSelection };    //
        setTracks([...trCompsAr, newTrackObject]);
        
        console.log("track added");
        console.log(options.trackSelection);
    }

    return (      
        <div ref={props.trackRef} className='tracker hide'>
            <div className='fill' style={{display: "flex"}}>
                {trCompsAr.map((x) => ( <Track trackno={x.trackno} />))}
                <div className='add-new'><div className='add-new--a clicker' onClick={addTrack}><p className='add-new--a--plus center'>+</p></div></div>
            </div>
        </div>
    );
}