# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'victoria'
    MYSQL_PASSWORD = 'M3d3asin3'
    MYSQL_DB = 'booklocker'
    MYSQL_CURSORCLASS = 'DictCursor'
