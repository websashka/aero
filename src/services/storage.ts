import { S3 } from "@aws-sdk/client-s3";
import { config } from "../config";
import { v4 as uuidv4 } from "uuid";

interface File {
  buffer: Buffer;
  mimetype: string;
  name: string;
}

class StorageService {
  private s3client: S3;
  constructor() {
    this.s3client = new S3({
      region: config.S3_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async upload(file: File) {
    const key = uuidv4();
    await this.s3client.putObject({
      Bucket: config.S3_BUCKET,
      Body: file.buffer,
      Key: key,
      ContentType: file.mimetype,
      ContentDisposition: `attachment; filename="${encodeURI(file.name)}"`,
    });
    return {
      key,
    };
  }
  async delete(key: string) {
    await this.s3client.deleteObject({
      Bucket: config.S3_BUCKET,
      Key: key,
    });
  }
  async get(key: string) {
    const res = await this.s3client.getObject({
      Bucket: config.S3_BUCKET,
      Key: key,
    });
    if (!res.Body) {
      throw new Error("");
    }
    return res.Body;
  }
}

export default new StorageService();
