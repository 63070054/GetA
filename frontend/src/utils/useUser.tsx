import Cookies from "js-cookie";

export const useUser = () => {

  const token = Cookies.get("token") || ""
  const decodedToken: User = token ? JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))?.[0] : null;
  console.log(decodedToken?.id)
  return {
    ...decodedToken
  };

};
