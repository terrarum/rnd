"use strict";
define(['src/viewmodels/mainViewModel'], function(main) {
	var run = function() {
		module('mainViewModel');
		test('Adder.', 2, function() {
			strictEqual(main.adder(5, 5), 10, '5 + 5 should equal 10.');
			strictEqual(main.adder(-5, 5), 0, '-5 + 5 should equal 0.');
		});
		test('Subtractor.', 2, function() {
			strictEqual(main.subtractor(5, 5), 0, '5 - 5 should equal 0.');
			strictEqual(main.subtractor(-5, 5), -10, '-5 - 5 should equal -10.');
		});
		test('Divider.', 2, function() {
			strictEqual(main.divider(5, 5), 1, '5 / 5 should equal 1.');
			strictEqual(main.divider(20, 5), 4, '20 / 5 should equal 4.');
		});
	}
	return {run: run}
})