# Basic example of Mongo with Express

Basic example of a CRUD application using purely Express and Mongo

## Pre-requisites

- [Install Mongo](https://docs.mongodb.org/v3.0/installation/)
- Run Mongo with the command: `mongod`
- Install package dependencies by running the command: `npm install`

## Know Issues

In case you face issues while running Mongo, see this [gist](https://gist.github.com/adamgibbons/cc7b263ab3d52924d83b) to make it run properly

## Basic Explanation

The Express server is pointing to a DB called `test` under the following url: `mongod://localhost:27017` which is the default url where Mongo runs, you don't need to create this DB, because in case this DB does not exist, Mongo will create it.

There are 2 routes configured:

- Get collection: `GET /:collection` --> which is the one that return a table with the documents found in this collection, ex: `GET http://localhost:3000/msgs` will return a table with the documents found under the collection: `msgs`
- Post collection: `POST /:collection` --> which is the one that save a new document inside a collection, ex: `POST http://localhost:3000/msgs --data {"msg":"Hello"}` will save a new document under the collection `msgs`

## Examples

Let-s use `curl` to test the server. First, you need to start mongo using the command: `mongod` and then run the server using the command: `node server.js` which is going to run a server under the port 3000. then let's user curl to save a record:

```
curl --data '{"msg":"Hello World"}' --header "Content-Type:application/json" http://localhost:3000/msgs
```

By running this you will save a new `msg` into MongoDB, the server will respond with something similar to this:

```
{"ok":1,"n":1}
```

Then let's see if this works, now let's fetch the data with the command:

```
curl http://localhost:3000/msgs
```

This command will return a table with the data arranged inside that table:

``` html
<table border="1">
  <tr>
    <td>_id</td><td>5671abd9e37593560f7badbb</td>
    <td>msg</td><td>Hello World</td>
  </tr>
</table>
```

## Thanks

I hope this basic example have helped you guys, see you :). please follow me on [Twitter](https://twitter.com/bartsis)
