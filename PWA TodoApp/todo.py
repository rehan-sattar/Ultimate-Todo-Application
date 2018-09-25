from flask import Flask, request, render_template , redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
app=Flask(__name__)
app.secret_key='flash message'
Bootstrap(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://idusujkn:T33CoBDMHG4sV9hAV-sBoVkVavKfOlB-@stampy.db.elephantsql.com:5432/idusujkn'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///todolist.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)

class Todo(db.Model):
    id=db.Column(db.Integer , primary_key=True)
    text=db.Column(db.String(200))
    complete=db.Column(db.Boolean)
db.create_all()

@app.route('/')
def index():
    todos=Todo.query.all()
    return render_template('index.html', todos=todos)

@app.route('/add', methods=['POST'])
def add():
    if request.method == 'POST':
        flash('Task Added Successfully !!!')
        todo= Todo(text=request.form['todolist'], complete=False)
        db.session.add(todo)
        db.session.commit()
        return redirect(url_for('index'))

@app.route('/delete/<id>')
def delete(id):
    # this is the method of deleting a query ... finally got it
    flash('Task Deleted Successfully')
    todo=Todo.query.filter_by(id=int(id)).delete()
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/update/<id>')
def update(id):
    pass
    return redirect(url_for('index'))
    

@app.route('/reset/<complete>')
def reset(complete):
    flash('App Successfully Resets')
    todo=Todo.query.filter_by(complete=False).delete()
    db.session.commit()
    return redirect(url_for('index'))


if __name__== '__main__':
    app.run(debug=True)
