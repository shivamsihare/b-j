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

function createNote(content,count) {
    var highestDiv = $("#myspace");
    var color = randomElement(COL_ARR);
    highestDiv.sortable({
        tolerance: "touch"
    });
    highestDiv.disableSelection();

    var noteDiv = $("#mydiv").clone();
    noteDiv.attr("id",noteDiv.attr("id")+count);
    noteDiv.children().attr("id",""+count);
    noteDiv.children().children().each(function () {
        $(this).attr("id",$(this).attr("id")+count);
    });
    noteDiv.children().prepend(content);
    showMainText();
    noteDiv.appendTo(highestDiv);
    autosize($('textarea'));
}


function showMainText() {
    checkboxElementCount.push(0);
    var htmlContentDiv = $("#content").clone();
    htmlContentDiv.attr("id",$(htmlContentDiv).attr("id")+count);
    //console.log('before',htmlContentDiv);
    htmlContentDiv.children().each(function () {
        //console.log($(this));
        if($(this).attr("id").indexOf("text")!=-1)$(this).hide();
        $(this).attr("id",$(this).attr("id")+count);
    });
    console.log('after',$("#content"));
    $("#cb"+count).hide();
    ($("#note-new")).prepend(htmlContentDiv);
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


function saveAndDisplay(count) {
    //console.log("saving",count-1,$("#content"+(count-1)));
    $("#done" + (count)).remove();
    $("#cbim" + (count)).remove();
    $("#text" + (count)).remove();
    $("#content" + (count)).removeClass("col-xs-12 col-sm-6 col-md-offset-4");
    $("#content"+count).addClass("col-lg-12");
    console.log("saveanddisplay",arguments.length);
    if(arguments.length == 2) {
        for(var i = 0;i<checkboxElementCount[count];i++){
            $("#cb" + count+"-"+i).removeClass("col-lg-10");
            $("#cb" + count+"-"+i).addClass("col-lg-12");
        }
    }
    else{
        $("#ta"+count).removeClass("col-lg-10");
        $("#ta"+count).addClass("col-lg-12");
    }
    var content = $("#content" + (count)).clone();
    $("#content" + (count)).remove();
    console.log(content, content.children().length);
    createNote(content,count);
}

$(document).on("click", ".done", function (e) {
    var count = $(e.target).attr("id").substr(4);
    if($("#cb"+count+"-0")) {
        saveAndDisplay(count, 0);
    }
    else saveAndDisplay(count);
});

$(document).on('click', '.note_menu', function (event) {
    //$(document).off("blur",".access");
    var el = $(event.target).attr("id");
    if (el.indexOf("dl") != -1) {
        var count = Number(el.substr(2));
        $("#mydiv" + count).remove();
    }
    if (el.indexOf("cbim") != -1) {
        var count = Number(el.substr(4));
        console.log(count);
        $("#ta" + count).remove();
        $("#cbim" + count).hide();
        $("#text"+count).show();
        addCheckBox(count);
    }
    if(el.indexOf("text") != -1){
        var count = Number(el.substr(4));
        $("#content"+count).remove();
        showMainText();
    }
    console.log("click on note_menu",count);
});

function addCheckBox(count) {
    var elDiv = $("#cb").clone();
    var toAddInIds = count+"-"+checkboxElementCount[count];
    elDiv.attr("id",elDiv.attr("id")+toAddInIds);
    console.log(elDiv.attr("id"));
    elDiv.children().each(function () {
        $(this).attr("id",$(this).attr("id")+toAddInIds);
        console.log($(this).attr("id"));
        /*
        if($(this).attr("class").indexOf("cb-ta")!=-1){
            console.log($(this).attr("class"));
            $(this).attr("class",$(this).attr("class")+count);
        }
        */
    });
    autosize($('textarea'));
    var done = $("#done" + count).clone();
    $("#done" + count).remove();
    var text = $("#text" + count).clone();
    $("#text" + count).remove();
    elDiv.appendTo($("#content" + count));
    //$("<br>").appendTo($("#content" + count));
    text.appendTo($("#content" + count));
    done.appendTo($("#content" + count));
    $("#ah-cb"+toAddInIds).focus();
    checkboxElementCount[count]++;
}


$(document).on("mousedown", ".fa-remove", function (e) {
    var x = $(this).attr("id");
    var dash = x.indexOf('-');
    var arrValue = x.substr(dash + 1);
    var count = x.substr(3, dash - 3);
    var idSuffix = count + "-" + arrValue;
    console.log(x, dash, arrValue, count);
    $("#cb" + idSuffix).remove();
    $("#br" + idSuffix).remove();
    if ($("#content" + count).children().length == 0) {
        console.log($("#mydiv" + count));
        $("#content" + count).remove();
        showMainText();
    }
});


function getCountFromCheckboxEl(id,lengthOfBaseId) {
    var l = lengthOfBaseId;
    var pos = id.lastIndexOf("-");
    var count = Number(id.substr(l,pos-l));
    console.log("inside checkbox element ",id,l,pos,count);
    return count;
}

function getCountFromGenEl(id,lengthOfBaseId) {
    var l = lengthOfBaseId;
    return id.substr(l);
}

//check for command save click on note
$(document).on("keydown", ".note", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) { /*ctrl+s or command+s*/

        var topNote = $(e.target).closest("div").parent();
        var id = $(e.target).attr("id");
        var pos = id.lastIndexOf("-");
        var cElId = id.substr(pos+1);
        console.log("command save",topNote,topNote.parent());
        e.preventDefault();
        if (topNote.attr("class") == "row"  ) {
            var count = getCountFromGenEl(id,2);
            console.log(count,$("#ta"));
            saveAndDisplay(count);
        }
        else if(topNote.parent().attr("class") == "row"){
            var count = getCountFromCheckboxEl(id,5);
            saveAndDisplay(count,cElId);
        }
    }
});

function returnKeyPressOnCheckBox(e) {
    var count = getCountFromCheckboxEl($(e.target).attr("id"),5);
    console.log("returnKeyPressOnCheckBox",count,$(e.target).attr("id"));
    if (checkboxElementCount[count] != 0 && $("#ah-cb" + count + "-" + (checkboxElementCount[count] - 1)).val() == 0);
    else addCheckBox(count);
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

$(document).on("keyup", "#i1", function (e) {
    //if (e.which == 13) {
        //e.preventDefault();
        returnKeyPressOnSearch(e);
    //}
});

//texarea autoresize
$(document).on("focus", "textarea", function () {
    //console.log("focus");
    autosize($('textarea'));
});