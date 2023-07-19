import { revalidatePath } from "next/cache";

export const POST = async (req) => {
  const { paths } = await req.json();
  for (const path of paths) {
    revalidatePath(path);
    console.log("Revalidated path:", path);
  }
  return new Response("Done!", { status: 200 });
}