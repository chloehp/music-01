
import { useState } from 'react'; 
import './track.scss';

import options from '../func/options';
import tr from '../func/tracks';

import Track from './track';

export default function Tracker(props) {    
    const firstTrackObject = { track : 0, instruments : [0], effects : []}
    const [trCompsAr, setTracks] = useState([firstTrackObject])

    function addTrack() {
        tr.newTrack();
        const newTrackNo = tr.tracks.length;
        const newTrackObject = { track : newTrackNo, instruments : [options.instrumentSelect], effects : []};
        setTracks([...trCompsAr, newTrackObject]);

        options.trackSelection = newTrackNo;
        console.log("track added");
    }

    return (      
        <div ref={props.trackRef} className='tracker hide'>
            <div className='fill' style={{display: "flex"}}>
                {trCompsAr.map((x) => ( <Track track={x.track} instruments={x.instruments} effects={x.effects} />))}
                <div className='add-new'><div className='add-new--a clicker' onClick={addTrack}><p className='add-new--a--plus center'>+</p></div></div>
            </div>
        </div>
    );
}