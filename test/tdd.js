var webdriverio = require('webdriverio'),
    assert      = require('assert'),
    options     = {
        desiredCapabilities: {
            browserName: 'phantomjs'  // 'firefox' or 'phantomjs'
        }
    };

describe('my webdriverio tests', function(){
    this.timeout(15000);
    var client = {};

    before(function(done){
            client = webdriverio.remote(options);
            client
                .init()
                .call(done);
    });

    it('Github test', function(done){
        client
            .url('https://github.com/')
            .getElementSize('.header-logo-wordmark', function(err, result){
                assert(err === undefined);
                assert(result.height === 26);
                assert(result.width  === 89);
            })
            .getTitle(function(err, title){
                assert(err === undefined);
                assert(title === 'GitHub · Where software is built');
            })
            .getCssProperty('a[href="/plans"]', 'color', function(err, result){
                assert(err === undefined);
                assert(result.value === 'rgba(64,120,192,1)');
            })
            .call(done);
    });

    after(function(done){
        client
            .end()
            .call(done);
    });
});
