(function($) {
	
	"use strict";

	window.Immediate.Main = window.Immediate.Main || {}

	Immediate.MainViewModel = function() {

		var _init = function() {
			$('#col1').append("Private MVM function.")
		};

		return {
			init: function() {
				_init();
			}
		}

	};

}(jQuery));