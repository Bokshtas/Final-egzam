const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const { organiser, participants } = require("./routes/v1");
const app = express();
app.use(express.json());
app.use(cors());




app.use("/v1/organiser/", organiser);



app.use("/v1/participants/", participants);




app.get("/", (req, res) => {
    res.send({ message: "ONLINE" });
});
app.all("*", (req, res) => {
    res.status(404).send({ error: "No page" });
});
app.listen(port, () => {
    console.log(`ONLINE - ${port}`)
});