	var count = 0;
	var yellow = "ffbb37";
	var green = "97c800";
	var blue = "009eea";
	var pink = "ffccff";
	var black = "cccccc";
	var arr = [yellow,green,blue,pink,black];

	function randomElement(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}

	function createNote(){
		//var htmlString = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><span height = '450px' style='background-color: blue'></span>";
		var color = randomElement(arr);
		var highestDiv = $("#myspace");
		var del = $('<input type = "image" class = "note_menu" id = "dl'+count+'" src = "icons/delete.png" height="20px" />');
		var checkbox = $('<input type = "image" class = "note_menu" id = "cb'+count+'" src = "icons/check-box.png" height="20px" />');
		var addElement = $('<textarea />',{
			id:"ta"+count,
			placeholder: "Type here..",
			rows:1,
			cols:30,
			style: "border:0px;height:100%;width:100%"
		});
		var radiobutton = $('<input type = "image" class = "note_menu" id = "rb'+count+'" src = "icons/radio-button.png" height="20px"/>');
		var another_div = $('<div />',{
			class: "random",
			id: 'mydiv'+count,
			style: "padding-left:10px;padding-top:10px;display:inline-block"
		});
		var div = $('<div />',{
			id:""+count,
			style: "background-color: #"+color+";padding-top:50px;padding-left:10px;padding-right:10px;padding-bottom:30px;display:inline-block",
		});
		var content_div = $('<div />',{
			id:"content"+count,
			style: "background-color:transparent;display:inline-block"
		});
		var br = $('<br/>');
		highestDiv.sortable({
			tolerance:"intersect"
		});
		highestDiv.disableSelection(); 
		
		addElement.appendTo(content_div);
		content_div.appendTo(div);
		br.appendTo(div);
		del.appendTo(div);
		checkbox.appendTo(div);
		radiobutton.appendTo(div);
		div.appendTo(another_div);
		another_div.appendTo($("#myspace"));
		count++;
	}


	$(document).on('click', '.note_menu', function(event) {
		var count = $(this).closest("div").attr("id");
		var el = $(this).attr("id");
		var addElement,label;
		//var color = $("#"+count).css("background-color");
		if(el.indexOf("dl"+count)!=-1)$("#mydiv"+count).remove();
		else if(el.indexOf("rb"+count)!=-1){
			$("#content"+count).empty();
			var elDiv = $('<div />',{
				id:"rb"+count,
				style: "background-color: transparent;display:inline-block"
			});
			addElement = $('<input type = "radio" />',{
			});
			
			label=$('<textarea />',{
				id : "ah-rb"+count,
				placeholder: "Type here..",
				rows:1,
				cols:30
			});
			//$('#content'+count).attr(display,"inline-block");
			addElement.appendTo(elDiv);
			label.appendTo(elDiv);
			elDiv.appendTo($("#content"+count));
		}
		else if(el.indexOf("cb"+count)!=-1){
			$("#content"+count).empty();
			var elDiv = $('<div />',{
				id:"cb"+count,
				style: "background-color: transparent;display:inline-block"
			});
			addElement = $('<input type="checkbox" />',{
			});
			
			label=$('<textarea/>',{
				id : "ah-cb"+count,
				placeholder: "Type here..",
				rows:1,
				cols:30
			});
			addElement.appendTo(elDiv);
			label.appendTo(elDiv);
			elDiv.appendTo($("#content"+count));
		}

	}); 


	//texarea autoresize
	$(document).on("keyup","textarea",function(){
		var error_correction = 3.8;
		var x = this.scrollHeight;
		var h = $(this).height();
		var y = this.scrollHeight;
		//console.log(x,h,y);
		if(x-h>10)$(this).animate({height:this.scrollHeight-error_correction},10);
		//console.log($(this).height());
	});

	$((function(){
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
	}));