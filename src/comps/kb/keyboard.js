import './kb.scss';
import WKey from "./w-key";
import BKey from "./b-key";

export default function Keyboard() {    
    //function keyPress(note) {
    let keyPress = function(note){
        console.log("keypress note: " + note);
    }
    return (      
        <div className='keyboard'>
            <WKey func={keyPress} note={"F"}/>
                <BKey func={keyPress} note={"F*"}/>
            <WKey func={keyPress} note={"G"}/>
                <BKey func={keyPress} note={"G*"}/>
            <WKey func={keyPress} note={"A"}/>
                <BKey func={keyPress} note={"A*"}/>
            <WKey func={keyPress} note={"B"}/>
            <WKey func={keyPress} note={"C"}/>
                <BKey func={keyPress} note={"C*"}/>
            <WKey func={keyPress} note={"D"}/>
                <BKey func={keyPress} note={"D*"}/>
            <WKey func={keyPress} note={"E"}/>
        </div>
    );
}