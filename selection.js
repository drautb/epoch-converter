$(document).ready(function() {
    $('body').append('<div id=\"ec-bubble\"><pre id=\"ec-bubble-text\"></pre></div>');

    $(document).click(function() {
        hideBubble();
    });

    $('#ec-bubble').click(function() {
        event.stopPropagation();
    });
    
	$(document).dblclick(function(e) {
		processSelection(e);
	});
	
	$(document).bind('mouseup', function(e) {
		processSelection(e);
	});

});

function processSelection(e) {	
    let text = getSelectedText();

    if ($.isNumeric(text) && (text.length === 10 || text.length === 13)) {
		let humanReadableDate = convertTimestamp(text);
        showBubble(e, humanReadableDate);        
	}
}

function getSelectedText() {
	let text = "";
	
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != 'Control') {
        text = document.selection.createRange().text;
    }
	
	return text;
}

function convertTimestamp(ts) {
    ts = ts.length === 13 ? ts : ts * 1000;
	let date = new Date(ts).toString();
	let index = /\d+:\d+:\d+/.exec(date).index;
    return date.substring(0,index).trim()+"\n"+date.substring(index);
}

function showBubble(e, text) {
    $('#ec-bubble').css('top', e.pageY + 20 + 'px').css('left', e.pageX - 85 + 'px').css('visibility', 'visible');
    $('#ec-bubble-text').html(text);
}

function hideBubble() {
    $('#ec-bubble').css('visibility', 'hidden');
    $('#ec-bubble-text').html('');
}


