import './kb.scss';
import OctGroup from "./oct-group";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <OctGroup octave={"3"}/>
            <OctGroup octave={"4"}/>
            <OctGroup octave={"5"}/>
        </div>
    );
}