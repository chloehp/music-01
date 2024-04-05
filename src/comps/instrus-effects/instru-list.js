import './cob.scss';
import options from '../func/options';

export default function InstrumentList(props) { 
    
    return (      
        <div className='win' ref={props.instruWinRef} style={{width: '30%', height: '75%', right: '12%', top: '6%'}}>
            <div className='win--title'>
                <h2>Instruments</h2>
                <div className='win--spacer'></div>
            </div>
            <div className='win--container'>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-3)}>A</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-2)}>A#</div>
                <div className='win--container--block kChnge' style={{width: '1vw'}} onClick={() => changeKey(-1)}>B</div>
            </div>
            <div className='win--container'>
                <div className='win--container--block sclLimBtn block-selected' style={{width: '15vw'}} onClick={() => limitToScale(0)}>None</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(1)}>Major</div>
                <div className='win--container--block sclLimBtn' style={{width: '15vw'}} onClick={() => limitToScale(2)}>Minor</div>
            </div>
        </div>
    );
}
