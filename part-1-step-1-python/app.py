from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
# from pymongo import MongoClient # Database connector

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'todo'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/todo'

 #Configure the connection to the database


mongo = PyMongo(app) 
todo=mongo.db.task    # for selecting collection in todo databases
#home page
@app.route('/')
def home():
    return '''
    <h1>TO DO APP</h1>
    <h2>Welcome</h2>
     '''
#Getting All task in DB
@app.route('/api/v.1.0', methods=['GET'] )
def get_allTask():

    data = []

    for t in todo.find():
        data.append({'id':t['id'],'name': t['name'] ,'done': t['done'] ,'priority': t['priority'] ,'description': t['description']})
    return jsonify({'task': data})

# search an specific with ID
@app.route('/api/v.1.0/<int:id>' , methods=['GET'])
def search(id):
    query=mongo.db.task.find_one({'id':id})
    if query:
        output=[{'id':query['id'],'name':query['name'],'done':query['done'],'priority':query['priority'],'description':query['description']}]
        return jsonify({'results':output})
    else:
        return jsonify({'results':'no result found with {}'.format(id)})



# Inserting new data
@app.route('/api/v.1.0' , methods=['POST'])
def add_data():

    id=request.json['id']
    name=request.json['name']

    done = request.json['done']
    priority = request.json['priority']
    desc = request.json['description']
    add_id=todo.insert({'id':id,'name':name,'done':done,'priority':priority,'description': desc})
    new_data=todo.find_one({'_id':add_id})

    output = {'name': new_data['name'], 'done': new_data['done'], 'priority': new_data['priority'], 'desc': new_data['desc']}
    return jsonify({'results': output})


@app.route('/api/v.1.0/<id>', methods=['PUT'])
def update_data(id):
    # dict_update={'id':request.json['id'],'name':request.json['name'], 'done':request.json['done'],'priority':request.json['priority'],'description':request.json['description']}
    # mongo.db.task.update({'id':id},{'$set':dict_update})
    # return 'done'
    find =mongo.db.task.find_one({'id':id})

    if find is not None:
        find["name"]=request.json["name"]
        find["description"]= request.json["description"]
        find["done"]= request.json["done"]
        find["priority"]= request.json["priority"]
        mongo.db.task.save(find)
        return 'done'
    else:
        return 'cant done'

    # id=request.json['id']
    # name = request.json['name']
    # desc = request.json['description']
    # done = request.json['done']
    # pr = request.json['priority']
    # mongo.db.task.update({'id':id}, {'$set': {'name':name,'done': done, 'priority': pr,'description':desc}})

#
# all completed task
@app.route('/api/v.1.0/completed')
def complete():
    data = []
    task=todo.find({"done":"yes"})

    for t in task :
            data.append({'id':t['id'],'name': t['name'], 'done': t['done'], 'priority': t['priority'], 'description': t['desc']})
    if data:
        return jsonify({'Completed Task': data})

    else:
        return jsonify({'results':'No task completed yet'})

# get all incompleted task
@app.route('/api/v.1.0/uncompleted')
def uncomplete():
    data = []
    task=todo.find({"done":"no"})

    for t in task :
        data.append({'id':t['id'],'name': t['name'], 'done': t['done'], 'priority': t['priority'], 'description': t['description']})
    if data:
        return jsonify({'incomplete Task': data})

    else:
        return jsonify({'results':'No task incomplete Found'})

# Deleting a specific data with id
@app.route('/api/v.1.0/<int:id>', methods=['DELETE'])
def removed(id):
    s=mongo.db.task.find_one({'id':id})

    if s:
        mongo.db.task.remove({'id':id})
        return 'record deleted'
    else:
        return 'No record found'











if __name__ == '__main__':
    app.run(debug=True)
