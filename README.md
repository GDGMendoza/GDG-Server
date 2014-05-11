GDG-Server
==========

Steps needed to execute the application:

* Setting up the configuration provider file

1° Create a file called "ConfigurationProvider.js" inside the folder "providers"

2° Fill it with the following format & content

    "use strict";
    var fs = require('fs');
    var ConfigurationProvider = {};
    ConfigurationProvider.jwtSecret = 'YOUR_JWT_SECRET_GOES_HERE';
    ConfigurationProvider.google = {
        clientId: 'YOUR_GOOGLE_CLIENT_ID_GOES_HERE',
        secret: 'YOUR_GOOGLE_SECRET_GOES_HERE'
    };
    ConfigurationProvider.sslCredentials = {
        key: fs.readFileSync('sslcert/private.key', 'utf8'),
        cert: fs.readFileSync('sslcert/certificate.crt', 'utf8'),
        requestCert: false,
        rejectUnauthorized: false
    };
    module.exports = ConfigurationProvider;

* Install module dependencies with the command "npm install"

* Import false data for testing

1° cd dbFalseData #get inside backup folder

2° mongoimport --db gdg-db --collection posts --jsonArray --file posts.json

3° mongoimport --db gdg-db --collection tags --jsonArray --file tags.json

4° mongoimport --db gdg-db --collection templates --jsonArray --file templates.json

5° mongoimport --db gdg-db --collection users --jsonArray --file users.json

* Run the server as root with the command "npm start " because it runs on ports 80 and 443 for http and https respectively