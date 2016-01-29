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
