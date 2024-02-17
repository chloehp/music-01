import options from "./options";

const animation = {
    bobble : function(element) {
        element.classList.remove("sp-bobble");    
        element.classList.add("sp-bobble");        
        setTimeout(function(){
            element.classList.remove("sp-bobble");    
        }, 1200)
    },
    consoleLog : function(text) {        
        const newItem = document.createElement("p");
        const theConsole = document.getElementById("kbcob-3");
        newItem.innerHTML = text;
        theConsole.appendChild(newItem);
        
        const conInter = setInterval(function(){
            if (theConsole.scrollTop + theConsole.clientHeight >= theConsole.scrollHeight) {clearInterval(conInter); return}
            else {theConsole.scrollTop += 3}
        }, 30); 
    },

    
    beatCountInit : function() {
        const hCircle = document.getElementById('beatCounter').children;
        for (let i = 0; i < hCircle.length; i++) {hCircle[i].style.transition = "rotate " + (options.beat64Len * 16) + "ms linear"}
        animation.beatCountTurn(hCircle);
        const spInterval = setInterval(function(){    
            if ((options.play === true) || (options.record === true)) {animation.beatCountTurn(hCircle)}
            else {clearInterval(spInterval); return}
        }, options.beat64Len * 64);   
    },
    beatCountTurn : function(hCircle) {
        hCircle[2].style.rotate = ""; 
        hCircle[3].style.rotate = "";
        hCircle[5].style.rotate = "";
        hCircle[5].style.zIndex = 90;
        hCircle[7].style.zIndex = 90;

        hCircle[2].style.zIndex = 84; 
        hCircle[3].style.zIndex = 84;
        hCircle[7].style.rotate = "180deg";
        setTimeout(function(){
            hCircle[7].style.zIndex = 84;
            hCircle[5].style.zIndex = 96;
            hCircle[5].style.rotate = "180deg";
        }, options.beat64Len * 16);
        setTimeout(function(){
            hCircle[2].style.zIndex = 93;
            hCircle[2].style.rotate = "360deg";
        }, options.beat64Len * 32);
        setTimeout(function(){
            hCircle[3].style.zIndex = 99;
            hCircle[3].style.rotate = "180deg";
            
            hCircle[5].style.zIndex = 93;
            hCircle[7].style.rotate = "";
        }, options.beat64Len * 48);
    },
}

export default animation;