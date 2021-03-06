/*=============================================================================
#     FileName: common.js
#         Desc: 
#       Author: Aizhiyuan
#        Email: aizhiyuan@meepotech.com
#     HomePage: 
#      Version: 0.0.1
#   LastChange: 2013-9-17 09:26:30
#      History:
=============================================================================*/
//global variable
var invalid_letters = /[:"\<\>\\\/\?\*\|]/;
var valid_int = /^\d+$/;
var LANG = "&locale=zh_CN";
var ajax_timeout = 120000; // 2mins

//trim routine
function LTrim(str){
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(i,str.length);
    return str;
}

function RTrim(str){
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(0,i+1);
    return str;
}

function Trim(str){
    return LTrim(RTrim(str));
}

String.format = function(src){
    if (arguments.length === 0) 
        return null; 
		 
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < args.length; ++i)
        args[i] = encodeURIComponent(args[i]);
    
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

function stringThumbnail(str,maxLength){
	var curMaxLength = maxLength ? maxLength : strMaxLength;
	if(str.length > curMaxLength)
		return str.substr(0,curMaxLength-3)+'...';
	else
		return str;
}

String.denoise = function(str){
    if(str === null || typeof str === 'undefined')
        return '';
    else
        return str;
}

function minVal(first,second){
	return first < second ? first : second;
}

function formatFileSize(bytes){
    if (typeof bytes !== 'number')
        return '';

    if (bytes >= 1000000000)
        return (bytes / 1000000000).toFixed(2) + ' GB';

    if (bytes >= 1000000)
        return (bytes / 1000000).toFixed(2) + ' MB';

    return (bytes / 1000).toFixed(2) + ' KB';
}

function check_error(data){
    var error_data = eval("(" + data.responseText + ")");
    
    if(error_data.code == ERRORCODE.TOKEN_INVALID){
        sessionStorage.clear();
        localStorage.clear();
        self.location.href = "/";
    }
}
function request(url,data,method,callback,loading){
    var loadFunc = loading ? loading : null;
	$.ajax({
		url:url + LANG,
        timeout: ajax_timeout,
		data:data,
		type:method,
		contentType:"application/json; charset=utf-8",
		success: callback,
        beforeSend: loading,
		error: callback,
		dataType:"json"
	});
}

function requestSync(url,data,method,callback){
	$.ajax({
		url:url + LANG,
        timeout: ajax_timeout,
		data:data,
		type:method,
		async:false,
		contentType:"application/json; charset=utf-8",
		success: callback,
		error: callback,
		dataType:"json"
	});
}
