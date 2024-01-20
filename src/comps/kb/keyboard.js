import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <WKey func={props.keyPress} note={"F"} React={props.React}/>
                <BKey func={props.keyPress} note={"F#"} React={props.React}/>
            <WKey func={props.keyPress} note={"G"} React={props.React}/>
                <BKey func={props.keyPress} note={"G#"} React={props.React}/>
            <WKey func={props.keyPress} note={"A"} React={props.React}/>
                <BKey func={props.keyPress} note={"A#"} React={props.React}/>
            <WKey func={props.keyPress} note={"B"} React={props.React}/>
            <WKey func={props.keyPress} note={"C"} React={props.React}/>
                <BKey func={props.keyPress} note={"C#"} React={props.React}/>
            <WKey func={props.keyPress} note={"D"} React={props.React}/>
                <BKey func={props.keyPress} note={"D#"} React={props.React}/>
            <WKey func={props.keyPress} note={"E"} React={props.React}/>
        </div>
    );
}