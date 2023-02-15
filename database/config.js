require("dotenv").config();
const mongoose = require('mongoose');
const user = process.env.USER_DB;
const pswDB = process.env.PSW_DB;
const DB = process.env.BD;
const host = process.env.HOST;
 
const dbConnection = async () => {
  try {
    // const  MONGODB_CNN=`mongodb+srv://${user}:${pswDB}@${host}/${DB}?retryWrites=true&w=majority`
    // console.log(MONGODB_CNN)
    await mongoose.connect(`mongodb+srv://${user}:${pswDB}@${host}/${DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify:false
      });
    
    console.log('Base de datos Online');

  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar  la base de datos');
  }
}

module.exports = {dbConnection}
