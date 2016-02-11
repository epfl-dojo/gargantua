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

    it('Respond html to / GET', function(done){
        client
            .url('http://localhost:8000/')
            .getTitle().then(function(title){
                assert.equal(title, "Home");
            })
            .getText("h1").then(function(text){
                assert.equal(text, "Gargantua");
            })
            .call(done);
    });
    it('Respond JSON to /hello GET', function(done){
        client
            .url('http://localhost:8000/hello')
            .getText("body").then(function(text){
                var data = JSON.parse(text);
                // console.log(JSON.stringify(data));
                assert.deepEqual(data, {answer: "hello world"});
            })
            .call(done);
    });

    it('Respond JSON to /push POST', function(done){
        client
            .url('http://localhost:8000/test')
            .setValue("input[name=field1]", "fooo")
            .setValue("input[name=field2]", "bar")
            .submitForm("#push1")
            .getText("body").then(function(text){
                var data = JSON.parse(text);
                // console.log(JSON.stringify(data));
                assert.equal(data.field1, "fooo");
                assert.equal(data.field2, "bar");
                assert.equal(typeof(data._id), "string");
            })
            .call(done);
    })

    after(function(done){
        client
            .end()
            .call(done);
    });
});
