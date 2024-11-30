const express = require("express");
const connectToMongo = require("./database/db");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const path = require("path");

connectToMongo();

const app = express();

const _dirname = path.resolve();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/news", require("./routes/news.route"));


app.use(express.static(path.join(_dirname,"/frontend/build")));

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","build","index.html"))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
