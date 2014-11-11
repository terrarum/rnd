(function($) {
	$(function() {
		console.log("DOM ready");

		var $modal = $('.js-node-modal');
		var $title = $($modal.find('.js-node-title'));
		var $body = $($modal.find('.js-node-body'));
		var $activeNode = null;

		// Show modal and copy node content into it.
		var createNodeModal = function($node) {
			$activeNode = $node;
			$title.val($node.children('.grid-node-title').text());
			$body.text($node.children('.grid-node-body').text());

			$modal.show();
		}

		// Save button.
		$('.js-node-modal .js-button-save').on('click', function() {
			// Copy modal text to node.
			$activeNode.children('.grid-node-title').text($title.val());
			$activeNode.children('.grid-node-body').text($body.val());

			// Clear modal.
			$title.val('');
			$body.text('');

			refreshConnections($activeNode);
			$activeNode = null;
			$('.js-node-modal').hide();
		});

		var refreshConnections = function($node) {
			jsPlumb.detachAllConnections($activeNode);
			var bodyText = $node.children('.grid-node-body').text();
			var pageRefs = getPageReferences(bodyText);
			var pageNames = getCurrentNodeNames();

			var refsWithNoPage = [];
			var refsWithPage = [];
			var pagesWithNoRef = [];

			// Loop through page refs.
			for (var i = 0; i < pageRefs.length; i++) {

				var ref = pageRefs[i];

				// Loop through page names.
				for (var j = 0; j < pageNames.length; j++) {

					var name = pageNames[j];

					if (ref == name) {
						refsWithPage.push(ref);
						delete pageRefs[i];
						delete pageNames[j];
					}
				}
			}

			refsWithNoPage = pageRefs;
			pagesWithNoRef = pageNames;

			for (var k = 0; k < refsWithPage.length; k++) {
				var to = getNodeIdByName(refsWithPage[k]);
				connectNodes($node.attr('id'), getNodeIdByName(refsWithPage[k]));
			}
		}

		var getNodeIdByName = function(name) {
			var id = '';
			$('.js-grid-node').each(function() {
				if ($(this).children('.grid-node-title').text() == name) {
					id = $(this).attr('id');
				}
			})
			return id;	
		}

		// Pass in node IDs.
		var connectNodes = function(from, to) {
			jsPlumb.connect({
				source: from,
				target: to,
				anchor: dynamicAnchors,
				connector: 'Straight'
			});
		};

		var getCurrentNodeNames = function() {
			var pageNames = [];
			$('.js-grid-node').each(function() {
				pageNames.push($(this).children('.grid-node-title').text());
			});

			return pageNames;
		}

		var getPageReferences = function(text) {
			var regex = /\[\[(.*?)\]\]/gm; // Find all text inside double square backets.

			var refs = [];

			var result = regex.exec(text);
			while (result !== null) {
				refs.push(result[1]);
				result = regex.exec(text);
			}
	
			return refs;
		}

		// Cancel button.
		$('.js-node-modal .js-button-cancel').on('click', function() {
			$title.val('');
			$body.text('');

			$activeNode = null;
			$('.js-node-modal').hide();
		});		

		// Create node on double-click.
		$('.js-grid').on('dblclick', function(ev) {
			var mouseX = ev.pageX;
			var mouseY = ev.pageY;

			createNode(mouseX, mouseY);
		});

		// Edit node on click.
		$('.js-grid').on('dblclick', '.js-grid-node', function(ev) {
			ev.stopPropagation();
			if (!$(this).hasClass('jsplumb-drag')) {
				createNodeModal($(this));
			}
		});

		var dynamicAnchors = ["Right", "Left", "Top", "Bottom",
		 "TopRight", "TopLeft", "BottomRight", "BottomLeft"];

		// var lastNode = null;
		var createNode = function(x, y) {
			var node = $('<div/>')
				.append('<div class="grid-node-title"/>')
				.append('<div class="grid-node-body"/>')
				.addClass('grid-node js-grid-node')
				.offset({left: x - 75, top: y - 50});

			$('.js-grid').append(node);
			jsPlumb.draggable(node, {
			   containment: true
			});

			// if (lastNode !== null) {
			// 	jsPlumb.connect({
			// 		source: lastNode.attr('id'),
			// 		target: node.attr('id'),
			// 		anchor: dynamicAnchors,
			// 		connector: 'Straight'
			// 	});
			// }

			$('.js-node-list').append(node.attr('id') + '<br>');

			node.children('.grid-node-title').text(node.attr('id'));
			node.children('.grid-node-body').text("");

			createNodeModal(node);
			// lastNode = node;
		};

		jsPlumb.ready(function() {
			jsPlumb.setContainer($('.js-grid'));
		});

	})
})(jQuery)