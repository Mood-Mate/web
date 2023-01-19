import client from "./http_client";

class Auth {
  login = async (email, password) => {
    try {
      const user = await client.post("member/login", {
        email: email,
        password: password,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };
}

const authService = new Auth();
export default authService;
