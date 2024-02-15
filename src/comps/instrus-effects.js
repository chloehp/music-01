
import { useState } from 'react'; 
import { useRef } from 'react'; 
import './instrus-effects.scss';
//import options from './func/options';

export default function InstrusAndEffects(props) {
    //refs
    const effectContainer = useRef();
    
    const volumeControl = {efctNo : 0, name: "Volume", val : 0 };
    const [effectArray, setEffects] = useState([volumeControl])

    function addEffect() {     
        const newEffectObject = {efctNo : 0, name: "", val : 1 };    //
        setEffects([...effectArray, newEffectObject]);
        
        setTimeout(function(){
            effectContainer.current.scrollTop = effectContainer.current.scrollHeight;
            console.log("Effect added");
        }, 30);   
    }

    return (
        <div className='instrs-efcts fill'>
            <div className='instrs-efcts--instruments'>
                <h1 className='instrs-efcts--instruments--t'>Instrument</h1>
                <div className='instrs-efcts--instruments--pic'></div>
            </div>
            <div className='instrs-efcts--sep'></div>
            <div ref={effectContainer} className='instrs-efcts--effects'>
                {effectArray.map((item, key) => (
                    <div className='instrs-efcts--effects--e'></div>
                ))}
                <div className='instrs-efcts--effects--e clicker' id='add-effect' onClick={addEffect}>+</div>
            </div>
        </div>
    );
}