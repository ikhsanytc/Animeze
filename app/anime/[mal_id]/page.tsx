import CardDetail from "@/app/components/Anime/CardDetail";
import Navbar from "@/app/components/Navbar";
import Provider from "@/app/components/Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime | Detail",
};

function Page({ params }: { params: { mal_id: number } }) {
  return (
    <Provider>
      <Navbar back={-1} />
      <div className="pt-20"></div>
      <CardDetail mal_id={params.mal_id} />
    </Provider>
  );
}

export default Page;
