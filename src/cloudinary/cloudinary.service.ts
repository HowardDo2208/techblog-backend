import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream')
import sharp = require('sharp')
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const data = await sharp(file.buffer).webp({ quality: 50 }).toBuffer()
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'techblog' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        },
      )
      toStream(data).pipe(upload)
    })
  }
}
