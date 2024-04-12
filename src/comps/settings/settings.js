import './settings.scss'
import options from '../func/options';
import { useRef } from 'react';

export default function Settings(props) {
   return (
      <div id='settings' className='snackground' aria-hidden='true'>
         <h1>Settings</h1>
         <div className='gridcon'>
            <GridItemSelect title={"Theme"}/>
            <GridItemBool title={"Beat rounding"} fun={options.changeBeatRounding}/>
            <GridItemBool title={"Musical QWERTY"} fun={options.changeMusicalQwerty}/>            
         </div>
         <div className='gridcon'>
            <GridItemBool title={"Visible notes"} fun={options.changeVisNotes}/>
            <GridItemNum title={"Hit latency"}/>
            <GridItemNum title={"BPM"}/>     
         </div>
         <div className='gridcon'>
            <GridItemNum title={"Track length"}/>
            <GridItemNum title={"Time Signature"}/>            
            <div className='gridcon--g'>
               <div className='gridcon--g--ico pressed'></div>
               <p>About</p>
            </div>     
         </div>
         <button className='closeX' onClick={props.displaySettings}>+</button>
      </div>
   )
}

function GridItemNum(props) {
   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'>
            <input type='number' aria-label={props.title + " input"}/>
         </div>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemBool(props) {
   const btn = useRef();

   function action() {
      let b = props.fun();
      if (b === true) {
         btn.current.classList.add("pressed");
         btn.current.setAttribute("aria-pressed", "true");
      }
      else {
         btn.current.classList.remove("pressed");
         btn.current.setAttribute("aria-pressed", "false");
      }
   }

   return (
      <div className='gridcon--g'>
         <button className='gridcon--g--ico pressed' ref={btn} aria-pressed='true' onClick={action} ></button>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemSelect(props) {
   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'></div>
         <p>{props.title}</p>
      </div>
   )
}