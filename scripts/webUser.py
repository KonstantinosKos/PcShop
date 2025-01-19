import json
import random
import datetime
import requests
from faker import Faker
from dotenv import load_dotenv
import os

load_dotenv()  # Load the environment variables from the .env file

# Initialize Faker
fake = Faker()

# API URL
API_URL = os.getenv('API_URL_WEB_USER')

# Card Types
CARD_TYPES = ["VISA", "MASTER_CARD"]

def generate_user():
    return {
        "username": fake.user_name(),
        "password": fake.password(),
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "phoneNumber": int(fake.msisdn()[:10]),  # Generate a 10-digit phone number
        "email": fake.email(),
        "creditCard": [
            {
              "nameOnCard": "",
              "numberOnCard": "",
              "cardExpireDate": "",
              "cardType": ""
            }
        ],
        "address": {
            "city": fake.city(),
            "street": fake.street_name(),
            "number": fake.building_number(),
            "zipCode": fake.zipcode(),
        },
        "orders": []  # Empty orders list
    }

def send_user_to_api(user):
    try:
        response = requests.post(API_URL, json=user, verify=False )
        if response.status_code == 201:
            print(f"User {user['username']} created successfully!")
        else:
            print(f"Failed to create user {user['username']}: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Error sending user {user['username']} to API: {e}")

# Generate and send 10 users
for _ in range(10):
    user = generate_user()
    send_user_to_api(user)
