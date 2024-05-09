interface LinkNavbar {
  display: string;
  link: string;
}

interface InputsLogin {
  email: string;
  password: string;
}

interface User {
  email: string;
  img: string;
  username: string;
  userId: string;
  created_at: string;
}

export type { LinkNavbar, InputsLogin, User };
