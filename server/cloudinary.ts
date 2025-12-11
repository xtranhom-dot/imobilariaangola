import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn("CLOUDINARY_CLOUD_NAME not set - image uploads will not work");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(buffer: Buffer, folder: string = "properties"): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `angola-imobiliaria/${folder}`,
        resource_type: "image",
        transformation: [
          { quality: "auto:good" },
          { fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload failed - no result"));
        }
      }
    ).end(buffer);
  });
}

export async function deleteFromCloudinary(publicUrl: string): Promise<void> {
  try {
    const publicIdMatch = publicUrl.match(/angola-imobiliaria\/[\w\/-]+/);
    if (publicIdMatch) {
      const publicId = publicIdMatch[0].replace(/\.\w+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

export { cloudinary };
