const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};


//cloud
//728947124298331 Api-key
//jaO2fdp4frv1lkrjFa0B4rN6ilU Api-Secret
//CLOUDINARY_URL=cloudinary://728947124298331:jaO2fdp4frv1lkrjFa0B4rN6ilU@dtbonnhjg

module.exports = connectDB;
