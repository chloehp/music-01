import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"C"}/>
            <BKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"C#"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"D"}/>
            <BKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"D#"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"E"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"F"}/>
            <BKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"F#"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"G"}/>
            <BKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"G#"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"A"}/>
            <BKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"A#"}/>
            <WKey keyPress={props.keyPress} keyRelease={props.keyRelease} note={"B"}/>
        </div>
    );
}