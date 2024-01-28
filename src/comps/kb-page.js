import '../App.scss';
import Keyboard from "./kb/keyboard";
import Tracker from './track/tracker';

export default function KbPage(props) {    

    return (      
        <div className='kb-page'>
            <div className='kb-page--cob' id='kbcob-0'></div>
            <div className='kb-page--cob' id='kbcob-1'></div>
            <div className='kb-page--cob' id='kbcob-2'></div>
            <div className='kb-page--cob' id='kbcob-m-0'></div>
            <div className='kb-page--cob' id='kbcob-m-1'></div>
            <div className='kb-page--cob' id='kbcob-m-2' onClick={props.recButton}>RECORD</div>
            <Keyboard/>
            <Tracker/>
        </div>
    );
}