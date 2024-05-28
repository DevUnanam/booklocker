from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('victoria')
app.config['MYSQL_PASSWORD'] = os.getenv('M3d3asin3')
app.config['MYSQL_DB'] = 'booklocker'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from app import routes
