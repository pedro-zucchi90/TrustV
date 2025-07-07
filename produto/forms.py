from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
    name = StringField('Nome do Produto', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('Descrição', validators=[DataRequired(), Length(max=255)])
    price = FloatField('Preço', validators=[DataRequired()])
    quantity = IntegerField('Quantidade', validators=[DataRequired(), NumberRange(min=0)])
    submit = SubmitField('Salvar')