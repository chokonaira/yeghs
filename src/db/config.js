import mongoose from "mongoose";
import "dotenv/config";

mongoose.connection.once("open", () => {
  console.log("Database connected...");
});

mongoose.connection.on("error", () => {
  console.log("Database connection failed...");
});

const containerUri = process.env.MONGODB_URI;
(async function() {
  try {
    await mongoose.connect(containerUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (error) {
    console.log(error);
  }
})();
