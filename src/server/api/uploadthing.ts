import { createNextRouteHandler } from "uploadthing/next";
import { uploadRouter } from "../uploadthing";

export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
});
