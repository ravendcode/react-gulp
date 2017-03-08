# React Gulp

### Features
1. ES6
2. Images
3. Gulp
4. React
5. SASS
6. PostCSS
7. Heroku

### Usage
1. Edit server/config.js
2. `openssl genrsa 1024 > server/ssl/private.key`
3. `openssl req -new -key server/ssl/private.key -out server/ssl/cert.csr`
4. `openssl x509 -req -in server/ssl/cert.csr -signkey server/ssl/private.key -out server/ssl/certificate.pem`
5. `npm i`
6. `npm i gulp-cli -g`
7. `gulp` https://localhost:3000 development only frontend
8. `npm run dev` - https://localhost:3000 frontend and https://localhost backend
9. `npm run prod` - minify frontend files
10. `npm start` - https://localhost start in production for heroku
11. `gulp clean` - clean dist
