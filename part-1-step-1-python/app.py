from flask import Flask ,request,jsonify,abort
import json
from flask_pymongo import PyMongo
from flask_cors import CORS


app =Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME']='todo'
app.config['MONGO_URI'] = 'mongodb://todo:osama123@ds157742.mlab.com:57742/todo'

mongo = PyMongo(app)
todo=mongo.db.task    # for selecting collection in todo databases
#home page
@app.route('/')
def home():
    return '''
    <h1>TO DO APP</h1>
    <h2>Welcome</h2>
     '''

# Inserting new data
@app.route('/api/v.1.0' , methods=['POST'])
def add_data():

    if request.method=='GET' or request.method=='PUT' or request.method=='DELETE':
        abort(405)
    try:
        data=json.loads(request.data)
        add_id=todo.insert({'id':data['id'],'name':data['name'],'done':data['done'],'priority':data['priority'],'desc': data['desc']})
    except(KeyError,ValueError,TypeError) as e:
        return jsonify({"Error":"KeyError"})

    new_data=todo.find_one({'_id':add_id})
    if new_data:
        output = {'name': new_data['name'], 'done': new_data['done'], 'priority': new_data['priority'], 'desc': new_data['desc']}
        return jsonify({'results': output})
    else:
        return jsonify({'results': "failed"})




#Getting All task in DB
@app.route('/api/v.1.0', methods=['GET'] )
def get_allTask():
    if request.method == 'POST' or request.method == 'PUT' or request.method == 'DELETE':
        return abort(405)

    data = []

    for t in todo.find():
        data.append({'id':t['id'],'name': t['name'] ,'done': t['done'] ,'priority': t['priority'] ,'desc': t['desc']})
    if data:
        return jsonify({'task': data})


    return jsonify({'task':"No task found" })



@app.route('/api/v.1.0/<int:id>' , methods=['GET'])
def search(id):
    if request.method == 'POST' or request.method == 'PUT' or request.method == 'DELETE':
        return abort(405)

    query=todo.find_one({'id':id})
    if query:
        output=[{'id':query['id'],'name':query['name'],'done':query['done'],'priority':query['priority'],'description':query['desc']}]
        return jsonify({'results':output})
    else:
        return jsonify({'results':'no result found with {}'.format(id)})



@app.route('/api/v.1.0/<int:id>', methods=['PUT'])
def update_data(id):
    if request.method=='POST' or request.method=='GET':
        return abort(405)



    find=todo.find_one({"id":id})
    if find:
        #find['id']=request.json['id']
        find['name']=request.json['name']
        find['desc']= request.json['desc']
        find['done']= request.json['done']
        find['priority']= request.json['priority']
        mongo.db.task.save(find)
        return jsonify({"result": "success"})
    else:
        return jsonify({"result":'failed'})





# all completed task
@app.route('/api/v.1.0/completed', methods=['GET'])
def complete():
    if request.method=='POST' or request.method=='PUT' or request.method=='DELETE':
        return abort(405)

    data = []
    task=todo.find({"done":"yes"})

    for t in task :
            data.append({'id':t['id'],'name': t['name'], 'done': t['done'], 'priority': t['priority'], 'description': t['desc']})
    if data:
        return jsonify({'Completed Task': data})

    else:
        return jsonify({'results':'No task completed yet'})

# get all incompleted task
@app.route('/api/v.1.0/uncompleted', methods=['GET'])
def uncomplete():

    if request.method=='POST' or request.method=='PUT' or request.method=='DELETE':
        return abort(405)

    data = []
    task=todo.find({"done":"no"})

    for t in task :
        data.append({'id':t['id'],'name': t['name'], 'done': t['done'], 'priority': t['priority'], 'description': t['desc']})
    if data:
        return jsonify({'incomplete Task': data})

    else:
        return jsonify({'results':'No task incomplete Found'})

# Deleting a specific data with id
@app.route('/api/v.1.0/<int:id>', methods=[ 'DELETE'])
def removed(id):
    if request.method == 'POST' or request.method == 'PUT' or request.method == 'GET':
         return abort(405)

    s=todo.find_one({"id":id})

    if s:
        todo.remove({"id":id})
        return jsonify({'result':'record deleted'})
    else:
        return jsonify({'result': 'No record deleted'})



if __name__ == '__main__':
    app.run(debug=True)