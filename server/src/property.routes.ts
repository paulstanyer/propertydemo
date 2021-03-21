import express, { Request, Response } from "express";
import { Database } from "sqlite3";
import { DB } from "./db";
import multer, { Multer } from "multer";
import path from "path";

export class PropertyRoutes {
  app: express.Application;
  db: Database;
  upload: Multer;

  constructor(app: express.Application) {
    this.app = app;
    this.db = DB;
    this.upload = multer({ dest: "uploads/" });
  }

  configureRoutes() {
    this.app.get("/media/:image", ({ params }: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../uploads", params.image));
    });
    this.app.get("/property", (_, res: Response) => {
      this.db.all("SELECT * FROM property", [], (err, rows) => {
        if (err) {
          res.status(400).json({
            isSuccess: false,
            properties: [],
            errors: err.message,
          });
        }
        res.json({
          isSuccess: true,
          properties: rows,
        });
      });
    });
    this.app.post(
      "/property",
      this.upload.single("image"),
      (req: Request, res: Response) => {
        const property = JSON.parse(req.body.property);
        property.mainImage = req.file.path;
        const sql = `INSERT INTO property (address, price, image, thumbnail, createdOn, updatedOn) VALUES (?,?,?,?,?,?)`;
        this.db.run(
          sql,
          [
            property.address,
            property.price,
            property.mainImage,
            property.mainImage,
            property.createdOn,
            property.updatedOn,
          ],
          (err) => {
            console.log(err.message);
          }
        );
        res.status(200).json(property);
      }
    );

    this.app.route("/property/:id").get((req: Request, res: Response) => {
      this.db.all(
        "SELECT * FROM property WHERE id=?",
        [req.params.id],
        (err, rows) => {
          if (err) {
            res.status(400).json({
              isSuccess: false,
              property: [],
              errors: err.message,
            });
          }
          res.json({
            isSuccess: true,
            property: rows[0],
          });
        }
      );
    });
  }
}
