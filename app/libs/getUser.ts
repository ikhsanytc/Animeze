import { cookies } from "next/headers";

function getUser() {
  const user = cookies().get("user");
  const session = cookies().get("session");
  if (user && session) {
    return {
      user,
      session,
    };
  }
  return {
    user: null,
    session: null,
  };
}

export default getUser;
