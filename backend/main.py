from flask import Flask, render_template, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import (
    LoginManager, login_user, logout_user, login_required, current_user, UserMixin
)
import datetime
from models import db, Users
from forms import RegisterForm, LoginForm, EditUserForm
import os
from werkzeug.utils import secure_filename


app = Flask(__name__, template_folder='../FrontEnd/templates', static_folder='../FrontEnd/static')
app.config['SECRET_KEY'] = 'your_secret_key'  # Chave secreta para proteger sessões e cookies, deve ser alterada em produção
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Caminho do banco de dados SQLite utilizado pela aplicação
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desativa notificações de modificação do SQLAlchemy para melhor performance
app.config['UPLOAD_FOLDER'] = os.path.join(app.static_folder, 'profile_pics')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db.init_app(app)
bcrypt = Bcrypt(app)  # Inicializa a extensão Bcrypt para hash seguro de senhas
login_manager = LoginManager(app)  # Inicializa o gerenciador de login do Flask
login_manager.login_view = 'login'  # Define a rota de login padrão para usuários não autenticados
login_manager.login_message_category = 'info'  # Categoria da mensagem flash ao redirecionar para login

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    #valida o formulário, verifica se o e-mail já existe e salva o novo usuário com senha criptografada
    form = RegisterForm()
    if form.validate_on_submit():
        if (existing_user := Users.query.filter_by(email=form.email.data).first()):
            flash('Email já cadastrado.', 'danger')
            return redirect(url_for('register'))
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = Users(
            name=form.name.data,
            email=form.email.data,
            date=form.date.data,
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
        flash('Cadastro realizado com sucesso!', 'success')
        login_user(new_user)
        return redirect(url_for('index'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    #valida o formulário, verifica as credenciais e autentica o usuário
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Email ou senha inválidos.', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logout efetuado com sucesso.', 'info')
    return redirect(url_for('login'))

@app.route('/users', methods=['GET', 'POST'])
@login_required
def users():
    user = current_user
    form = EditUserForm(obj=user)
    if form.validate_on_submit():
        user.name = form.name.data
        user.email = form.email.data
        user.date = form.date.data
        # Upload da foto de perfil
        if form.profile_pic.data:
            filename = secure_filename(form.profile_pic.data.filename)
            pic_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            form.profile_pic.data.save(pic_path)
            user.profile_pic = f'profile_pics/{filename}'
        db.session.commit()
        flash('Dados atualizados com sucesso.', 'success')
        return redirect(url_for('users'))
    return render_template('users.html', form=form)

@app.route('/edit_user/<int:user_id>', methods=['GET', 'POST'])
@login_required
def edit_user(user_id):
    if user_id != current_user.id:
        flash('Você só pode editar seu próprio perfil.', 'danger')
        return redirect(url_for('users'))
    user = Users.query.get_or_404(user_id)
    form = EditUserForm(obj=user)
    if form.validate_on_submit():
        user.name = form.name.data
        user.email = form.email.data
        user.date = form.date.data
        db.session.commit()
        flash('Usuário atualizado com sucesso.', 'success')
        return redirect(url_for('users'))
    return render_template('edit_user.html', form=form, user=user)

@app.route('/delete_user/<int:user_id>', methods=['POST'])
@login_required
def delete_user(user_id):
    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash('Usuário deletado com sucesso.', 'success')
    return redirect(url_for('users'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)