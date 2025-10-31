const connectToMongo=require('./db');
const express = require('express');
var cors=require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());


app.use(express.json())
app.get('/', (req, res) => {
  
  res.send('Hello World!');
})
app.use("/api/auth",require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaint"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/complaintall", require("./routes/Admin"));
app.use("/api/admin", require("./routes/Admin"));
app.use("/api/notice", require("./routes/Admin"));
app.use("/api/notices", require("./routes/complaint"));
app.use("/api/complaintd", require("./routes/complaint"));
// app.listen(port, () => {
//   console.log(`iNotebook backend listening at http://localhost:${port}`)
// })
app.listen(5000, '0.0.0.0', () => console.log("Server running on 0.0.0.0:5000"));


