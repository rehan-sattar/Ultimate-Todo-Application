import os


tests = """
# getting all task
curl -i http://127.0.0.1:5000/api/v.1.0

# geting specific task by ID 1
curl -i http://127.0.0.1:5000/api/v.1.0/1

#checking non-existing task
curl -i http://127.0.0.1:5000/api/v.1.0/5

#add new task
curl -X POST -H "Content-Type: application/json" -d   "{""id"":4, ""name"": ""testing"",""done"": ""yes"",""priority"": ""high"",""desc"":""new task""}" http://127.0.0.1:5000/api/v.1.0

# err: edit non-existing item
curl -i -H "Content-Type: application/json" -X PUT -d '{\"name \": \"testing\",\"done\ ": \"yes\",\"priority\ ": \"high\ ",\"desc\":\"new task\ "}' http://127.0.0.1:5000/api/v.1.0/5

 # edit existing item
curl -i -H "Content-Type: application/json" -X PUT -d "{""name"": ""testing"",""done"": ""yes"",""priority"": ""high"",""desc"":""new task""}" http://127.0.0.1:5000/api/v.1.0/1
 
#Deleting Task
curl -i -H "Content-Type: application/json" -X DELETE http://127.0.0.1:5000/api/v.1.0/2
 #err: Deleting non-existing task
curl -i -H "Content-Type: application/json" -X DELETE http://127.0.0.1:5000/api/v.1.0/2





"""

for line in tests.strip().split('\n'):
    print('\n{}'.format(line))
    if not line.startswith('#'):
        cmd = line.strip()
        os.system(cmd)
