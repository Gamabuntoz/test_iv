# Test API instructions
For start this API with DB in Docker container you need:
* git clone this repo (git clone git@github.com:Gamabuntoz/test_iv.git)
* make .env file and add params like this:
  * PORT=5000
  * POSTGRES_HOST=postgres
  * POSTGRES_USER=postgres
  * POSTGRES_DB=test_iv
  * POSTGRES_PASSWORD=a@R~w2B0Lf9V
  * POSTGRES_PORT=5432
  * JWT_SECRET=super_secret
* use "docker compose up" command to start app

Test methods for user endpoint: 
1. Use GET /user for get all info about all users;
2. Use GET /user/:userId for get info about one user;
3. Use POST /user for create new one user, you need send email, firstName and lastName 
in JSON format in body;
4. Use POST /user/login for get access JWT token, you need send email in JSON format in body;
5. Use POST /user/:userId/image for save your image on the server, you need send 
form-data with 'image' as key and some image file as value, also you need send
Bearer token in headers (get with login response) for authorization;
6. Use POST /user/pdf for generate and save in db your pdf file, you need 
send your email in JSON format in body, also you need send
Bearer token in headers for authorization;
7. Use PUT /user/:userId for update user info, you need send email, firstName and lastName 
in JSON format in body, also you need send Bearer token in headers for authorization;
8. Use DELETE /user/:userId for delete user in db, you need send 
Bearer token in headers for authorization;