require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const notifyRouter = require("./routers/notifyRouter");
const messageRouter = require("./routers/messageRouter");
const socketServer = require("./socketServer");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

// Set up routes
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notifyRouter);
app.use("/api", messageRouter);

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

console.log("MONGO_URI:", URL);
console.log("PORT:", port);

io.on("connection", (socket) => {
  socketServer(socket);
});

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

http.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
