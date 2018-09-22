## [gRPC with SQl (PostgresDB)](https://github.com/Rehan-Sattar/Ultimate-Todo-Application/tree/master/grpc-p1-s3/sql)

### Clone
```
git clone https://github.com/Rehan-Sattar/Ultimate-Todo-Application/

cd /Ultimate-Todo-Application/grpc-p1-s3/sql

npm install
```

### Run Server
```
node src/server.js

```
### Run Client
```
node app.js

```
### Run Test
```
node grpcclienttest.js list
node grpcclienttest.js insert "Ultimate Todo Part 4" "writing code  part 4 of ultimate todo App"
node grpcclienttest.js update 1 "Ultimate Todo Part 5" "writing code and developing part 4 of ultimate todo App"
node grpcclienttest.js get 1
node grpcclienttest.js delete 1

```

#### Progress
- [x] gRPC
- [x] PostgresDB
- [x] List All
- [x] Insert
- [x] Get
- [x] Update
- [x] Delete

