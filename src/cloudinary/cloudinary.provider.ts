import { v2 } from 'cloudinary'
import { CLOUDINARY } from '../constants/constants'
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dtg4on7io',
      api_key: '351421545233521',
      api_secret: 'LNm87TNfT5KLCa8OTBggyp34HPE',
    })
  },
}
