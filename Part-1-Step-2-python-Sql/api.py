from flask import Flask, request , jsonify , json
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://idusujkn:T33CoBDMHG4sV9hAV-sBoVkVavKfOlB-@stampy.db.elephantsql.com:5432/idusujkn'
#app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
db =SQLAlchemy(app)


class todoApi(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(20))
    done=db.Column(db.Boolean)
db.create_all()

@app.route('/')
def index():
    return '<h1>ToDo Api</h1>'

@app.route('/todo/api/v1.0/tasks')
def show_tasks():
    tasks = todoApi.query.all()
    if tasks:
        view=[]
        for task in tasks:
            task_list={}
            task_list['id']=task.id
            task_list['title']=task.title
            task_list['done'] = task.done
            view.append(task_list)
        return jsonify({'task':view})
    else:
        return jsonify({'results': 'no tasks found'})

@app.route('/todo/api/v1.0/tasks/<int:id>')
def show_single_id(id):
    task=todoApi.query.filter_by(id=int(id)).first()
    if task:
        taskItem={}
        taskItem['id']=task.id
        taskItem['title']=task.title
        taskItem['done']=task.done
        return jsonify(taskItem)
    else:
        return jsonify({'prompt':'No Task Found'})

@app.route('/todo/api/v1.0/tasks/add', methods=['POST'])
def add():
    add=request.get_json()
    task= todoApi(title=add['title'], done=True)
    db.session.add(task)
    db.session.commit()
    return jsonify({'prompt':'Task added'})


@app.route('/todo/api/v1.0/tasks/delete/<int:id>', methods=['DELETE'])
def delete(id):
    task=todoApi.query.filter_by(id=int(id)).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'prompt':'Task Deleted'})
    else:
        return jsonify({'prompt':'No Task Found'})

@app.route('/todo/api/v1.0/tasks/update/<id>', methods=['PUT'])
def update(id):
    task=todoApi.query.filter_by(id=id).first()
    if not task:
        return jsonify({'prompt':'No task Found'})
    else:
        update2=request.get_json()
        task.done=True
        task.title=update2['title']

        updateTask={'id':task.id}
        updateTask['title']=task.title
        updateTask['done']=task.done
        db.session.commit()
        return jsonify({'prompt':'Task Updated'})

app.run(debug=True)

