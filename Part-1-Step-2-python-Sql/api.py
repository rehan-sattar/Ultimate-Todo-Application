from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://idusujkn:T33CoBDMHG4sV9hAV-sBoVkVavKfOlB-@stampy.db.elephantsql.com:5432/idusujkn'
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
def tasks():
    task=db.get_all()
    if not task:
        return "no tasks yet"
    else:
        return task

@app.route('/TODO/api/v1.0/tasks/add', methods=['POST'])
def add_task():
    new=request.get_json()
    newTask=todoApi(title=new['title'],
                    done=True)
    db.session.new(newTask)
    db.session.commit()
    return('Task added successfully')

@app.route('/TODO/api/v1.0/tasks/remove/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    db.remove_task(task_id)
    return ('Task Removed Successfully')


app.run(debug=True)

