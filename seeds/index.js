const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60dd937b93464728606ecbfc",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, nemo? Nostrum reiciendis libero quis deleniti eum natus suscipit reprehenderit. Excepturi voluptate qui incidunt a quia consequuntur quos quo dolorum doloribus.",
      price,
      geometry: {
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
        type: "Point",
      },
      images: [
        {
          url: "https://res.cloudinary.com/kevishax/image/upload/v1625280796/YelpCamp/owfakuyuxxtiog4yuyix.jpg",
          filename: "YelpCamp/owfakuyuxxtiog4yuyix",
        },
        {
          url: "https://res.cloudinary.com/kevishax/image/upload/v1625280796/YelpCamp/xtcya7i81wqrxbrdoxqg.jpg",
          filename: "YelpCamp/xtcya7i81wqrxbrdoxqg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
