const mongoose = require("mongoose");
const express = require("express");

const app = express();



app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.set ("view engine", "ejs");

app.use((req, res, next) => {
    console.log('${req.method}: ${req.path}');
    next();
});


const homeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true },
    question: {type: String, required: true}
});

const Home = mongoose.model("Home", homeSchema, "Homes");


const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: {type: String, required: true },
    about: {type: String, required: true}
});

const  Resource = mongoose.model("Resource", resourceSchema, "Resources");

const postSchema = new mongoose.Schema({
imageLocation: {type: String, required: true},
image: {type: String, required: true},
description: {type: String, required: true},
});
const Post = mongoose.model("Post", postSchema, "Posts");

app.get("/", async (req, res) => {
  const homes = await Home.find({}).sort({ createdAt: -1 });
  res.render("home.ejs", { homes });
});


app.get("/resources", async (req, res) => {
    const resources = await Resource.find({});
    res.render("finds.ejs", { resources })
});

app.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    res.render("posts.ejs", { posts })
})

app.delete("/posts/:_id", async (req, res) => {
    const post = await Post.findOneAndDelete({ _id: req.params._id })
    res.json(post);
});

app.patch("/posts/:_id", async (req, res) => {
    const post = await Post.findOneAndUpdate({_id: req.params._id }, 
    req.body, {new: true})
    res.json(posts);
});

app.post("/contact/save", async (req, res) => {
     const con1 = await new User({
     user: "Mayri Clemente",
     email: "Mayrisomethinggg@gmail.com",
     about: "fsfhkhdsfdgk",
     }).save()
     res.json(con1);
});

app.post("/contact/save", async (req, res) => {
    const con2 = await new User({
    user: "VAW Global Health Alliances",
    located: "8595 Pelham Rd, Suite 400 #301 Greenville, SC 29615, USA",
    email: "teamdevelopment@vawglobal.org",
    }).save()
    res.json(con2);
});

async function prepopulateDb() {
    try {
        await Source.deleteMany({});
        await Source.insertMany([
           {name: "Global Health Corps (GHC)", link: "https://ghcorps.org/", about: "GHC was founded on the belief that leadership is the greatest lever for change in global health."},
           {name: "NYU Langone Health", link: "https://jobs.nyulangone.org/", about: "Make a difference every day at NYU Langone Health. Join us as we deliver outstanding care at our patient-centered, world-class, integrated academic health system."},
           {name: "NYC Medical Reserve Corps (MRC)", link: "https://www.nyc.gov/site/doh/providers/emergency-prep/nyc-medical-reserve-corps.page", about: "The mission of the New York City Medical Reserve Corp (NYC MRC) is to strengthen public health, improve emergency response and build community resilience. The organization consists of over 15,000 medical and non-medical volunteers who are deployed to respond to public health emergencies and participate in health-related community activities."},
           {name: "Public Health AmeriCorps", link: "https://www.americorps.gov/serve/americorps/americorps-state-national", about: "Advance more equitable health outcomes for underserved communities with Public Health AmeriCorps."},
        ]);
        console.log('Resources added successfully!');
    } catch (err) {
        console.error('Error prepopulating database:', err);
    }
}

      
async function startServer(){
    // Add your SRV string, make sure that the database is called SE12
    await mongoose.connect("mongodb+srv://CSH:CSH2025@cluster0.6uo1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    // Uncomment this and run ONCE to add some students for editing and deleting
    prepopulateDb()

    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer(); 