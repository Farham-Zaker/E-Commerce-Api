import config from "../config/config";
const port: number = config.port;

export default {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "E Commerce Api", // short title.
    version: "1.0.0", // version number
    contact: {
      name: "Farham Zaker",
      email: "farham.zaler007@gmail.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: "E Commerce Api",
    },
  ],
};
