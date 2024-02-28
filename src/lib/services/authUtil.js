import { signIn } from "next-auth/react";
export const login = async (FormData) => {
  try {
    const obj = await signIn("credentials", {
      ...FormData,
      callbackUrl: "/app/home",
    });
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (FormData) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(FormData);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://newton-tan.vercel.app/api/signup",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
