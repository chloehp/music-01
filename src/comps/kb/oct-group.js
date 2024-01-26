import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function OctGroup(props) {    

    return (      
        <div className='keyboard--oct-group'>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C" + props.octave}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C#" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D" + props.octave}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D#" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"E" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F" + props.octave}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F#" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G" + props.octave}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G#" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A" + props.octave}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A#" + props.octave}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"B" + props.octave}/>
        </div>
    );
}