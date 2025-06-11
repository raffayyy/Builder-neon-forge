import { Router, Request, Response } from "express";
import {
  uploadImage,
  uploadDocument,
  uploadAny,
  getFileUrl,
  deleteFile,
} from "../utils/upload";
import { authenticateToken, requireEditor } from "../middleware/auth";

const router = Router();

// Upload single image
router.post(
  "/image",
  authenticateToken,
  requireEditor,
  uploadImage.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          url: getFileUrl(req.file.filename),
        },
        message: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload image error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Upload multiple images
router.post(
  "/images",
  authenticateToken,
  requireEditor,
  uploadImage.array("images", 10),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({
          success: false,
          error: "No files uploaded",
        });
        return;
      }

      const uploadedFiles = files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        url: getFileUrl(file.filename),
      }));

      res.status(200).json({
        success: true,
        data: uploadedFiles,
        message: `${files.length} images uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload images error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Upload document
router.post(
  "/document",
  authenticateToken,
  requireEditor,
  uploadDocument.single("document"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          url: getFileUrl(req.file.filename),
        },
        message: "Document uploaded successfully",
      });
    } catch (error) {
      console.error("Upload document error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Upload any file
router.post(
  "/file",
  authenticateToken,
  requireEditor,
  uploadAny.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimeType: req.file.mimetype,
          url: getFileUrl(req.file.filename),
        },
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Upload file error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Delete file
router.delete(
  "/:filename",
  authenticateToken,
  requireEditor,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { filename } = req.params;

      await deleteFile(filename);

      res.status(200).json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      console.error("Delete file error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete file",
      });
    }
  },
);

export default router;
