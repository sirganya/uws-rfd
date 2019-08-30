### Combination of uWebscokets and Fast Redis Driver

Install NPM packages using

`yarn` or `npm install`

The app has drivers for fast-redis-driver, ioredis and redisParse

In tests with [Tsung](http://tsung.erlang-projects.org) with 20,000 users connecting and each user sending 100 messages and requesting a record from Redis with a random delay of 0 -2 secs per request on an a1.medium EC2 instance the following _unscientific_ results emerged. (Tsung was maxing CPU on this instance so it's latency has to be considered. XML scripts are in the benchmark folder.)

app.js was also running on a seperatew a1.medium EC2 instance with the flags

`node --max-semi-space-size=128 --max-old-space-size=1024 app.js`

**Baseline:** No data processing, open 20k websocket connections and each connection receives 100 messages.

_(TotalMS is the time it took to complete.)_

`TotalMS:550895 opened: 20000 messages: 2000000` it's slower?!

**Fast Redis Driver:**
`maxMs` is the longest it took for the app to receive a message, decode it, GET from Redis and return result to app (not to the client)

`avgMS` is the sum of each request divided by the number of requests.

`TotalMS:468225 avgMS: 1530 maxMS: 9503 opened: 20000 messages: 2000000`

**IORedis Driver:**

`TotalMS:547987 avgMS: 417 maxMS: 5548 opened: 20000 messages: 2000000`

**Redis Driver**

`TotalMS:480973 avgMS: 4123 maxMS: 29564 opened: 20000 messages: 2000000`

Even though ioRedis had quicker request times it took longer overall to process the queue.
