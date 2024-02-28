export const getFeedPaper = async (tags) => {
  const res = await fetch(
    "https://newton-tan.vercel.app/api/files?tags=" + tags
  );
  const data = await res.json();
  return data;
};
