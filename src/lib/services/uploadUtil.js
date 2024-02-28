export const handleUpload = async (FormData) => {
  try {
    const { title, abstract, tag, file } = FormData;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      title,
      abstract,
      tags: tag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // NEXT_PUBLIC_URL;
    const reponse = await fetch(
      "https://newton-tan.vercel.app/api/files",
      requestOptions
    );
    const data = await reponse.json();
    console.log(data);
    if (data.status === 201) {
      const { postUrl } = data;
      //   const myHeaders = new Headers();
      const awsMyHeaders = new Headers();
      awsMyHeaders.append("Content-Type", "application/pdf");

      const binaryFile = Buffer.from(await file.arrayBuffer());

      const awsRequestOptions = {
        method: "PUT",
        headers: awsMyHeaders,
        body: binaryFile,
        redirect: "follow",
      };
      const awsResponse = await fetch(postUrl, awsRequestOptions);
      console.log(awsResponse);
    } else {
      throw err;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFileData = async (id) => {
  try {
    const response = await fetch(
      `https://newton-tan.vercel.app/api/files/${id}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
