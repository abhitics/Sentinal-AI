const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const cors = require("cors");

const app = express();

app.use(cors()); 

const upload = multer({ dest: "uploads/" });

app.post("/detect", upload.single("image"), async (req, res) => {
    const form = new FormData();
    form.append("image", fs.createReadStream(req.file.path));

    try {
        const response = await axios.post(
            "http://localhost:5001/detect",
            form,
            { headers: form.getHeaders() }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).send("Error processing image");
    }
});

const path = require("path");

app.get("/output.jpg", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../PythonModel/output.jpg"));
});

app.listen(5000, () => console.log("Node server running on port 5000"));