# Gargantua

## Purpose :

* Receive logs from any tool on any PC.

## Run it :

~~~ bash
npm install
npm start
~~~

## Send POST with :

~~~ bash
curl --data "field1=bla&field2=foo" http://localhost:8000/push
~~~

## Check collection content with :

~~~ bash
mongo <<EOF
db.gargantua.find()
EOF
~~~

## Tests with mocha, Selenium and PhantomJS

Setup :

~~~ bash
mkdir webdriverio-test && cd webdriverio-test
curl -O http://selenium-release.storage.googleapis.com/2.52/selenium-server-standalone-2.52.0.jar
~~~

Run Selenium server :

~~~ bash
PATH=$PATH:node_modules/phantomjs-prebuilt/bin/ java -jar webdriverio-test/selenium-server-standalone-2.52.0.jar
~~~

or simply :

~~~ bash
npm run-script serveSelenium
~~~

Run Test :

~~~ bash
npm test
~~~
