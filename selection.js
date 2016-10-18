$(document).ready(function() {
    $('body').append("<div id=\"ec-bubble\"><div id=\"ec-bubble-text\"></div></div>");

    $('body').click(function() {
    if (!$(this.target).is('#ec-bubble')){
        hideBubble();
    }
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
    var humanReadableDateUTC = convertTimestampUTC(text);
      showBubble(e, humanReadableDate + "<br/>" + humanReadableDateUTC);
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
  var finalTs = (ts.length > 10) ? ts * 1 : ts * 1000;
	var date = new Date(finalTs);
	var dateStr = "";

    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    dateStr += (d<=9?'0'+d:d)   + "/" +  (m<=9?'0'+m:m) + "/" + y + ", ";

    var h = date.getHours();
    var amPm = "AM";
    if(h > 12) {
      h  = h - 12;
      amPm = "PM";
    }
    if(h == 12) {
      amPm = "PM";
    }
    var mi = date.getMinutes();
    var s = date.getSeconds();
    var ms = "000000" + date.getMilliseconds();
    dateStr += (h<=9?'0'+h:h) + ":" + (mi<=9?'0'+mi:mi) + ":" + (s<=9?'0'+s:s) + "." + ms.slice(-3) + " " +  amPm;

	return dateStr + " IST";
}

function convertTimestampUTC(ts) {
  var finalTs = (ts.length > 10) ? ts * 1 : ts * 1000;
	var date = new Date(finalTs);
	var dateStr = "";

    var d = date.getUTCDate();
    var m = date.getUTCMonth()+1;
    var y = date.getUTCFullYear();
    dateStr += (d<=9?'0'+d:d)   + "/" +  (m<=9?'0'+m:m) + "/" + y + ", ";

    var h = date.getUTCHours();
    var amPm = "AM";
    if(h > 12) {
      h  = h - 12;
      amPm = "PM";
    }
    if(h == 12) {
      amPm = "PM";
    }
    var mi = date.getUTCMinutes();
    var s = date.getUTCSeconds();
    var ms = "000000" + date.getUTCMilliseconds();
    dateStr += (h<=9?'0'+h:h) + ":" + (mi<=9?'0'+mi:mi) + ":" + (s<=9?'0'+s:s) + "." + ms.slice(-3) + " " + amPm;

	return dateStr + " GMT";
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
