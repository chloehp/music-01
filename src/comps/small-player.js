import './cob.scss';
//func
import note from './func/note';
//import options from './func/options';

export default function SmallPlayer(props) { 
    
    //function trackHeadZero(){options.trackhead = 0};
    return (      
        <div>
            <div className='smallplayer clicker back-button' onMouseDown={note.trackReset}><div className='center'>Back</div></div>
            <div className='smallplayer clicker play-button' onMouseDown={note.playGo}><div className='center'>Play/Pause</div></div>
            <div className='smallplayer clicker rec-button'  onMouseDown={note.recordGo}><div id='red-spot' className='center'></div></div>
        </div>
    );
}