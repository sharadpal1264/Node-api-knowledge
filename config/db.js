require('dotenv').config();
const mongoose= require('mongoose');
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
const mongodbUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();