
import options from '../func/options';

export default function Settings(props) {
   return (
      <div className='settings' aria-hidden='true'>
         <div className='settings--gridcon'>
            <GridItemSelect title={"Theme"}/>
            <GridItemBool title={"Beat rounding"}/>
            <GridItemBool title={"Musical QWERTY"}/>
            <GridItemBool title={"Visible notes"}/>

            <GridItemNum title={"BPM"}/>
            <GridItemNum title={"Track length"}/>
            <GridItemNum title={"Time Signature"}/>
            
            <div className='settings--gridcon--g'>
               <div className='settings--gridcon--g--ico'></div>
               <p>About</p>
            </div>

         </div>
      </div>
   )
}

function GridItemNum(props) {
   return (
      <div className='settings--gridcon--g'>
         <div className='settings--gridcon--g--ico'></div>
         <input type='number' aria-label={props.title + " input"}/>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemBool(props) {
   return (
      <div className='settings--gridcon--g'>
         <div className='settings--gridcon--g--ico'></div>
         <input type='number' aria-label={props.title + " input"}/>
         <p>{props.title}</p>
      </div>
   )
}
function GridItemSelect(props) {
   return (
      <div className='settings--gridcon--g'>
         <div className='settings--gridcon--g--ico'></div>
         <input type='number' aria-label={props.title + " input"}/>
         <p>{props.title}</p>
      </div>
   )
}