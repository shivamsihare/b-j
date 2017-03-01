var count = 0;
	var yellow = "ffbb37";
	var green = "97c800";
	var blue = "009eea";
	var pink = "ffccff";
	var black = "cccccc";
	var arr = [yellow,green,blue,pink,black];
	var addElement;

	function randomElement(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}

	function createNote(){
		//var htmlString = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><span height = '450px' style='background-color: blue'></span>";
		var color = randomElement(arr);
		var image = $('<input type = "image" class = "note_menu" id = "dl'+count+'" src = "icons/delete.png" height="20px"  style="position:absolute;bottom:16px;left:50px"/>');
		var checkbox = $('<input type = "image" class = "note_menu" id = "cb'+count+'" src = "icons/check-box.png" height="20px" style="position:absolute;bottom:16px;left:100px"/>');
		addElement = $('<textarea />',{
			id:"ta"+count,
			placeholder: "Type here..",
			style: "background-color: #"+color+";border:0px;height:100%;width:100%"
		});
		var radiobutton = $('<input type = "image" class = "note_menu" id = "rb'+count+'" src = "icons/radio-button.png" height="20px"  style="position:absolute;bottom:16px;left:150px"/>');
		var another_div = $('<div />',{
			class: "col-xs-12 col-sm-6 col-md-4 col-lg-4",
			id: 'mydiv'+count,
		});
		var div = $('<div />',{
			id:""+count,
			style: "background-color: #"+color+";padding-left:20px;padding-right:10px;padding-bottom:50px;padding-top:60px;margin-left:10px;margin-top:10px;",
			height: 300
		});

		
		addElement.appendTo(div);
		image.appendTo(div);
		checkbox.appendTo(div);
		radiobutton.appendTo(div);
		div.appendTo(another_div);
		another_div.appendTo("#myspace");
		count++;
	}


	$(document).on('click', '.note_menu', function(event) {
		var count = $(this).closest("div").attr("id");
		var el = $(this).attr("id");
		var color = $("#"+count).css("background-color");
		if(el.indexOf("dl"+count)!=-1)$("#mydiv"+count).remove();
		else if(el.indexOf("rb"+count)!=-1){
			$("#ta"+count).remove();
			addElement = $('<input type="radio" />',{
			});
			var rb = $("#"+"ah-cb"+count);
			if(rb.length!=0)rb.remove();
			label=$('<textarea />',{
				id : "ah-rb"+count,
			placeholder: "Type here..",
			rows: 1,
			cols: "auto",
			width:"100%",
			style:"background-color:transparent;border:0px;vertical-align:middle"
			});
			addElement.appendTo($("#"+count));
			label.appendTo($("#"+count));
		}
		else if(el.indexOf("cb"+count)!=-1){
			$("#ta"+count).remove();
			addElement = $('<input type="checkbox" name = "None"/>',{
			text: "Hello I am shivam"
			});
			var rb = $("#"+"ah-rb"+count);
			if(rb.length!=0)rb.remove();
			label=$('<textarea />',{
				id:"ah-cb"+count,
			placeholder: "Type here..",
			rows: 1,
			cols: "auto",
			width:"100%",
			style:"background-color:transparent;border:0px;vertical-align:middle"
			});
			addElement.appendTo($("#"+count));
			label.appendTo($("#"+count));
		}

	}); 
	

	$(document).ready(function(){
		$("#t1").click(function(){
			$("#i1").animate({type:"text",width:"100%"},500);
			$("#i1").focus();
		})
		$("#i1").blur(function(){
			$("#i1").animate({width:"0px"},500);
			$("#i1").hide("slow");
		});
		$("#inew").click(function(){
			createNote();
		});
	});