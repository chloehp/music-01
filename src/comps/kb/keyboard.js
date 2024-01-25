import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function Keyboard(props) {    

    return (      
        <div className='keyboard'>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C3"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C#3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D3"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D#3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"E3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F3"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F#3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G3"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G#3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A3"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A#3"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"B3"}/>
            
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C4"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C#4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D4"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D#4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"E4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F4"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F#4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G4"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G#4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A4"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A#4"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"B4"}/>
            
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C5"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"C#5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D5"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"D#5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"E5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F5"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"F#5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G5"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"G#5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A5"}/>
            <BKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"A#5"}/>
            <WKey   keyPress={props.keyPress}   keyRelease={props.keyRelease}   note={"B5"}/>
        </div>
    );
}