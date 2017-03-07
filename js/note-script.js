	var count = 0;
	var yellow = "ffbb37";
	var green = "97c800";
	var blue = "009eea";
	var pink = "ffccff";
	var black = "cccccc";
	var arr = [yellow,green,blue,pink,black];
	var checkboxElementCount = [];

	function randomElement(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}

	function createNote(){
		checkboxElementCount.push(0);
		var color = randomElement(arr);
		var highestDiv = $("#myspace");
		var del = $('<input />',{
			type:"image",
			class:"note_menu del note-area",
			id:"dl"+count,
			src:"icons/delete.png",
			height:"20px"
		});

		var checkbox = $('<input />',{
			type:"image",
			class: "note_menu cb note-area",
			id : "cb"+count,
			src : "icons/check-box.png",
			height:"20px"
			});
		var mainText = $('<textarea />',{
			id:"ta"+count,
			class:"note note-area",
			placeholder: "Type here..",
			style: "border:0px;height:100%;width:100%",
			cols:30
		});
		/*
		var radiobutton = $('<input />',{
			type: "image",
			class: "note_menu",
			id : "rb"+count,
			src : "icons/radio-button.png",
			height:"20px"
			});
			*/
		var another_div = $('<div />',{
			class: "col-xs-12 col-sm-6 col-md-4 col-lg-4 random",
			id: 'mydiv'+count,
			style: "padding-left:10px;padding-top:10px;display:inline-block"
		});
		var div = $('<div />',{
			id:""+count,
			class: "main-div",
			style: "background-color: #"+color,
		});
		var content_div = $('<div />',{
			id:"content"+count,
			style: "background-color:transparent;display:inline-block"
		});
		var br = $('<br/>');
		highestDiv.sortable({
			tolerance:"touch"
		});

		highestDiv.disableSelection(); 
		mainText.appendTo(content_div);
		content_div.appendTo(div);
		br.appendTo(div);
		del.appendTo(div);
		checkbox.appendTo(div);
		//radiobutton.appendTo(div);
		div.appendTo(another_div);
		another_div.appendTo($("#myspace"));
		$("#make-note").slideUp("slow");
		mainText.focus();
		count++;
	}

	$(document).on('click', '.note_menu', function(event) {
		//$(document).off("blur",".access");
		var count = $(this).closest("div").attr("id");
		var el = $(this).attr("id");
		var addElement,label;
		//var color = $("#"+count).css("background-color");
		if(el.indexOf("dl"+count)!=-1){
			$("#mydiv"+count).remove();
			showNewNoteMenu();
		}
		else if(el.indexOf("cb"+count)!=-1){
			$("#content"+count).empty();
			addCheckBox(count);
		}
	}); 

function addCheckBox(count){
	var elDiv = $('<div />',{
				id:"cb"+count,
				style: "background-color: transparent;display:inline-block"
			});
			var addElement = $('<input/>',{
				type:"checkbox",
				class:"note-area"
			});
			
			var label=$('<textarea/>',{
				id : "ah-cb"+count+"-"+checkboxElementCount[count],
				class:"note cb-ta note-area",
				placeholder: "Type here..",
				rows:1,
				cols:22
			});
			var remove = $('<i/>',{
				class:"fa fa-times",
				"aria-hidden":"true",
				style:"font-size:20px;"
			});
			
			addElement.appendTo(elDiv);
			label.appendTo(elDiv);
			elDiv.appendTo($("#content"+count));
			remove.appendTo(elDiv);
			checkboxElementCount[count]++;
			label.focus();
}

function returnKeyPressOnCheckBox(e){
	var id = $(e.target).attr("id");
	var x = id.indexOf("-",3);
	console.log('shivam:'+x);
	x = id.substr(5,x-5);
	console.log(x,Number(x)+10);
	addCheckBox(parseInt(x));
}


function hideNewNoteMenu(){
	$("#make-note").slideUp("slow");
}

function showNewNoteMenu(){
	$("#make-note").slideDown("slow");
}

function clickOnElement(class_name){
	var target = document.activeElement;
		console.log("target",target);
		var cl = $(target).attr("class");
		console.log(cl);
		var clickOnEl;
		clickOnEl = cl&&cl.indexOf(class_name)!=-1;
		return clickOnEl;
}

//check for focus in note area
$(document).on("focus",".note-area",function(e){
	console.log("note focused");
	hideNewNoteMenu();
});



//check for command save click on note
$(document).on("keydown",".note-area",function (e){
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 83 && clickOnElement("note-area")) { /*ctrl+s or command+s*/
        showNewNoteMenu();
        e.preventDefault();
        $(".note-area").each(function(){
        	this.blur();
        });
    }
});

$(document).on("blur",".note-area",function(e){
	setTimeout(function(){
	if(e.type == 'focusout' && !clickOnElement("note-area")){
		showNewNoteMenu();
	}},2);
});

$(document).on("keypress",".cb-ta",function(e) {
    if(e.which == 13) {
        e.preventDefault();
        returnKeyPressOnCheckBox(e);
    }
});
/*
$("input[type='checkbox']").on("change",function(){
	$(this).focus();
});
*/
	//texarea autoresize
	$(document).on("focus","textarea",function(){
		//console.log("focus");
		autosize($('textarea'));
	});

	$("#make-note").on("focus",function(){
		createNote();
	});

	$((function(){
		$("#i1").click(function(){
			$("#i1").animate({type:"text",width:"500px",height:"30px"},500);
		});
		$("#i1").blur(function(){
			$("#i1").animate({type:"text",width:"300px",height:"30px"},500);
		});

	}));