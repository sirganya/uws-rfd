const util = require("util");

const decode = require("../newting/decode-utf-8");

const enc = new util.TextEncoder();
const message = enc.encode(JSON.stringify({ message: "hello" }));

test("decode bytes", () => {
  expect(JSON.parse(decode(message))).toEqual({ message: "hello" });
});
