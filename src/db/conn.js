const  mongoose = require("mongoose");

var  uri = process.env.oneDay || "mongodb+srv://NikhilDobariya4669:NikhilDobariya4669@cluster.x0hasnl.mongodb.net/JugarriDb?retryWrites=true&w=majority"

const  options = {
useNewUrlParser:  true,
useUnifiedTopology:  true
};

mongoose.connect(uri, options).then(() => {
console.log("Database connection established!");
},
err  => {
{
console.log("Error connecting Database instance due to:", err);
}
});