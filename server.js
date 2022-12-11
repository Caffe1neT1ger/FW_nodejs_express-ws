import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import enableWs from "express-ws";
import expressAsyncHandler from "express-async-handler";

dotenv.config();

const app = express();
const WSServer = enableWs(app);
const aWss = WSServer.getWss();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.ws("/api/room/", function (ws, req) {
  ws.on("open", function (message) {});

  ws.on("message", function (message) {
    const data = JSON.parse(message);
    switch (data.method) {
      case "connection":
        connectionHandler(ws, data);
        break;
      case "watch":
        broadcastConnection(ws, data);
        break;
      case "sync":
        syncHandler(ws, data);
        break;
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`.yellow.bold
  );
});

function connectionHandler(ws, data) {
  ws.roomId = data.roomId;
  ws.owner = data.owner;
  ws.id = data.id;

  broadcastConnection(ws, data);
}

function broadcastConnection(ws, data) {
  aWss.clients.forEach((client) => {
    if (client.roomId === data.roomId) {
      if (data.ownerId == client.id && client.owner == true) {
      }
      client.send(
        JSON.stringify({
          ...data,
          message: `Пользователь ${data.username} подключился к комнате`,
        })
      );
    }
  });
}
