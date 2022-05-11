import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream')
import sharp from 'sharp'
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'techblog' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        },
      )

      toStream(sharp(file.buffer).webp({ quality: 20 })).pipe(upload)
    })
  }
}
