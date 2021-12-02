$(document).ready(function () {
    // i want to use this diagram to keep track of the item dragged into the kanband Board 
    var diagram = []
    var canvas = $(".kanband")
    // var widget = $(".widget")
    $(".tool").draggable({
        helper: "clone"
    });
    canvas.droppable({
        drop: function (event, ui) {
            // alert("Element Dropped");
            var node = {
                _id: (new Date).getTime(),
                position: ui.helper.position()
            }
            // widget.width() is the width of the widget panel. so we have to substract to get the actual width. 
            // the width of the widget panel is 223.125
            node.position.left -= canvas.position().left;
            // here i am trying to get the class attribute of the widget i dragged 
            if (ui.helper.hasClass("tool-1")) {
                node.type = "one"
            } else if (ui.helper.hasClass("tool-2")) {
                node.type = "two"
            } else if (ui.helper.hasClass("tool-3")) {
                node.type = "three"
            } else {
                return;
            }
            // console.log(diagram);
            diagram.push(node);
            renderDiagram(diagram)
        }
    });
    function renderDiagram(diagram) {
        // we need to clear the canvax so that it will not repeat the rendering process twice.
        canvas.empty();
        // console.log("The Diagram is " + diagram)
        for (var d in diagram) {
            // d is the position of each diagram in the  Array. Like postion 0, 1 and 2
            var node = diagram[d];
            // node is the individual content of the diagram 
            // console.log(node)
            var html = "";
            if (node.type === "one") {
                html = "<h3 class='tool'>Tool 1</h3>"
            } else if (node.type === "two") {
                html = "<h3 class='tool'>Tool 2</h3>"
            } else if (node.type === "three") {
                html = "<h3 class='tool'>Tool 3</h3>"
            } else {
                return
            }
            // this will allow us to use jquery to manipulate the Dom to add the css from the positions.
            var dom = $(html).css({
                "position": "absolute",
                "top": node.position.top,
                "left": node.position.left,
            }).draggable({
                stop: function (event, ui) {
                    console.log(ui);
                    var id = ui.helper.attr("id");
                    for (var d in diagram) {
                        var node = diagram[d]
                        if (node._id == id) {
                            node.position.top = ui.position.top
                            node.position.left = ui.position.left
                        }
                    }
                }
            }).attr("id", node._id)
            canvas.append(dom)
        }
    }
});