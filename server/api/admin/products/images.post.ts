import fs from "fs";
import path from "path";
import prisma from "~/utils/db";
export default defineEventHandler(async (event) => {
  const session = requireUserSession(event);
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "No formdata recieved",
    });
  }
  const uploadedFiles: string[] = [];
  for (const part of formData) {
    if (part.filename) {
      const fileName = `${new Date().getMilliseconds()}-${part.filename}`;
      const filePath = path.join(process.cwd(), "public/products", fileName);
      //   const filePath = `/public/products/${fileName}`;
      fs.writeFileSync(filePath, part.data);
      uploadedFiles.push(`/products/${fileName}`);
    }
  }
  if (uploadedFiles.length) {
    const images = await prisma.image.createManyAndReturn({
      data: uploadedFiles.map((path) => ({ url: path })),
    });
    return { images };
  }
  return { images: [] };
});
