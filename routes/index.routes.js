const express = require("express");
const s3 = require("../config/S3.config");
const router = express.Router();
const upload = require("../config/multer.config");
const filemodel = require("../models/file.model");
const authMiddleware = require("../middlewares/auth");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

router.get("/", authMiddleware, async (req, res) => {
  const userFiles = await filemodel.find({
    user: req.user.userId,
  });

  res.render("home", {
    files: userFiles,
    success: req.query.success,
  });
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    const newFile = await filemodel.create({
      path: req.file.key,
      orginalname: req.file.originalname,
      user: req.user.userId,
    });

    res.redirect("/?success=1");
  }
);

router.get("/download/:path", authMiddleware, async (req, res) => {
  const path = req.params.path;
  const userId = req.user.userId;

  try {
    const file = await filemodel.findOne({ path, user: userId });

    if (!file) {
      return res
        .status(404)
        .json({ message: "File not found or unauthorized" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.path,
    });

    const s3Response = await s3.send(command);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.orginalname}"`
    );
    res.setHeader(
      "Content-Type",
      s3Response.ContentType || "application/octet-stream"
    );

    s3Response.Body.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).send("❌ Could not download, something went wrong.");
  }
});

module.exports = router;
