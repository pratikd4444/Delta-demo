const mongoose =  require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema ;
const Review = require("./review.js");

const listingSchema = new Schema ( {
   title:  {
     type: String,
     required: true
   } ,
     description: String,
    image: {
    url: String,
    filename: String
        // default: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
        // set: (v) => v === "" 
        //     ? "https://images.unsplash.com/photo-1501973801540-537f08ccae7b" 
        //     : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry:  {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
    type: String,
    enum: ["Trending","room","Iconic city", "Castles" , "beach" , "Farms" ]
  }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing ;