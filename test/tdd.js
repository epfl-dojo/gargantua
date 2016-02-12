var webdriverio = require('webdriverio'),
    assert = require('assert'),
    options = {
        desiredCapabilities: {
            browserName: 'phantomjs'  // 'firefox' or 'phantomjs'
        }
    },
    request = require("request");

describe('GET and POST requests', function () {
    this.timeout(15000);
    var client = {};

    before(function (done) {
        client = webdriverio.remote(options);
        client
            .init()
            .call(done);
    });

    it('Respond html to / GET', function (done) {
        client
            .url('http://localhost:8000/')
            .getTitle().then(function (title) {
                assert.equal(title, "Home");
            })
            .getText("h1").then(function (text) {
                assert.equal(text, "Gargantua");
            })
            .call(done);
    });
    it('Respond JSON to /hello GET', function (done) {
        client
            .url('http://localhost:8000/hello')
            .getText("body").then(function (text) {
                var data = JSON.parse(text);
                // console.log(JSON.stringify(data));
                assert.deepEqual(data, {answer: "hello world"});
            })
            .call(done);
    });

    it('Respond JSON to /push POST', function (done) {
        client
            .url('http://localhost:8000/test')
            .setValue("input[name=field1]", "fooo")
            .setValue("input[name=field2]", "bar")
            .submitForm("#push1")
            .getText("body").then(function (text) {
                var data = JSON.parse(text);
                // console.log(JSON.stringify(data));
                assert.equal(data.field1, "fooo");
                assert.equal(data.field2, "bar");
                assert.equal(typeof(data._id), "string");
            })
            .call(done);
    });

    it('eats Bunyan', function (done) {
        // From https://github.com/trentm/node-bunyan
        var someBunyan = {
            "name": "myapp",
            "hostname": "tsf-452-wpa-6-020.epfl.ch",
            "pid": 42893,
            "level": 30,
            "msg": "hi",
            "time": "2016-02-12T12:50:55.675Z",
            "v": 0
        };

        // post someBunyan
        request.post({
            headers: {'content-type' : 'text/json'},
            url:     'http://localhost:8000/push',
            body:    JSON.stringify(someBunyan)
        }, function(error, response, body){
            assert.equal(error,null);
            done();
        });

    });

    it.only('should not eats Bad Bunyan with missing fields', function (done) {
        // From https://github.com/trentm/node-bunyan
        var someBunyan = {
        };

        // post someBunyan
        request.post({
            headers: {'content-type' : 'text/json'},
            url:     'http://localhost:8000/push',
            body:    JSON.stringify(someBunyan)
        }, function(error, response, body){
            assert.equal(error.code, 403);
            assert.deepEqual(JSON.parse(body), {"error": "malformed request"});
            done();
        });

    });

    after(function (done) {
        client
            .end()
            .call(done);
    });
});
