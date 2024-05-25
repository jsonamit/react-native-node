const express = require("express");

const app = express();

const db = require('./config/db.config');

const bodyParse = require('body-parser');

const cors = require('cors');

const helmet = require('helmet');

require('dotenv').config()

app.use(bodyParse.urlencoded({extended:true}));

// for parsing application/json
app.use(bodyParse.json());

var corsOptions = {
    origin : true,
    credentials: true, 
};  

app.use(cors(corsOptions));

//help to protect our app
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src" : ["'self'","https://*" ,"data:","blob:"],
            "default-src" : ["*","blob:"],
            "object-src" : ["*"],
            "script-src" : ["*","'unsafe-inline'", "'unsafe-eval'"],
            "script-src-elem" : ["*","'unsafe-inline'", "'unsafe-eval'"],
            "frame-ancestors": ["'self'", "https://*.instantpay.in"]
        },
    })
);

const mainRouter = express.Router();
const mainRoutes = require('./routes/index')(mainRouter);
app.use('/app', mainRoutes);


const PORT = process.env.APP_PORT || 8081;

//Handel unwanted framework or node errors
process.on('uncaughtException', function (err) {
    if(process.env.NODE_ENV=='testing' || process.env.NODE_ENV=='development'){
        console.log("uncaughtException from server js : ",err.message);
    }
}); 


//Handle unwanted Promise errors
process.on('unhandledRejection', function (reason, promise) {
    if(process.env.NODE_ENV=='testing' || process.env.NODE_ENV=='development'){
        console.log("unhandledRejection from server js : ",reason);
    }
});

var server = app.listen(PORT, () => {  
    console.log(`Server is running on ${process.env.NODE_ENV} environment using port ${PORT}.`);
})