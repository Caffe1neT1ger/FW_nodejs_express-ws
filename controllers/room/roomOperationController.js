import asyncHandler from "express-async-handler";
export const roomOperating= asyncHandler(async(req,res)=>{
  ws.on("message", function (data) {
    const message = JSON.parse(data);
    console.log(message);
    if (message.operation == "start") {
      const data = {
        ...message,
        progress: message.progress,
        isPause: false,
      };
      ws.send(JSON.stringify(data));
    }
    if (message.operation == "stop") {
      const data = {
        ...message,
        progress: message.progress,
        isPause: true,
      };
      ws.send(JSON.stringify(data));
    }
  });
});
