import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../configs/s3.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (fileBuffer, mimeType, userId) => {
    const uniqueName = `avatars/${userId}`;

    const upload = new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_BUCKET,
            Key: uniqueName,
            Body: fileBuffer,
            ContentType: mimeType,
        }
    })

    const result = await upload.done();

    return result.Location;
}


export const deleteFromS3 = async (fileUrl) => {
    const url = new URL(fileUrl);
    const key = decodeURIComponent(url.pathname.slice(1));

    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: key
        })
    )
}
    
