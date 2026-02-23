## This is ekart or ecommerce web's backend code in node express js developed by 
```
 bitturana-ab
```
## to use this backend project
### install using 

```
npm i
```
### test using
``` 
npm run dev for development || npm run start for production 
```
### this project uses 
```
1. Email and password to create user account. for development now
2. Later for production we can expand  
```
### Product api routes
```javascript
- add product 
POST /api/product/create
- update product
PUT /api/product/:id
- get all products
GET /api/product/all
- delete product 
DELETE /api/product/:id
- upload images of product using multer memoryStorage and cloudinary data base
POST /api/product/image/:id
```