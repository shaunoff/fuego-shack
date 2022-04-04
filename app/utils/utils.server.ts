import cloudinary from "cloudinary";
import type { Stream } from "stream";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME || "hutches",
  api_key: process.env.API_KEY || "559989467639984",
  api_secret: process.env.API_SECRET || "RIbpgJAuHWV7Ac9AGoIlsltiImo",
});

async function uploadCloudinaryImage(fileStream: Stream) {
  return new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "remix",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject("cloudinary did not return a result");
        }
        resolve(result);
      }
    );
    fileStream.pipe(uploadStream);
  });
}
export { uploadCloudinaryImage };
