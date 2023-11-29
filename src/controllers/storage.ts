import { Request, Response } from "express";
import { File } from "../entities/File";
import { AppDataSource } from "../data-source";
import StorageService from "../services/storage";
import { Readable } from "stream";

class StorageController {
  async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found.",
      });
    }

    const { key } = await StorageService.upload({
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      buffer: req.file.buffer,
    });
    const file = new File();
    file.name = req.file.originalname;
    file.size = req.file.size;
    file.type = req.file.mimetype;
    file.key = key;

    const fileRepository = AppDataSource.getRepository(File);
    await fileRepository.save(file);

    return res.status(201).json({ file });
  }

  async getList(req: Request, res: Response) {
    const listSize = parseInt(req.query.list_size?.toString() || "10");
    const page = parseInt(req.query.page?.toString() || "1");

    const fileRepository = AppDataSource.getRepository(File);

    const files = await fileRepository.find({
      take: listSize,
      skip: (page - 1) * (listSize + 1),
    });

    return res.json({
      files,
    });
  }

  async deleteFile(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id required.",
      });
    }
    const fileRepository = AppDataSource.getRepository(File);
    await fileRepository.delete(id);
    return res.json({
      id,
    });
  }

  async getFile(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id required.",
      });
    }

    const fileRepository = AppDataSource.getRepository(File);
    const file = await fileRepository.findOne({
      where: {
        id,
      },
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }

    return res.status(200).json({ file });
  }

  async downloadFile(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id required.",
      });
    }

    const fileRepository = AppDataSource.getRepository(File);
    const file = await fileRepository.findOne({
      where: {
        id,
      },
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }

    const body = await StorageService.get(file.key);
    if (body instanceof Readable) {
      res.attachment(file.name);
      return body.pipe(res);
    }
  }

  async updateFile(req: Request, res: Response) {
    const fileRepository = AppDataSource.getRepository(File);
  }
}

export default new StorageController();
