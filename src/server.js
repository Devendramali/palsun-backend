require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const officerRoutes = require("./routes/officerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const memberRoutes = require("./routes/memberRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");
const swayamRoutes = require("./routes/swayamRoutes");
const govProgramsRoutes = require("./routes/govProgramRoutes");
const gloriousRoutes = require("./routes/gloriousRoutes");
const metricRoutes = require("./routes/metricRoutes");
const schoolCountRoutes = require("./routes/schoolCountRoutes");
const implinksRoutes = require("./routes/implinksRoutes");
const banner = require("./routes/bannerRoute");
const mananiyAdhikariRoutes = require("./routes/mananiyAdhikariRoutes");
const shashanNirnayRoutes = require("./routes/shashanNirnayRoutes");

const app = express();

// Connect DB
connectDB();


// --------------------
// IMPORTANT FIX
// --------------------

// CORS FIX
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://admin-palsun.vercel.app",
    "https://palsun.in"
  ],
  credentials: true
}));

// Large file upload support (VIDEO)
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));


// --------------------
// STATIC FILES
// --------------------

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/banners", express.static("uploads/banners"));
app.use("/uploads/notices", express.static(path.join(__dirname, "../uploads/notices")));
app.use("/uploads/swayamGhoshna", express.static("uploads/swayamGhoshna"));
app.use("/uploads", express.static("src/uploads"));




// --------------------
// API ROUTES
// --------------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/officers", officerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/schoolcount", schoolCountRoutes);

app.use("/api/notices", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);

app.use("/api/swayamGhoshna", swayamRoutes);
app.use("/api/govPrograms", govProgramsRoutes);
app.use("/api/shashanNirnay", shashanNirnayRoutes);

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/suvichar", require("./routes/suvicharRoutes"));

app.use("/api/mananiy-adhikari", mananiyAdhikariRoutes);

app.use("/api/mahiti", require("./routes/mahitiRoutes"));
app.use("/api/awards", require("./routes/awardRoutes"));
app.use("/api/expenditure", expenditureRoutes);

app.use("/api/gloriousPersons", gloriousRoutes);
app.use("/api/implinks", implinksRoutes);

app.use("/api/banner", banner);

app.use("/api/", require("./routes/awsRoutes"));


// --------------------
// ROOT
// --------------------

app.get("/", (req, res) => {
  res.send("🚀 Server with MongoDB Running!");
});


// --------------------
// START SERVER
// --------------------

app.get("/api/testnirnay", (req, res) => {
  res.send("Nirnay API working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});