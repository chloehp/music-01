import './kb.scss';
import OctGroup from "./oct-group";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   octave={"3"}/>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   octave={"4"}/>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   octave={"5"}/>
        </div>
    );
}