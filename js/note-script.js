var count = 0;
var COL_OBJ = {
    yellow: "ffbb37",
    green: "97c800",
    blue: "009eea",
    pink: "ffccff",
    black: "cccccc"
};
var COL_ARR = ["ffbb37", "97c800", "009eea", "ffccff", "cccccc"];
var checkboxElementCount = [];

function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createNote(content) {
    console.log($("#content" + (count - 1)));
    var highestDiv = $("#myspace");
    var color = randomElement(COL_ARR);
    var del = $('<input />', {
        type: "image",
        class: "note_menu del note-area",
        id: "dl" + count,
        src: "icons/delete.png",
        height: "20px"
    });
    var another_div = $('<div />', {
        class: "",
        id: 'mydiv' + count,
        style: "padding-left:10px;padding-top:10px;display:inline-block;"
    });
    var div = $('<div />', {
        id: "" + count,
        class: "main-div",
        style: "display:inline-block;padding-top: 10px;padding-left: 10px;padding-right: 10px;padding-bottom: 10px;background-color: #" + color,
    });
    content.attr("style", {"background-color": color});
    var br = $('<br/>');
    highestDiv.sortable({
        tolerance: "touch"
    });

    highestDiv.disableSelection();
    content.appendTo(div);
    br.appendTo(div);
    del.appendTo(div);
    //radiobutton.appendTo(div);
    div.appendTo(another_div);
    showMainText();
    another_div.appendTo($("#myspace"));//.prepend(another_div);
    autosize($('textarea'));
}


function showMainText() {
    checkboxElementCount.push(0);
    var highestDiv = $("#myspace");

    var contentDiv = $("<div/>", {
        class: "col-xs-12 col-sm-6 col-md-offset-4 random",
        id: "content" + count,
        style: "background-color:white;padding-top: 10px;padding-left: 10px;padding-right: 10px;padding-bottom: 10px"
    });

    var mainText = $('<textarea />', {
        id: "ta" + count,
        class: "note note-area",
        placeholder: "Type here..",
        style: "border:0px;height:100%;width:100%;background-color:transparent",
        cols: 200,
        rows: 1
    });

    var checkbox = $('<input />', {
        type: "image",
        class: "note_menu cb note-area",
        id: "cb" + count,
        src: "icons/check-box.png",
        style: "position:relative;margin-left:10px;margin-top:10px;height:20px;"
    });

    var next = $('<i />', {
        id: "done" + count,
        class: "note_menu fa fa-arrow-circle-right done",
        "input-type": "hidden",
        style: "position:relative;margin-left:10px;margin-top:10px;font-size:20px;float:right"
    });
    mainText.appendTo(contentDiv);
    checkbox.appendTo(contentDiv);
    next.appendTo(contentDiv);
    ($("#note-new")).prepend(contentDiv);
    count++;
}

$((function () {
    showMainText();
    $("#i1").click(function () {
        $("#i1").animate({type: "text", width: "100%", height: "30px"}, 500);
    });
    $("#i1").blur(function () {
        $("#i1").animate({type: "text", width: "60%", height: "30px"}, 500);
    });

}));


function saveAndDisplay() {
    $("#done" + (count - 1)).remove();
    //$("#cb" + (count - 1)).remove();
    $("#ta" + (count - 1)).attr("cols", 22);
    $(".ah-cb" + (count - 1)).attr("cols", 22);
    $("#content" + (count - 1)).removeClass("col-xs-12 col-sm-6 col-md-offset-4 random");
    var content = $("#content" + (count - 1)).clone();
    $("#content" + (count - 1)).remove();
    console.log(content, content.children().length);
    createNote(content);
}

$(document).on("click", ".done", function () {
    saveAndDisplay();
});

$(document).on('click', '.note_menu', function (event) {
    //$(document).off("blur",".access");
    var el = $(this).attr("id");
    var addElement, label;
    //var color = $("#"+count).css("background-color");
    if (el.indexOf("dl") != -1) {
        var count = Number(el.substr(2));
        $("#mydiv" + count).remove();
    }
    if (el.indexOf("cb") != -1) {
        var count = Number(el.substr(2));
        console.log(count);
        $("#ta" + count).remove();
        //$("#cb" + count).remove();
        addCheckBox(count, 40);
    }
});

function addCheckBox(count, textareaSize) {
    var elDiv = $('<div />', {
        id: "cb" + count + "-" + checkboxElementCount[count],
        style: "background-color: transparent;display:inline-block"
    });
    var addElement = $('<input/>', {
        type: "checkbox",
        class: "note-area"
    });

    var label = $('<textarea/>', {
        id: "ah-cb" + count + "-" + checkboxElementCount[count],
        class: "note cb-ta note-area ah-cb" + count,
        placeholder: "Type here..",
        rows: 1,
        cols: textareaSize
    });
    var remove = $('<i />', {
        id: "rem" + count + "-" + checkboxElementCount[count],
        class: "fa fa-remove note-area",
        "input-type": "hidden",
        style: "font-size:20px;display:inline-block;vertical-align:top"
    });
    var br = $('<br />', {
        id: "br" + count + "-" + checkboxElementCount[count]
    });
    var done = $("#done" + count).clone();
    $("#done" + count).remove();
    addElement.appendTo(elDiv);
    label.appendTo(elDiv);
    remove.appendTo(elDiv);
    elDiv.appendTo($("#content" + count));
    br.appendTo($("#content" + count));
    done.appendTo($("#content" + count));
    checkboxElementCount[count]++;
    label.focus();
    autosize($('textarea'));
}


$(document).on("mousedown", ".fa-remove", function (e) {
    var x = $(this).attr("id");
    var dash = x.indexOf('-');
    var arrValue = x.substr(dash + 1);
    var count = x.substr(3, dash - 3);
    console.log(x, dash, arrValue, count);
    $("#cb" + count + "-" + arrValue).remove();
    $("#br" + count + "-" + arrValue).remove();
    if ($("#content" + count).children().length == 1) {
        console.log($("#mydiv" + count));
        $("#content" + count).remove();
        showMainText();
    }
});

//check for command save click on note
$(document).on("keydown", ".note", function (e) {

    if ((e.metaKey || e.ctrlKey) && e.keyCode == 83 && clickOnElement("note-area")) { /*ctrl+s or command+s*/

        var topNote = $(e.target).closest("div").parent();
        //console.log("command save",topNote.parent());
        e.preventDefault();
        if (topNote.attr("class") == "row" || topNote.parent().attr("class") == "row") {
            saveAndDisplay();
        }
    }
});

function returnKeyPressOnCheckBox(e) {
    var id = $(e.target).attr("id");
    var col = $(e.target).attr("cols");
    var x = id.indexOf("-", 3);
    //console.log("Enter key press",id,window.count,arg,x,col);
    x = id.substr(5, x - 5);
    var count = Number(x);
    //console.log(x,Number(x)+10,checkboxElementCount[count],$("#ah-cb"+count+"-"+(checkboxElementCount[count]-1)).val().length);
    if (checkboxElementCount[count] != 0 && $("#ah-cb" + count + "-" + (checkboxElementCount[count] - 1)).val().length == 0);
    else addCheckBox(count, col);
}


$(document).on("keypress", ".cb-ta", function (e) {
    if (e.which == 13) {
        e.preventDefault();
        returnKeyPressOnCheckBox(e);
    }
});

function returnKeyPressOnSearch() {
    $("#myspace").children().each(function (i) {
        var found = false;
        console.log($(this));
        $(this).find("textarea").each(function () {
            console.log("compare", $(this).val(), $("#i1").val());
            console.log($(this).text().indexOf($("#i1")));
            if ($(this).val().indexOf($("#i1").val()) != -1) {
                found = true;
                return;
            }
        });
        if (!found) $(this).hide();
        else $(this).show();
    });
}

$(document).on("keypress", "#i1", function (e) {
    if (e.which == 13) {
        e.preventDefault();
        returnKeyPressOnSearch(e);
    }
});

//texarea autoresize
$(document).on("focus", "textarea", function () {
    //console.log("focus");
    autosize($('textarea'));
});