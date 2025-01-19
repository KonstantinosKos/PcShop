import requests
import uuid
import base64
from urllib.parse import quote
from dotenv import load_dotenv
import os

load_dotenv()  # Load the environment variables from the .env file

# API URL for Product
API_URL = os.getenv('API_URL_PRODUCT')
API_KEY = os.getenv('API_KEY')
CX = os.getenv('CX')

# Predefined unique products for each category
PRODUCTS = [
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Gaming Mouse Logitech G502",
                   "price": 49.99,
                   "category": "GAMING",
                   "description": "High-precision gaming mouse with customizable buttons.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
              },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Gaming Keyboard Razer BlackWidow V4",
                   "price": 159.99,
                   "category": "GAMING",
                   "description": "Mechanical keyboard with customizable RGB lighting.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Gaming Headset HyperX Cloud II",
                   "price": 99.99,
                   "category": "GAMING",
                   "description": "Comfortable headset with 7.1 surround sound for gamers.",
                   "availability": "ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Dell XPS 15",
                   "price": 1499.99,
                   "category": "PC_LAPTOPS",
                   "description": "Premium laptop for professionals and creators.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "MacBook Pro M2",
                   "price": 1999.99,
                   "category": "PC_LAPTOPS",
                   "description": "High-performance laptop with Apple silicon for professionals.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Lenovo ThinkPad X1 Carbon",
                   "price": 1299.99,
                   "category": "PC_LAPTOPS",
                   "description": "Ultra-lightweight business laptop with excellent performance.",
                   "availability": "ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Samsung Galaxy Tab S8",
                   "price": 699.99,
                   "category": "MOBILE_TABLETS",
                   "description": "High-performance tablet with an S Pen for creativity.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "iPad Pro 11-inch",
                   "price": 799.99,
                   "category": "MOBILE_TABLETS",
                   "description": "Powerful tablet with M2 chip and advanced display.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Microsoft Surface Pro 9",
                   "price": 1099.99,
                   "category": "MOBILE_TABLETS",
                   "description": "2-in-1 tablet and laptop for versatile productivity.",
                   "availability": "ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Sony WH-1000XM5 Headphones",
                   "price": 299.99,
                   "category": "IMAGE_SOUND",
                   "description": "Noise-canceling wireless headphones with superior sound quality.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Bose SoundLink Revolve II",
                   "price": 199.99,
                   "category": "IMAGE_SOUND",
                   "description": "Portable Bluetooth speaker with deep sound and long battery life.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "JBL PartyBox 310",
                   "price": 499.99,
                   "category": "IMAGE_SOUND",
                   "description": "Powerful portable speaker with dynamic light show.",
                   "availability": "ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "NVIDIA RTX 4070 Graphics Card",
                   "price": 599.99,
                   "category": "HARDWARE",
                   "description": "Powerful GPU for gaming and content creation.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Intel Core i9-13900K",
                   "price": 699.99,
                   "category": "HARDWARE",
                   "description": "High-performance CPU for extreme multitasking.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Corsair Vengeance RGB 32GB RAM",
                   "price": 149.99,
                   "category": "HARDWARE",
                   "description": "Fast and reliable memory for gaming and creative work.",
                   "availability": "ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "HP LaserJet Pro M404dn",
                   "price": 199.99,
                   "category": "PRINTERS",
                   "description": "Efficient monochrome laser printer for small offices.",
                   "availability": "AVAILABLE",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Canon PIXMA TS9120",
                   "price": 129.99,
                   "category": "PRINTERS",
                   "description": "All-in-one inkjet printer with great photo printing quality.",
                   "availability": "PRE_ORDER",
                   "images": [],
                   
               },
               {
                   "uuid": str(uuid.uuid4()),
                   "productName": "Epson EcoTank ET-2760",
                   "price": 279.99,
                   "category": "PRINTERS",
                   "description": "Cartridge-free printer with high-capacity ink tanks.",
                   "availability": "ORDER",
                   "images": []               }
           ]

# Fetch image URLs using Google Custom Search API
def fetch_image_urls(product_name):
    encoded_product_name = quote(product_name)
    search_url = f"https://www.googleapis.com/customsearch/v1?q={encoded_product_name}&searchType=image&num=3&key={API_KEY}&cx={CX}"
    params = {
        "q": encoded_product_name,
        "searchType": "image",
        "num": 3,  # Fetch up to 3 images
        "key": API_KEY,
        "cx": CX,
    }
    try:
        response = requests.get(search_url, params=params)
        response.raise_for_status()
        data = response.json()
        return [item["link"] for item in data.get("items", [])]
    except Exception as e:
        print(f"Error fetching image URLs for {product_name}: {e}")
        return []

def download_image_as_base64(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        image_data = response.content
        return base64.b64encode(image_data).decode('utf-8')  # Convert to Base64 string
    except Exception as e:
        print(f"Error downloading image from {url}: {e}")
        return None


# Add images to a product
def add_images_to_product(product):
    if "images" not in product:
        product["images"] = []

    image_urls = fetch_image_urls(product["productName"])

    if not image_urls:
        print(f"No image URLs found for {product['productName']}")
        return

    for url in image_urls:
        image_data = download_image_as_base64(url)

        if image_data:
            product["images"].append({"data": image_data})   # Add Base64 encoded image string
        else:
            print(f"Failed to download image from {url}")


def send_product_to_api(product):
    try:
        # Make sure 'images' are base64 encoded
        if 'images' in product and product['images']:
            response = requests.post(API_URL, json=product, verify=False )
            if response.status_code == 201:
                print(f"Product {product['productName']} created successfully!")
            else:
                print(f"Failed to create product {product['productName']}: {response.status_code}, {response.text}")
        else:
            print(f"Product {product['productName']} does not have any images.")
    except Exception as e:
        print(f"Error sending product {product['productName']} to API: {e}")

# Process each product: Add images and send to API
for product in PRODUCTS:
    add_images_to_product(product)  # Add images to the product
    send_product_to_api(product)  # Send product to the API