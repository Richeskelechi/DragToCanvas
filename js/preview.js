const bag = document.getElementById('preview')

let allWidgets = localStorage.getItem('widgets')
allWidgets = JSON.parse(allWidgets)
console.log(allWidgets)

allWidgets.forEach((widget) => {
    const wid = document.createElement("h3");
    if (widget.type == "one") {
        wid.className = "tool tool-1";
        const node = document.createTextNode("Tool 1");
        wid.style.marginLeft = widget.position.left + "px";
        wid.style.marginTop = widget.position.top + "px";
        wid.style.width = "150px";
        wid.appendChild(node);
    } else if (widget.type == "two") {
        wid.className = "tool tool-2";
        const node = document.createTextNode("Tool 2");
        wid.style.marginLeft = widget.position.left + "px";
        wid.style.marginTop = widget.position.top + "px";
        wid.style.width = "150px";
        wid.appendChild(node);
    } else {
        wid.className = "tool tool-3";
        const node = document.createTextNode("Tool 3");
        wid.style.marginLeft = widget.position.left + "px";
        wid.style.marginTop = widget.position.top + "px";
        wid.style.width = "150px";
        wid.appendChild(node);
    }
    bag.appendChild(wid);
})