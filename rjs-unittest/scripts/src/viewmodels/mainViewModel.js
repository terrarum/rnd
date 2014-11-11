"use strict";
define(function() {

	var	_adder = function(a, b) {
		return a + b;
	}

	var _subtractor = function(a, b) {
		return a - b;
	}

	var _divider = function(a, b) {
		return a / b;
	}

	var _init = function() {
		$('#adderResult').append(_adder(4, 8));
		$('#subtractorResult').append(_subtractor(4, 8));
	};

	return {
		init: function() {
			_init();
		},
		adder: function(a, b) {
			return _adder(a, b);
		},
		subtractor: function(a, b) {
			return _subtractor(a, b);
		},
		divider: function(a, b) {
			return _divider(a, b);
		}
	}
})