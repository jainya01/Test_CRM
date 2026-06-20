// import { createClient } from "redis";

// const redisClient = createClient();
// redisClient.on("error", (err) => console.log("error", err));
// await redisClient.connect();

// async function xyz() {
//   const values = await redisClient.set("username", "sohan singh");
//   console.log(values);

//   const result = await redisClient.get("username");
//   console.log(result);

//   const result = await redisClient.del("username");
//   console.log(result);
// }

// xyz();

// const xyz = async () => {
//   const setValues = await redisClient.set("username", "Rohan singh");
//   console.log(setValues);
//   const getValues = await redisClient.get("username");
//   console.log(getValues);
//   const delvalues = await redisClient.del("username");
//   console.log(delvalues);
//   const ttvalues = await redisClient.ttl("username");
//   console.log(ttvalues);
// const result = await redisClient.expire("username", 120);
// console.log(result);
// };

// xyz();
