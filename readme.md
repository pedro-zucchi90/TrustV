# TrustV - Confiança e Velocidade x5

![TrustV Logo](FrontEnd/static/img/logo.png)

## Sobre o Projeto

A TrustV é uma aplicação web completa, composta por um backend em Flask e um frontend moderno. O sistema permite o cadastro, autenticação, edição e remoção de usuários, além de upload de foto de perfil. O objetivo é apresentar a empresa, seus valores e serviços, além de demonstrar funcionalidades de autenticação e gerenciamento de usuários.

## Tecnologias Utilizadas

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [Flask-Login](https://flask-login.readthedocs.io/)
- [Flask-WTF](https://flask-wtf.readthedocs.io/)
- [Flask-Bcrypt](https://flask-bcrypt.readthedocs.io/)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [SQLite](https://www.sqlite.org/index.html)

### Frontend
<a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>

### Bibliotecas e Recursos
<a href="https://fontawesome.com/"><img src="https://img.shields.io/badge/Font_Awesome-%23339AF0?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome"></a>
<a href="https://fonts.google.com/"><img src="https://img.shields.io/badge/Google_Fonts-%234285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Fonts"></a>

### Recursos JavaScript Utilizados
<img src="https://img.shields.io/badge/ES6+-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="ES6+">
<img src="https://img.shields.io/badge/DOM_Manipulation-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="DOM Manipulation">
<img src="https://img.shields.io/badge/Event_Listeners-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Event Listeners">
<img src="https://img.shields.io/badge/Intersection_Observer-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Intersection Observer">

## Funcionalidades

- Cadastro de usuários com validação de dados e senha criptografada
- Login e logout seguro
- Edição de perfil (nome, email, data de nascimento e foto de perfil)
- Upload de foto de perfil
- Exclusão de usuários
- Listagem de usuários autenticados

## Estrutura do Projeto

```
TrustV/
├── backend/
│   ├── forms.py
│   ├── instance/
│   │   └── database.db
│   ├── main.py
│   └── models.py
├── FrontEnd/
│   ├── static/
│   │   ├── geral.js
│   │   ├── pagInicial.css
│   │   ├── img/
│   │   │   ├── basseggio.jpeg
│   │   │   ├── bremda.jpeg
│   │   │   ├── guapo.jpeg
│   │   │   ├── harold.jpeg
│   │   │   ├── hero-bg.jpg
│   │   │   ├── lindo.jpeg
│   │   │   ├── logo.png
│   │   │   └── nigole.jpeg
│   │   └── profile_pics/
│   │       ├── james_sunderland.jpeg
│   │       ├── lovely_son.jpeg
│   │       └── Monster___Johan_Liebert_5___.jpeg
│   └── templates/
│       ├── base.html
│       ├── edit_user.html
│       ├── index.html
│       ├── login.html
│       ├── register.html
│       └── users.html
├── readme.md
```

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/pedro-zucchi90/TrustV.git
```

2. Navegue até o diretório do projeto:
```bash
cd TrustV
```

3. Instale as dependências do backend (recomenda-se uso de ambiente virtual):
```bash
pip install flask flask_sqlalchemy flask_bcrypt flask_login flask_wtf
```

4. Execute a aplicação Flask:
```bash
python backend/main.py
```

5. Acesse o sistema pelo navegador em:
```
http://localhost:5000
```

## Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## Equipe de Desenvolvimento

- Pedro Zucchi - Gerente de Projetos & Desenvolvedor
- João Guilherme - Desenvolvedor
- Brenda Goronski - Content Creator
- Maria Nicolle - Content Creator
- Haroldo Fernandes - Content Creator
- João Basseggio - Designer

## Licença

Este projeto está sob a licença [MIT](LICENSE).

## Contato

- Email: trustvcontact@gmail.com
- Telefone: (47) 99999-9999
- Endereço: SC-283, Fragosos, Concórdia - SC, 89703-720
