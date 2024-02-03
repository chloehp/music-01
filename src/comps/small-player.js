import './cob.scss';
//func
import note from './func/note';
//import options from './func/options';

export default function SmallPlayer(props) { 
    
    //function trackHeadZero(){options.trackhead = 0};
    return (      
        <div>
            <div className='smallplayer back-button' onClick={note.trackReset}><div className='center'>Back</div></div>
            <div className='smallplayer play-button' onClick={note.playGo}><div className='center'>Play/Pause</div></div>
            <div className='smallplayer forw-button'></div>
        </div>
    );
}