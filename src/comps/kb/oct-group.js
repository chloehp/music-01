import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function OctGroup(props) {    

    return (      
        <div ref={props.octRef} className='keyboard--oct-group'>
            <WKey note={"C" + props.octave}/>
            <BKey note={"C#" + props.octave}/>
            <WKey note={"D" + props.octave}/>
            <BKey note={"D#" + props.octave}/>
            <WKey note={"E" + props.octave}/>
            <WKey note={"F" + props.octave}/>
            <BKey note={"F#" + props.octave}/>
            <WKey note={"G" + props.octave}/>
            <BKey note={"G#" + props.octave}/>
            <WKey note={"A" + props.octave}/>
            <BKey note={"A#" + props.octave}/>
            <WKey note={"B" + props.octave}/>
        </div>
    );
}