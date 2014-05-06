GDG-Server
==========

Steps needed to execute the application:

* Setting up the local.js file

1° Create a file called local.js inside the root

2° Fill it with the following format & content

    "use strict";
    var fs = require('fs');
    module.exports = {
        jwtSecret: 'YOUR_SECRET_GOES_HERE',
        google: {
            clientId: 'YOUR_GOOGLE_CLIENT_ID_GOES_HERE',
            secret: 'YOUR_GOOGLE_SECRET_GOES_HERE'
        },
        sslCredentials: {
            key: fs.readFileSync('sslcert/private.key', 'utf8'),
            cert: fs.readFileSync('sslcert/certificate.crt', 'utf8'),
            requestCert: false,
            rejectUnauthorized: false
        }
    };

* Install module dependencies with the command "npm install"

* Run the server as root with the command "npm start " because it runs on ports 80 and 443 for http and https respectively