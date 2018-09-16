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
    return 'ToDo Api'

@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def show_tasks():
    tasks = todoApi.query.all()
    view=[]
    for task in tasks:
        task_list={}
        task_list['id']=task.id
        task_list['title']=task.title
        task_list['done'] = task.done
        view.append(task_list)
    return jsonify({'task':view})


@app.route('/todo/api/v1.0/tasks/add', methods=['POST'])
def add():
    add = request.get_json()
    newTask=todoApi(title=new['title'],
                    done=True)
    db.session.add(newTask)
    db.session.commit()
    return('Task added successfully')
    return jsonify({'prompt':'Added'})



@app.route('/todo/api/v1.0/tasks/delete/<int:id>', methods=['DELETE'])
def delete(id):
    views=todoApi.query.filter_by(id=id).first()
    db.session.delete(views)
    db.session.commit()
    return jsonify({'task':'deleted'})
    return ('Task Removed Successfully')


app.run(debug=True)

