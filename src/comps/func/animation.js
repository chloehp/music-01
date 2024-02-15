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
    }
}

export default animation;