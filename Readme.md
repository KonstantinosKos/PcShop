# PcShop
PcShop is a full-stack application for managing an online store built with Spring Boot on the backend and React on the frontend
## Description
PcShop provides a web based platform to browse and purchase products while offering an admin panel for managing,
inventor, order, and customer data.
### Purpose:
* For customers:
  * Browse and search for products with ease.
  * Add products to the shopping cart and place secure orders.
* For administrators:
  * Manage product inventory and track orders.
  * view and analyze customer purchase data.
## Getting Started 
### Dependencies

* Python 3.11.5
* Java 21.0.2
* Node 22.0.9

### Installing

```
mkdir c:/projects
cd projects
git clone https://github.com/KonstantinosKos/PcShop.git
```
### Executing program

* How to build the client
```
cd src\main\client\pcShop
npm ci
npm run build
```
* How to build the server with the client 
```
mkdir src\main\resources\static
robocopy src\main\client\pcShop\dist src\main\resources\static /MOVE /E
gradlew clean build
```
* How to run the Web-App
```
java -jar build\libs\PcShop-0.0.1-SNAPSHOT.jar
```
## More Info

Python scripts can be used to populate some data into the database.
#### (P.S. you need to set your .env file in order to execute the api calls with the Web-App and google api and search engine)
```
py products.py
py webUser.py
```

## Authors

Contributors names and contact info

[@KonstantinosKos](https://github.com/KonstantinosKos)

## Version History

* 0.1
    * Initial Release
