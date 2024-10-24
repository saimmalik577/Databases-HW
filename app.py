from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask_cors import CORS
import json
import os


app = Flask(__name__)
CORS(app)


# Настройка подключения к PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5434/barysDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = '/Users/ali/Desktop/test'

# Инициализация базы данных
db = SQLAlchemy(app)

# Определение модели Category для работы с таблицей category
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    photo = db.Column(db.String(200), nullable=False)

    def __init__(self, name, photo):
        self.name = name
        self.photo = photo
class SubCategory(db.Model):
    __tablename__ = 'subcategory'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    photo = db.Column(db.String(200), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('subcategories', lazy=True))

    def __init__(self, name, photo, category):
        self.name = name
        self.photo = photo
        self.category = category

# Функция для сохранения файла

# Маршрут для создания подкатегории (POST)
@app.route('/subcategory', methods=['POST'])
def create_subcategory():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Сохраняем файл
    file_path = store_file(file)

    # Получаем данные из формы
    name = request.form.get('name')
    category_id = request.form.get('categoryId')

    if not name or not category_id:
        return jsonify({'error': 'Name and Category ID are required'}), 400

    # Находим категорию по ID
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'error': 'Category not found'}), 404

    # Создаем новую подкатегорию
    new_subcategory = SubCategory(name=name, photo=file_path, category=category)

    # Сохраняем подкатегорию в базе данных
    db.session.add(new_subcategory)
    db.session.commit()

    return jsonify({
        'id': new_subcategory.id,
        'name': new_subcategory.name,
        'photo': new_subcategory.photo,
        'category': {
            'id': category.id,
            'name': category.name
        }
    }), 201


# Функция для сохранения файла
def store_file(file):
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return file_path

# Маршрут для создания категории
@app.route('/category', methods=['POST'])
def create_category():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Сохраняем файл и получаем путь к нему
    file_path = store_file(file)

    # Получаем название категории из формы
    name = request.form.get('name')

    # Создаем новую категорию
    new_category = Category(name=name, photo=file_path)

    # Сохраняем категорию в базе данных
    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        'id': new_category.id,
        'name': new_category.name,
        'photo': new_category.photo
    }), 201

class Product:
    def __init__(self, name, price, description, kaspi, photoPath, category, subCategory=None):
        self.name = name
        self.price = price
        self.description = description
        self.kaspi = kaspi
        self.photoPath = photoPath
        self.category = category
        self.subCategory = subCategory
        self.productProperties = []

    def to_dict(self):
        return {
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'kaspi': self.kaspi,
            'photoPath': self.photoPath,
            'category': self.category,
            'subCategory': self.subCategory,
            'productProperties': [prop.to_dict() for prop in self.productProperties]
        }

class ProductProperty:
    def __init__(self, key, value, product):
        self.key = key
        self.value = value
        self.product = product

    def to_dict(self):
        return {
            'key': self.key,
            'value': self.value
        }
@app.route('/products', methods=['POST'])
def create_product():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Store the file
    file_path = store_file(file)

    # Extract form data
    name = request.form.get('name')
    price = request.form.get('price')
    category_id = request.form.get('categoryId')
    sub_category_id = request.form.get('subCategoryId')
    description = request.form.get('description')
    kaspi = request.form.get('kaspi')
    product_properties_json = request.form.get('productProperties')

    # Validate required fields
    if not name or not price or not category_id or not description or not kaspi or not product_properties_json:
        return jsonify({'error': 'Required fields are missing'}), 400

    # Convert product properties from JSON string
    try:
        product_properties = json.loads(product_properties_json)
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid product properties JSON'}), 400

    # Create the product instance
    product = Product(
        name=name,
        price=price,
        description=description,
        kaspi=kaspi,
        photoPath=file_path,
        category=category_id,
        subCategory=sub_category_id
    )

    # Create product properties
    properties = []
    for prop in product_properties:
        key = prop.get('key')
        value = prop.get('value')
        if key and value:
            properties.append(ProductProperty(key=key, value=value, product=product))

    product.productProperties = properties

    # Here you would save the product to the database
    # For now, we just return it as a JSON response
    return jsonify(product.to_dict()), 201

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()  # Получаем все записи из таблицы Category
    categories_list = [{
        'id': category.id,
        'name': category.name,
        'photo': category.photo
    } for category in categories]

    return jsonify(categories_list), 200
class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    number = db.Column(db.String(50), nullable=False)
    comment = db.Column(db.String(500), nullable=True)  # Optional field

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'number': self.number,
            'comment': self.comment}
class ApplicationRequestDto:
    def __init__(self, full_name, number, comment=None):
        self.full_name = full_name
        self.number = number
        self.comment = comment

# Create the application route
@app.route('/applications', methods=['POST'])
def create_application():
    data = request.get_json()
    application_dto = ApplicationRequestDto(
        full_name=data.get('full_name'),
        number=data.get('number'),
        comment=data.get('comment')  # Optional
    )

    application = Application(
        full_name=application_dto.full_name,
        number=application_dto.number,
        comment=application_dto.comment
    )

    db.session.add(application)
    db.session.commit()

    return jsonify(application.to_dict()), 201


@app.route('/subcategories/<int:id>', methods=['GET'])
def get_subcategory_by_id(id):
    subcategory = SubCategory.query.get(id)

    if not subcategory:
        return jsonify({'error': 'Subcategory not found'}), 404

    response = {
        'id': subcategory.id,
        'name': subcategory.name,
        'photo': subcategory.photo,
        'category': {
            'id': subcategory.category.id,
            'name': subcategory.category.name
        }
    }

    return jsonify(response), 200


@app.route('/subcategories', methods=['GET'])
def get_subcategories():
    # Получаем все подкатегории из базы данных
    subcategories = SubCategory.query.all()

    # Формируем ответ с данными всех подкатегорий
    response = []
    for subcategory in subcategories:
        response.append({
            'id': subcategory.id,
            'name': subcategory.name,
            'photo': subcategory.photo,
            'category': {
                'id': subcategory.category.id,
                'name': subcategory.category.name
            }
        })

    return jsonify(response), 200

@app.route('/subcategories/category/<int:category_id>', methods=['GET'])
def get_subcategories_by_category_id(category_id):
    # Query for all subcategories with the given category_id
    subcategories = SubCategory.query.filter_by(category_id=category_id).all()

    if not subcategories:
        return jsonify({'message': 'No subcategories found for this category'}), 404

    # Create a response list for the found subcategories
    response = []
    for subcategory in subcategories:
        response.append({
            'id': subcategory.id,
            'name': subcategory.name,
            'photo': subcategory.photo,
            'category': {
                'id': subcategory.category.id,
                'name': subcategory.category.name
            }
        })

    return jsonify(response), 200



if __name__ == '__main__':
    app.run(debug=True,port=5000)

