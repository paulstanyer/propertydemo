"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRoutes = void 0;
const db_1 = require("./db");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class PropertyRoutes {
    constructor(app) {
        this.app = app;
        this.db = db_1.DB;
        this.upload = multer_1.default({ dest: "uploads/" });
    }
    configureRoutes() {
        this.app.get("/media/:image", ({ params }, res) => {
            res.sendFile(path_1.default.join(__dirname, "../uploads", params.image));
        });
        this.app.get("/property", (_, res) => {
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
        this.app.post("/property", this.upload.single("image"), (req, res) => {
            const property = JSON.parse(req.body.property);
            property.mainImage = req.file.path;
            const sql = `INSERT INTO property (address, price, image, thumbnail, createdOn, updatedOn) VALUES (?,?,?,?,?,?)`;
            this.db.run(sql, [
                property.address,
                property.price,
                property.mainImage,
                property.mainImage,
                property.createdOn,
                property.updatedOn,
            ], (err) => {
                console.log(err.message);
            });
            res.status(200).json(property);
        });
        this.app.route("/property/:id").get((req, res) => {
            this.db.all("SELECT * FROM property WHERE id=?", [req.params.id], (err, rows) => {
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
            });
        });
    }
}
exports.PropertyRoutes = PropertyRoutes;
//# sourceMappingURL=property.routes.js.map