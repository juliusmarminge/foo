import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "./auth";

const f = createUploadthing();
/**
 * This is your Uploadthing file router. For more information:
 * @see https://docs.uploadthing.com/api-reference/server#file-routes
 */

const handleAuth = async () => {
  const session = await getServerAuthSession();
  if (!session ?? !session?.user) throw new Error("some error");
  return { userId: session.user.id };
};

export const uploadRouter = {
  videoAndImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
    video: {
      maxFileSize: "16MB",
    },
  })
    .middleware(async () => {
      return await handleAuth();
    })
    .onUploadComplete(({ file, metadata }) => {
      metadata;
      // ^?
      console.log("upload completed", file);
    }),
  documentUploader: f({
    blob: { maxFileSize: "4MB", contentDisposition: "attachment" },
  })
    .middleware(async () => {
      return await handleAuth();
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("onUploadComplete", metadata, file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
