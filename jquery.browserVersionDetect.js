/*
* author: blackbing@gamil.com
* version: 0.1
* date: 2011/01/24
* description: I am confused by browser version detection. What I need is blocking the browsers which are ie6/ie7/ff3 , however, I can't easily detect browser version. Cause I got the version which is like that "6.0.2900.5512.xpsp_sp3_gdr.100427-1636".
so I write an easy plugin to check the browser version and you can also use callback to block these kind of old fashion browser or do anything else.
 
 For example:
 $.detectBrowserVersion({
     filter: {
	         webkit: '535'
			     },
				     callback: function(){
					         alert('do you live in stone age?');
							     }
								 });
								 */
(function($) {

	$.detectBrowserVersion = function(opts) {
		var filter = opts && opts.filter ? opts.filter: {};
		var callback = opts && opts.callback ? opts.callback: null;
		//ready to set stubborn and ignore the setting
		var allcookies = document.cookie;
		var pos = allcookies.indexOf("stubborn=");
		if (pos != - 1) {
			var st = pos + 9;
			var end = allcookies.indexOf(";", st);
			if (end == - 1) {
				end = allcookies.length;
			}
			var value = allcookies.substring(st, end);
			value = decodeURIComponent(value);
			if (value == '1') {
				return false;
			}
		}
		//these above are ignore the detection
		//filtered browsers and lower version
		var filterBrowsers = {
			'msie': '7',
			'mozilla': '1.9.1'
		};
		filterBrowsers = $.extend(filterBrowsers, filter);
		var default_callback = function() {
			alert('you are using old fashion browser!!');
		};
		callback = callback || default_callback;
		var formatVersion = function(version) {
			//to string
			version += '';
			//get version number
			var versionReg = /[\d]+[\.\d]+/ig;
			var res = versionReg.exec(version);
			if (res && res.length) {
				version = res[0];
			}
			var sp = version.split('.');
			var re = sp[0] + '.';
			for (var i = 1; i < sp.length; i++) {
				re += sp[i];
			}
			return + re;
		};
		$.each($.browser, function(k, w) {
			var filterBrowser = formatVersion(filterBrowsers[k]);
			if ($.browser[k] && filterBrowser) {
				var v = formatVersion($.browser.version);
				if (v <= filterBrowser && callback) {
					//callback and do something
					callback();
				}
			}
		});

	};
})(jQuery);

