# Gargantua

## Purpose :

* Receive logs from any tool on any PC.

## Run it :

~~~ bash
npm start
~~~

## Send POST with :

~~~ bash
curl --data "name=Dojo" http://localhost:8000/push
~~~

## Check collection content with :

~~~ bash
mongo <<EOF
db.logs.find()
EOF
~~~
