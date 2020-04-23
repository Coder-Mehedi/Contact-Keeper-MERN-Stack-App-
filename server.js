const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

// Connect Database
connectDB();

// Init MiddleWare
app.use(express.json({ extended: true }));
app.use(cors());

// Import Routes
const userRoute = require("./routes/users");
const contactsRoute = require("./routes/contacts");
const authRoute = require("./routes/auth");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started on port", PORT));
