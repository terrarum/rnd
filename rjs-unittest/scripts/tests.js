require.config({
    paths: {
        jquery: 'lib/jquery-1.11.0'
    },
    shim: {
    	QUnit: {
    		exports: 'QUnit',
    		init: function() {
    			QUnit.config.autoload = false;
				QUnit.config.autostart = false;
    		}
    	}
    }
});

requirejs(['tests/mainViewModelTests'], function(mainViewModelTests) {
	mainViewModelTests.run();
	QUnit.load();
    QUnit.start();
})