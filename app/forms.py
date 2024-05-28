# handling user authentication

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
    
    
#     # app/forms.py (add book form)
# class BookForm(FlaskForm):
#     title = StringField('Title', validators=[DataRequired()])
#     author = StringField('Author', validators=[DataRequired()])
#     publisher = StringField('Publisher')
#     description = StringField('Description')
#     price = StringField('Price', validators=[DataRequired()])
#     submit = SubmitField('Add Book')

# # app/routes.py (add book route)
# @app.route('/add_book', methods=['GET', 'POST'])
# def add_book():
#     form = BookForm()
#     if form.validate_on_submit():
#         cur = mysql.connection.cursor()
#         cur.execute("INSERT INTO books (title, author, publisher, description, price) VALUES (%s, %s, %s, %s, %s)",
#                     (form.title.data, form.author.data, form.publisher.data, form.description.data, form.price.data))
#         mysql.connection.commit()
#         cur.close()
#         flash('Book has been added!', 'success')
#         return redirect(url_for('home'))
#     return render_template('add_book.html', title='Add Book', form=form)

