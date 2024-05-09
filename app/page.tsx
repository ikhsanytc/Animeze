import { Metadata } from "next";
import Navbar from "./components/Navbar";
import CardAnime from "./components/Home/CardAnime";
import Provider from "./components/Provider";
import getUser from "./libs/getUser";
import { supabase } from "./libs/supabase";

export const metadata: Metadata = {
  title: "Animeze | Home",
};

const Home = () => {
  return (
    <Provider>
      <Navbar />
      <div className="pt-20"></div>
      <CardAnime />
    </Provider>
  );
};

export default Home;
