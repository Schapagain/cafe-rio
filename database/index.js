const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = `mongodb+srv://sandesh:${process.env.DBPASSWORD}@mongo-aws.bav9k.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

module.exports = {
  isValidMongooseId: id => mongoose.Types.ObjectId.isValid(id)
}