"use client";
import Link from "next/link";
import feather from "feather-icons";
import React, { useEffect, useRef, useState } from "react";
import { LinkNavbar } from "../types/all-types";
import { useRouter } from "next/navigation";

interface Props {
  back?: string | number;
}
const Navbar: React.FC<Props> = ({ back }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  function clickOutside(e: MouseEvent) {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setSidebar(false);
    }
  }
  function toggleSidebar() {
    setSidebar(!sidebar);
  }
  useEffect(() => {
    setTitle(document.title);
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);
  //   console.log(title.includes("Home") ? "yes" : "no");
  const links: LinkNavbar[] = [
    {
      display: "Home",
      link: "/",
    },
  ];
  function kembali() {
    if (back && back === -1) {
      router.back();
    } else {
      router.push(`${back}`);
    }
  }
  return (
    <>
      <nav className="bg-blue-600 fixed top-0 w-full p-3 flex justify-between z-40">
        <div className="flex gap-2 items-center">
          {back && (
            <div
              dangerouslySetInnerHTML={{
                __html: feather.icons["arrow-left"].toSvg(),
              }}
              className="cursor-pointer"
              onClick={kembali}
            ></div>
          )}
          <h1 className="font-bold text-xl lg:text-2xl">Animeze</h1>
        </div>
        <div className="hidden lg:flex gap-4">
          {links.map((link, idx) => (
            <Link
              href={link.link}
              key={idx}
              className={`font-semibold ${
                title.includes(link.display) ? "text-white" : "hover:text-white"
              }`}
            >
              {link.display}
            </Link>
          ))}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: feather.icons.menu.toSvg() }}
          className="active:text-white cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        ></div>
      </nav>
      <div
        ref={sidebarRef}
        className={`bg-black bg-opacity-80 fixed inset-y-0 right-0 ${
          sidebar ? "w-64" : "w-0 opacity-0"
        } backdrop-filter backdrop-blur-xl py-2 px-3 text-white transition-all ease-in-out duration-300 z-50`}
      >
        <h1 className="text-xl underline underline-offset-4 text-center">
          Animeze
        </h1>
        <div className="pt-5"></div>
        <div className="flex flex-col gap-3">
          {links.map((link, idx) => (
            <Link href={link.link} key={idx}>
              <button
                className={`${
                  title.includes(link.display)
                    ? "bg-gray-500"
                    : "bg-transparent active:bg-gray-700"
                } w-full py-2 px-3 text-left rounded-lg`}
              >
                {link.display}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
