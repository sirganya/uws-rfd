const uWS = require("uWebSockets.js");
const decode = require("./src/decode-utf-8");

// const parsePayload = require("./src/pgParse");
// const parsePayload = require("./src/redisParse");
// const parsePayload = require("./src/ioredisParse");
const parsePayload = require("./src/fastDriverRedisParse");
// const parsePayload = require("./src/mongoParse");
// const parsePayload = require("./src/couchbaseParse");

const port = 9001;

let max = 0;
let opened = 0;
let closed = 0;
let messageCount = 0;
let startTime;
let dbTime = 0;

const app = uWS
  ./*SSL*/ App({
    key_file_name: "misc/key.pem",
    cert_file_name: "misc/cert.pem",
    passphrase: "1234"
  })
  .ws("/*", {
    /* Options */
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 1000,
    /* Handlers */
    open: (ws, req) => {
      opened++;
    },
    // just websocket, no data processing
    // message: (ws, message, isBinary) => {
    //   if (!startTime) startTime = new Date().getTime();
    //   messageCount++;
    //   process.stdout.write(
    //     "TotalMS:" +
    //       (new Date().getTime() - startTime) +
    //       " opened: " +
    //       opened +
    //       " messages: " +
    //       messageCount +
    //       "\r"
    //   );
    // },
    message: async (ws, message, isBinary) => {
      if (!startTime) startTime = new Date().getTime();
      messageCount++;

      let start = new Date().getTime();
      /* Ok is false if backpressure was built up, wait for drain */
      try {
        let res = await decode(message);
        const result = await parsePayload(res);
        // ws.send(result, isBinary);
        let end = new Date().getTime();
        if (end - start > max) {
          max = end - start;
        }

        dbTime += end - start;

        process.stdout.write(
          "TotalMS:" +
            (new Date().getTime() - startTime) +
            " avgMS: " +
            Math.round(dbTime / messageCount) +
            " maxMS: " +
            max +
            " opened: " +
            opened +
            " messages: " +
            messageCount +
            "\r"
        );
      } catch (error) {
        console.log("err", error);
      }
    },
    drain: ws => {
      console.log("WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      closed++;
    }
  })
  .any("/*", (res, req) => {
    res.end("Nothing to see here!");
  })
  .listen(port, token => {
    if (token) {
      console.log("Listening to port " + port);
    } else {
      console.log("Failed to listen to port " + port);
    }
  });
