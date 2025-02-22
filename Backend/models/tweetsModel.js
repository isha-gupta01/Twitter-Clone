import mongoose from "mongoose";

const userTweets = new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    username:String,
    profileImage:String,
    content:String,
    image:String,
    likes:String,
    comments:String,
    retweets:String,
    views:String,
    tweetTime:String,
    created_at: { type: Date, default: Date.now }
})

export default mongoose.models.Tweets || mongoose.model("Tweets",userTweets,"tweets")