import './cob.scss';
//func
import note from './func/note';
//import options from './func/options';

export default function SmallPlayer(props) { 
    
    function clickBackButton(){
        note.trackReset();
        const ele = document.querySelector(".back-button");
        bobble(ele);
    }
    function clickPlayButton(){
        note.playGo();
        const ele = document.querySelector(".play-button");
        bobble(ele);
    }
    function clickRecButton(){
        note.recordGo();
        const ele = document.querySelector(".rec-button");
        bobble(ele);
    }

    function bobble(element) {
        element.classList.add("sp-bobble");        
        setTimeout(function(){
            element.classList.remove("sp-bobble");    
        }, 1200)
    }
    //function trackHeadZero(){options.trackhead = 0};
    return (      
        <div>
            <div className='smallplayer back-button' onMouseDown={clickBackButton}><div className='center'>Back</div></div>
            <div className='smallplayer play-button' onMouseDown={clickPlayButton}><div className='center'>Play/Pause</div></div>
            <div className='smallplayer rec-button'  onMouseDown={clickRecButton}><div id='red-spot' className='center'></div></div>
        </div>
    );
}