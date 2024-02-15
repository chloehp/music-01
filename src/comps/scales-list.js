import './cob.scss';
import options from './func/options';
import animation from './func/animation';

export default function ScalesList(props) { 
    let keyAdd = 0;
    let keyString = "C";
    function changeKey(key = 0) {            
        keyAdd = key;   
        const buttonEls = document.querySelectorAll(".kChnge");
        keyString = buttonEls[key + 3].innerHTML;
        console.log("C + " + key + " = " + keyString);       
        animation.consoleLog("C + " + key + " = " + keyString);
        limitToScale();

        const btnElLen = buttonEls.length;
        for (let i = 0; i < btnElLen; i++) {buttonEls[i].classList.remove("block-selected")}
        buttonEls[key + 3].classList.add("block-selected");  
    }
    const scales = [
        //0: ALL NOTES
        [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7],
        //1: MAJOR
        [1, 2, 3, 4, 5, 6, 7],
        //2: MINOR
        [1, 2, 2.5, 4, 5, 5.5, 6.5],
        //3: MAJOR PENT
        [1, 2, 3, 5, 6],
        //4: MINOR PENT
        [1, 2.5, 4, 5, 6.5],
        //5: MAJOR BLUES
        [1, 2, 2.5, 3, 5, 6],
        //6: MINOR BLUES
        [1, 2.5, 4, 4.5, 5, 6.5],
        //7: HARMONIC MINOR
        [1, 2, 2.5, 4, 5, 5.5, 7, 8],
    ]
    let activeScale = [];

    let currentScale = 0;
    function limitToScale(scale = currentScale) {
        activeScale = [];
        const whiteKeys = document.querySelectorAll(".w-key");
        const blackKeys = document.querySelectorAll(".b-key");
        const allKeys = [...whiteKeys, ...blackKeys];
        const scaleLen = scales[scale].length;
        for (let x = 0; x < scaleLen; x++) {
            let n = scales[scale][x] + 2;   // +2 gets to C key

            if (keyAdd > 0) {                           // if higher than C
                for (let y = 0; y < keyAdd; y++) {      // for each key add
                    n += 0.5;                           // go up half note
                    if ((n === 2.5) || (n === 5.5) || (n === 9.5) || (n === 12.5)) {n += 0.5}  // must go up each note on the keyboard, if B# or E#, skip
                }
            }
            else if (keyAdd < 0) {                      // if lower than C
                const absolute = Math.abs(keyAdd);      // make negative keyAdd pos for 'for' loop
                for (let y = 0; y < absolute; y++) {    // for each key (-) add
                    n -= 0.5;                           // go down half note
                    if ((n === -1.5) || (n === 2.5) || (n === 5.5) || (n === 9.5) || (n === 12.5)) {n -= 0.5} // must go up each note on the keyboard, if B# or E#, skip
                }
            }
            if (n > 7.5) {n -= 7}                       // 7.5 would be G#, 8 = A
            if (n < 1)   {n += 7}                       // 1 would be A, 0.5 = G#
            const natural = Number.isInteger(n);
            if (natural === false) {activeScale.push(String.fromCharCode(Math.trunc(n + 64)) + "#")}
            else                   {activeScale.push(String.fromCharCode(n + 64))}
        }        
        const akLen = allKeys.length;
        for (let i = 0; i < akLen; i++) {
            const note = allKeys[i].id.slice(3, -1);
            if (activeScale.includes(note)) {allKeys[i].classList.remove("width-0")}
            else {allKeys[i].classList.add("width-0")}
        }
        const buttonEls = document.querySelectorAll(".sclLimBtn");
        const btnElLen = buttonEls.length;
        for (let i = 0; i < btnElLen; i++) {buttonEls[i].classList.remove("block-selected")}    // deselect all buttons
        buttonEls[scale].classList.add("block-selected");                                       // select active button
        currentScale = scale;    

        const bkLen = blackKeys.length;
        if (scale === 0) {
            options.scalesChoice = "Scales";
            for (let i = 0; i < bkLen; i++) {
                blackKeys[i].classList.remove("scales-on")
            }
        }
        else {
            options.scalesChoice = buttonEls[scale].innerHTML + " in " + keyString;
            for (let i = 0; i < bkLen; i++) {
                const bCL = blackKeys[i].classList;                
                if (bCL.contains("width-0") === false){
                    setTimeout(function(){bCL.add("scales-on")}, 0) 
                }                
            }
        }
        document.getElementById("kbcob-m-2").innerHTML = options.scalesChoice;
        console.log(options.scalesChoice);
        console.log(activeScale);
        animation.consoleLog(options.scalesChoice);
        animation.consoleLog(activeScale);
    }

    return (      
        <div className='win' ref={props.scalesWinRef} style={{width: '30%', height: '75%', right: '12%', top: '6%'}}>
            <div className='win--title'>
                <h2>Scales</h2>
                <div className='win--spacer'></div>
            </div>
            <div className='win--container'>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-3)}>A</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-2)}>A#</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-1)}>B</div>
                <div className='win--container--block kChnge block-selected' style={{width: '1vw'}} onClick={() => changeKey(0)}>C</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(1)}>C#</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(2)}>D</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(3)}>D#</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(4)}>E</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(5)}>F</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(6)}>F#</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(7)}>G</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(8)}>G#</div>
            </div>
            <div className='win--container'>
                <div className='win--container--block sclLimBtn block-selected' style={{width: '15vw'}} onClick={() => limitToScale(0)}>None</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(1)}>Major</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(2)}>Minor</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(3)}>Major Pentatonic</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(4)}>Minor Pentatonic</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(5)}>Major Blues</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(6)}>Minor Blues</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(7)}>Harmonic Minor</div>
            </div>
        </div>
    );
}
