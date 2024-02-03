
function dragElement(elmnt) {
    
}

//needs work for touch
/*
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const trackerEl = document.querySelector(".tracker");
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function dragTouchDown(e) {
        trackerEl.style.touchAction = "none";
        e = e || window.event;
        //e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX; pos4 = e.clientY;
        document.ontouchend = closeTouchElement;
        // call a function whenever the cursor moves:
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        //e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - (e.clientX || e.targetTouches[0].pageX);
        pos2 = pos4 - (e.clientY || e.targetTouches[0].pageY);
        pos3 = e.clientX || e.targetTouches[0].pageX;
        pos4 = e.clientY || e.targetTouches[0].pageY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    function closeTouchElement() {
        trackerEl.style.touchAction = "auto";
        // stop moving when mouse button is released:
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}
*/
export default dragElement;