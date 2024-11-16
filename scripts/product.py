import random
import requests
import uuid
from faker import Faker

# Initialize Faker
fake = Faker()

# API URL for Product
API_URL = "http://localhost:8080/api/product"

# Categories Enum
CATEGORIES = [
    "PC_LAPTOPS",
    "GAMING",
    "MOBILE_TABLETS",
    "IMAGE_SOUND",
    "HARDWARE",
    "PRINTERS",
]

# Availability Enum with min and max days
AVAILABILITIES = {
    "AVAILABLE": (1, 3),
    "NOT_AVAILABLE": (9999, 0),
    "ORDER": (4, 10),
    "PRE_ORDER": (15, 30),
}

def generate_product():
    availability = random.choice(list(AVAILABILITIES.keys()))
    return {
        "productNumber": str(uuid.uuid4()),  # Generate a random UUID
        "productName": fake.word().capitalize() + " " + fake.word().capitalize(),
        "price": round(random.uniform(10.0, 1000.0), 2),  # Random price between $10 and $1000
        "category": random.choice(CATEGORIES),
        "description": fake.sentence(nb_words=10),
        "availability": availability,
        "images": [],  # Assuming images are added later
        "webOrder": None,  # Assuming the product is not yet linked to an order
    }

def send_product_to_api(product):
    try:
        response = requests.post(API_URL, json=product)
        if response.status_code == 201:
            print(f"Product {product['productName']} created successfully!")
        else:
            print(f"Failed to create product {product['productName']}: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Error sending product {product['productName']} to API: {e}")

# Generate and send 10 products
for _ in range(10):
    product = generate_product()
    send_product_to_api(product)
