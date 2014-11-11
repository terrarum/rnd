(function($) {

	"use strict";

	window.Immediate.Main = window.Immediate.Main || {}

	$(function() {
		var main = new Immediate.MainViewModel()
		main.init();
	})

}(jQuery));