import Navbar from "@/app/components/Navbar";
import Provider from "@/app/components/Provider";
import CardSearch from "@/app/components/Search/CardSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animeze | Search",
};

const Page = ({ params }: { params: { keyword: string } }) => {
  return (
    <Provider>
      <Navbar back="/" />
      <CardSearch keyword={params.keyword} />
    </Provider>
  );
};

export default Page;
