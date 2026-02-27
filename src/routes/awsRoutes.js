// server.js
const express = require("express");
const Router = express.Router();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("./../config/s3")
require("dotenv").config();


Router.get("/generate-presign-url", async (req, res) => {
  try {
    const { fileName, fileType } = req.query; // Pass filename and type from frontend
    if (!fileName || !fileType) {
      return res.status(400).json({ message: "Missing fileName or fileType" });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // URL valid for 5 mins

    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating presign URL" });
  }
});

Router.get("/",  async (req, res) => {
    res.json({
       sdgh: "cnvkbnkl1"
    })
})

module.exports = Router