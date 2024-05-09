"use client";
import { Anime, JikanClient, JikanResponse } from "@tutkli/jikan-ts";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import title from "../../libs/title";
import Link from "next/link";
import feather from "feather-icons";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination";

const CardAnime = () => {
  const [animes, setAnimes] = useState<Anime[]>();
  const [keyword, setKeyword] = useState("");
  const [pageFromApi, setPageFromApi] = useState<number>();
  const [page, setPage] = useState(1);
  const [] = useState();
  const router = useRouter();
  const jikanClient = new JikanClient();
  async function request() {
    setAnimes(undefined);
    const res: JikanResponse<Anime[]> = await jikanClient.seasons.getSeasonNow({
      page: page,
    });
    return res;
  }
  useEffect(() => {
    request().then((res) => setAnimes(res.data));
    request().then((res) => setPageFromApi(res.pagination?.last_visible_page));
  }, [page]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${keyword}`);
  };
  return (
    <>
      {animes && (
        <div className="px-4">
          <div className="flex justify-center md:justify-between items-center pb-5">
            <h1 className="text-2xl font-bold text-white hidden md:block">
              List Anime
            </h1>
            <form
              onSubmit={submit}
              className="bg-blue-600 py-1 px-3 flex gap-2 text-white rounded-full"
            >
              <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-transparent"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
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
          <div className="pt-7"></div>
          <Pagination page={page} setPage={setPage} pageFromApi={pageFromApi} />
        </div>
      )}
      {!animes && (
        <div className="flex justify-center items-center">
          <div className="pt-20"></div>
          <div className="loader"></div>
        </div>
      )}
      <div className="p-5"></div>
    </>
  );
};

export default CardAnime;
