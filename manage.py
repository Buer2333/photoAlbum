from flask.ext.script import Manager

from app import create_app

app = create_app('default')
manage = Manager(app)
app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'

if __name__ == '__main__':
    app.run(debug=True,port=7000)
