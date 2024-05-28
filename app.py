# from flask import Flask, render_template

# app = Flask(__name__)

# @app.route('/login')
# def login():
#     return render_template('login.html')

# @app.route('/signup')
# def signup():
#     return render_template('signup.html')

from flask import Flask
from flask_mysqldb import MySQL  # CORRECTION: Import MySQL
from flask_bcrypt import Bcrypt  # CORRECTION: Import Bcrypt
from flask_login import LoginManager  # CORRECTION: Import LoginManager
from config import Config 

app = Flask(__name__)
app.config.from_object(Config)

# Configuration for Flask extensions (example)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'victoria'
app.config['MYSQL_PASSWORD'] = 'M3d3asin3'
app.config['MYSQL_DB'] = 'booklocker'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from app import routes  # CORRECTION: Ensure routes are imported after creating app and extensions

if __name__ == '__main__':
    app.run(debug=True)

