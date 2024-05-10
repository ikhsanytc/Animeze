"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Provider from "../components/Provider";

function Page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 500);
  }, []);
  return (
    <Provider center>
      <div className="bg-black text-white w-full md:w-1/2 p-2 rounded-lg text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Success</h1>
        <hr className="border-[2px] mt-2" />
        <p className="mt-4">Wait, you will be redirect...</p>
        <div className="mb-5"></div>
      </div>
    </Provider>
  );
}

export default Page;
