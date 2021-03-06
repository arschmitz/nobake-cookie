/*! Cookie.js | (c) Alexander Schmitz | https://raw.githubusercontent.com/arschmitz/cookie/master/LICENSE */
// JavaScript Document
(function( window, undefined ) {
var extend = function(obj,extObj) {
	//if more then 2 arguments passed combine into target object (first)
  	if(arguments.length > 2){
		for(var a = 1; a < arguments.length; a++){
			//make recursive call with only to arguments to combine these 
			extend(obj,arguments[a]);
		}	
	} else {
		//combine 2 objects
		for(var i in extObj){
			obj[i] = extObj[i];
		}
	}
	//return target object
	return obj;
};
//make local copy	
var cookie = function(key, value, options) {
         // if key and value are given set cookie (deleteing and setting cookie are the same)
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = extend({}, options);
			//if value is null set expires to a past date to delete it
            if (value === null || value === undefined) {
                options.expires = -1;
            }
			//if expires is provided caclulate date
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
			//make sure value is a string
            value = String(value);
			//set cookie with options
            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // if just a key or key and options passed retreive cookie.
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
		//loop through current cookies
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			//check if the cookie is the one we are looking for if so return value
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
      };
//asign to global
window.cookie = cookie;

})( window );
