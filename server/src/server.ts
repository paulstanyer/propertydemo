import express from "express";

import * as http from "http";
import * as bodyParser from "body-parser";
import { AddressInfo } from "net";

import cors from "cors";

import { PropertyRoutes } from "./property.routes";
import debug from "debug";

const app = express();

app.use(cors());

const routes = new PropertyRoutes(app).configureRoutes();

const server = http.createServer(app);

const debugLog: debug.IDebugger = debug("app");

/*
app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);*/

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

server.listen(4000, "0.0.0.0", () => {
  const { port, address } = server.address() as AddressInfo;
  console.log("Server listening on:", "http://" + address + ":" + port);
});
