
import './kb.scss';
import OctGroup from "./oct-group";

export default function Keyboard(props) {       

    return (      
        <div ref={props.kbRef} className='keyboard'>
            <OctGroup octave={"1"}/>
            <OctGroup octave={"2"}/>
            <OctGroup octave={"3"}/>
            <OctGroup octave={"4"}/>
            <OctGroup octave={"5"}/>
            <OctGroup octave={"6"}/>
            <OctGroup octave={"7"}/>
        </div>
    );
}