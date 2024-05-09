"use client";

import title from "@/app/libs/title";
import { Anime, JikanClient } from "@tutkli/jikan-ts";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import feather from "feather-icons";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination";

interface Props {
  keyword: string;
}

const CardSearch: React.FC<Props> = ({ keyword }) => {
  const [animes, setAnimes] = useState<Anime[]>();
  const [input, setInput] = useState("");
  const [pageFromApi, setPageFromApi] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const keywordFix = decodeURI(keyword);
  const router = useRouter();
  const jikanClient = new JikanClient();
  async function request() {
    setAnimes(undefined);
    const res = await jikanClient.anime.getAnimeSearch({ q: keyword, page });
    return res;
  }
  useEffect(() => {
    if (keyword !== "") {
      request().then((res) => setAnimes(res.data));
      request().then((res) =>
        setPageFromApi(res.pagination?.last_visible_page)
      );
    } else {
      router.back();
    }
  }, [page]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${input}`);
  }
  // console.log(animes);
  return (
    <>
      <div className="px-4">
        {animes && (
          <>
            <div className="flex justify-center md:justify-between items-center pb-5 pt-20">
              <h1 className="text-2xl font-bold text-white hidden md:block">
                List Anime
              </h1>
              <form
                onSubmit={submit}
                className="bg-blue-600 py-1 px-3 flex gap-2 text-white rounded-full"
              >
                <input
                  type="text"
                  className="outline-none bg-transparent"
                  placeholder="Search..."
                  defaultValue={keywordFix}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                  }
                />
                <button
                  type="submit"
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.search.toSvg(),
                  }}
                ></button>
              </form>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {animes.map((anime, idx) => (
                <Link
                  key={idx}
                  href={`/anime/${anime.mal_id}`}
                  className="bg-gray-700 p-2 flex-col gap-2 text-white rounded-lg active:scale-105 active:-inset-y-1 transition duration-100 cursor-pointer"
                >
                  <img
                    src={
                      anime.images.webp
                        ? anime.images.webp.image_url
                        : anime.images.jpg.image_url
                    }
                    className="w-full rounded-lg"
                    loading="lazy"
                    alt=""
                  />
                  <h1>{title(anime.title)}</h1>
                </Link>
              ))}
            </div>
            <div className="pt-5"></div>
            <Pagination
              page={page}
              setPage={setPage}
              pageFromApi={pageFromApi}
            />
          </>
        )}
        {!animes && (
          <div className="flex justify-center items-center pt-20">
            <div className="pt-20"></div>
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="pt-10"></div>
    </>
  );
};

export default CardSearch;
