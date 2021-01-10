const mongoose = require("mongoose");
const { ValidationError } = require("../controllers/errors");
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

const isValidMongooseId = id => mongoose.Types.ObjectId.isValid(id);

const queryDatabase = async ({model,query,attributes}) => {
  if (query && query.id && !isValidMongooseId(query.id)) {
    throw new ValidationError('id');
  }

  return model.find(query,'-_id '.concat(attributes.join(' ')));
}

module.exports = {
  isValidMongooseId,
  queryDatabase,
}