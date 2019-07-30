const mongoose = require('mongoose');

//Monggo global promise
mongoose.Promise = global.Promise;

username = "laela";
password = "12345l"
//Monggo Connect
mongoose.connect(`mongodb://${username}:${password}@ds151007.mlab.com:51007/monggopolling`)
.then(()=>console.log('Monggo Connect'))
.catch(error=> console.log(error))