
import options from '../func/options';
import { useRef } from 'react';

export default function Settings(props) {
   return (
      <div id='settings' aria-hidden='true'>
         <h2>Settings</h2>
         <div className='gridcon'>
            <GridItemSelect title={"Theme"}/>
            <GridItemBool title={"Beat rounding"} variable={options.beatRounding}/>
            <GridItemBool title={"Musical QWERTY"}/>
            <GridItemBool title={"Visible notes"}/>
            <GridItemNum title={"Hit latency"}/>

            <GridItemNum title={"BPM"}/>
            <GridItemNum title={"Track length"}/>
            <GridItemNum title={"Time Signature"}/>
            
            <div className='gridcon--g'>
               <div className='gridcon--g--ico'></div>
               <p>About</p>
            </div>

         </div>
      </div>
   )
}

function GridItemNum(props) {
   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico'></div>
         <input type='number' aria-label={props.title + " input"}/>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemBool(props) {
   const btn = useRef();

   function action() {
      if (props.variable === true) {
         btn.current.children[0].classList.add("btn-off");
         btn.current.setAttribute("aria-pressed", "false");
         props.variable = false;
      }
      else {
         btn.current.children[0].classList.remove("btn-off");
         btn.current.setAttribute("aria-pressed", "true");
         props.variable = true;
      }
   }

   return (
      <button className='gridcon--g' ref={btn} aria-pressed='true' onClick={action}>
         <div className='gridcon--g--ico'></div>
         <p>{props.title}</p>
      </button>
   )
}
function GridItemSelect(props) {
   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico'></div>
         <input type='number' aria-label={props.title + " input"}/>
         <p>{props.title}</p>
      </div>
   )
}