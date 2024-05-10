"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return <></>;
}

export default Page;
