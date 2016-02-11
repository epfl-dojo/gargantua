var webdriverio = require('webdriverio'),
    assert      = require('assert'),
    options     = {
        desiredCapabilities: {
            browserName: 'phantomjs'  // 'firefox' or 'phantomjs'
        }
    };

describe('GET and POST requests', function(){
    this.timeout(15000);
    var client = {};

    before(function(done){
        client = webdriverio.remote(options);
        client
            .init()
            .call(done);
    });

    it('Respond to / GET', function(done){
        client
            .url('http://localhost:8000/')
            .getText("body").then(function(text){
                var data = JSON.parse(text);
                // console.log(JSON.stringify(data));
                assert.deepEqual(data, {statusCode: 404, error: "Not Found"});
            })
            .call(done);
    });

    after(function(done){
        client
            .end()
            .call(done);
    });
});
