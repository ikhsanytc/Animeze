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

interface Collection {
  id: number;
  email: string;
  mal_id: number;
  created_at: Date;
}

export type { LinkNavbar, InputsLogin, User, Collection };
