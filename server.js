const express = require("express");
const connectDB = require("./config/db");

//connect database db
connectDB();

const app = express();

//init middleware (check here later; should work causes app crash)
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the ContactKeeper API" })
);

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
