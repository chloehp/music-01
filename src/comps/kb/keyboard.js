import './kb.scss';
import OctGroup from "./oct-group";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   OctGroup={"3"}/>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   OctGroup={"4"}/>
            <OctGroup   keyPress={props.keyPress}   keyRelease={props.keyRelease}   OctGroup={"5"}/>
        </div>
    );
}