export const handleCite = async (id) => {
  const res = await fetch(
    "https://newton-tan.vercel.app/api/files/cite/" + id,
    {
      cache: "no-cache",
    }
  );
};
