from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, DateField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length
from flask_wtf.file import FileField, FileAllowed

class RegisterForm(FlaskForm):
    name = StringField('Nome', validators=[DataRequired(), Length(max=100)])  # Nome completo do usuário (obrigatório, até 100 caracteres)
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=120)])  # Email válido e único (obrigatório, até 120 caracteres)
    date = DateField('Data de Nascimento', format='%Y-%m-%d', validators=[DataRequired()])  # Data de nascimento (obrigatória, formato AAAA-MM-DD)
    password = PasswordField('Senha', validators=[DataRequired(), Length(min=6, max=128)])  # Senha (obrigatória, entre 6 e 128 caracteres)
    confirm_password = PasswordField('Confirmar Senha', validators=[DataRequired(), EqualTo('password')])  # Confirmação da senha (deve ser igual à senha)
    submit = SubmitField('Cadastrar')  # Botão para enviar o formulário


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=120)])  # Email do usuário
    password = PasswordField('Senha', validators=[DataRequired(), Length(min=6, max=128)])  # Senha do usuário
    submit = SubmitField('Entrar')  # Botão para enviar o formulário

class EditUserForm(FlaskForm):
    name = StringField('Nome', validators=[DataRequired(), Length(max=100)])  # Nome atualizado
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=120)])  # Email atualizado
    date = DateField('Data de Nascimento', format='%Y-%m-%d', validators=[DataRequired()])  # Nova data de nascimento
    profile_pic = FileField('Foto de Perfil', validators=[FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Apenas imagens!')])
    submit = SubmitField('Salvar Alterações')  # Botão para enviar as alterações