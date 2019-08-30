// var util = require("util");
//
// module.exports = message => {
//   const dec = new util.TextDecoder("utf-8", { fatal: true });
//   const decodedMessage = dec.decode(message);
//   return decodedMessage;
// };

module.exports = async function(message) {
  let buffer = Buffer.from(message);
  let json;
  json = JSON.parse(buffer);
  return json;
};
