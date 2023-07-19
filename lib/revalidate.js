const revalidateMany = async(paths) => {
  await fetch("/api/revalidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paths }),
    cache: "no-cache",
  },);
}

export const revalidatePost = async(username, slug) => {
  const paths = [`/${username}`, `/${username}/${slug}`];
  await revalidateMany(paths);
}

export const revalidateUser = async(username) => {
  const paths = [`/${username}`];
  await revalidateMany(paths);
}