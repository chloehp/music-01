import './settings.scss'
import options from '../func/options';
import { useRef } from 'react';

export default function Settings(props) {
   return (
      <div id='settings' className='snackground' aria-hidden='true'>
         <h1>Settings</h1>
         <div className='gridcon'>
            <GridItemSelect title={"Theme"} fun={options.changeTheme}/>
            <GridItemBool title={"Beat rounding"} fun={options.changeBeatRounding}/>
            <GridItemBool title={"Musical QWERTY"} fun={options.changeMusicalQwerty}/>        
            <GridItemBool title={"Visible notes"} fun={options.changeVisNotes}/>
            <GridItemNum title={"Hit latency"}/>
            <GridItemNum title={"BPM"}/>
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
            <input type='text' aria-label={props.title + " input"}/>
         </div>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemBool(props) {
   const btn = useRef();

   function action() {
      if (props.fun() === true) {
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
   const sel = useRef();
   function prev() {sel.current.children[0].innerHTML = props.fun(-1)}
   function next() {sel.current.children[0].innerHTML = props.fun(1)}
   
   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed' ref={sel}>
            <p className='gridcon--g--ico--txt'></p>
            <button className='gridcon--g--ico--prev-ar' aria-label={"Previous " + props.title} onClick={prev}><div></div></button>
            <button className='gridcon--g--ico--next-ar' aria-label={"Next " + props.title} onClick={next}><div></div></button>
         </div>
         <p>{props.title}</p>
      </div>
   )
}