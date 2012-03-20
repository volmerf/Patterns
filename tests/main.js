require([
    'require',
    '../src/lib/dist/underscore',
    '../src/lib/jquery',
    // '../src/lib/order!./spec/inject',
    // '../src/lib/order!./spec/parser',
    // '../src/lib/order!./spec/collapsible',
    '../src/patterns',
    '../src/utils',
    './jasmine-settings',
    './spec/modal'
], function(require) {
    var load_modules = function(prefix, names, suffix) {
        prefix = prefix || '';
        suffix = suffix || '';
        var modules = _.reduce(names, function(acc, name) {
            acc[name] = require(prefix + name + suffix);
            return acc;
        }, {});
        return modules;
    };

    var patterns = require('../src/patterns'),
        specs = load_modules('./spec/', [
            'modal'
        ]);

    // a jquery local to the fixtures container will be passed to the specs
    var $$ = function(selector) {
        selector = selector || '';
        return $('#jasmine-fixtures ' + selector);
    };
    for (var name in specs) {
        var spec = specs[name];
        describe(name, function() {
            beforeEach(function() {
                loadFixtures(name + '.html');
                patterns.scan($$());
            });
            spec.describe($$);
        });
    };

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var reporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(reporter);

    jasmineEnv.specFilter = function(spec) {
        return reporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function() {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }
});
