$(document).ready(function () {
    // i want to use this diagram to keep track of the item dragged into the kanband Board 
    var diagram = []
    var canvas = $(".kanband")
    $(".tool").draggable({
        helper: "clone"
    });
    canvas.droppable({
        drop: function (event, ui) {
            var node = {
                _id: (new Date).getTime(),
                position: ui.helper.position()
            }
            node.position.left -= canvas.position().left;
            if (ui.helper.hasClass("tool-1")) {
                node.type = "one"
            } else if (ui.helper.hasClass("tool-2")) {
                node.type = "two"
            } else if (ui.helper.hasClass("tool-3")) {
                node.type = "three"
            } else {
                return;
            }
            diagram.push(node);
            renderDiagram(diagram)
        }
    });
    function renderDiagram(diagram) {
        canvas.empty();
        for (var d in diagram) {
            var node = diagram[d];
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