## [gRPC with NoSQl(MongoDB)](https://github.com/Rehan-Sattar/Ultimate-Todo-Application/tree/master/grpc-p1-s3/nosql)

### Clone
```
git clone https://github.com/Rehan-Sattar/Ultimate-Todo-Application/
cd /Ultimate-Todo-Application/grpc-p1-s3

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
node grpcclienttest.js insert 1 "Ultimate Todo Part 4" "writing code  part 4 of ultimate todo App"
node grpcclienttest.js update 1 "Ultimate Todo Part 5" "writing code and developing part 4 of ultimate todo App"
node grpcclienttest.js get 1
node grpcclienttest.js delete 1

```

### API 

API Crud operation  app.js: 

| endpoint | HTTP | Description |
| ------------- | ------ | ------------- |
| /todo/api/v1.0/tasks     | GET | GET all todos |
| /todo/api/v1.0/tasks/:id | GET | GET one todo |
| /todo/api/v1.0/tasks/add | POST | Add new todo |
| /todo/api/v1.0/tasks/edit/:id | PUT | Edit existing todo |
| /todo/api/v1.0/tasks/delete/:id | DELETE | Delete existing todo |

#### Progress
- [x] gRPC
- [x] Mongodb
- [x] List All
- [x] Insert
- [x] Get
- [x] Update
- [x] Delete