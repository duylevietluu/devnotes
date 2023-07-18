import { revalidatePath } from "next/cache";

export const POST = async (req) => {
  const { path } = await req.json();
  revalidatePath(path);
  return new Response(path, { status: 200 });
}