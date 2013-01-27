$(document).ready(function() {
    $('body').append("<div id=\"ec-bubble\"><div id=\"ec-bubble-text\"></div><div id=\"ec-bubble-close\"></div></div>");
    
    $('#ec-bubble-close').click(function() {
        hideBubble();
    });
    
	$(document).dblclick(function(e) {
		processSelection(e);
	});
	
	$(document).bind('mouseup', function(e) {
		processSelection(e);
	});

});

function processSelection(e) {	
    var text = getSelectedText();

    if ($.isNumeric(text)) {
		var humanReadableDate = convertTimestamp(text);
        showBubble(e, humanReadableDate);        
	}
}

function getSelectedText() {
	var text = "";
	
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
	
	return text;
}

function convertTimestamp(ts) {
	var date = new Date(ts * 1000);
	var dateStr = "";
    
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    dateStr += (m<=9?'0'+m:m) + "/" + (d<=9?'0'+d:d) + "/" + y + " - ";
  
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds(); 
    dateStr += (h<=9?'0'+h:h) + ":" + (mi<=9?'0'+mi:mi) + ":" + (s<=9?'0'+s:s);
    
	return dateStr;
}

function showBubble(e, text) {
    $('#ec-bubble').css('top', e.pageY + 20 + "px");
    $('#ec-bubble').css('left', e.pageX - 85 + "px");
    $('#ec-bubble-text').html(text);
    $('#ec-bubble').css('visibility', 'visible');
}

function hideBubble() {
    $('#ec-bubble').css('visibility', 'hidden');
    $('#ec-bubble-text').html("");
}


