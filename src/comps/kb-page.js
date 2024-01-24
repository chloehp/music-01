
import Keyboard from "./kb/keyboard";

export default function KbPage(props) {
    return (      
        <div className='kb-page'>
            <Keyboard keyPress={props.keyPress} keyRelease={props.keyRelease}/>
        </div>
    );
 }
 
 