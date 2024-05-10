import { Metadata } from "next";
import CardLogin from "../components/Login/CardLogin";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";

export const metadata: Metadata = {
  title: "Animeze | Login",
};

function Page() {
  return (
    <>
      <Provider center>
        <Navbar />
        <CardLogin />
      </Provider>
    </>
  );
}

export default Page;
