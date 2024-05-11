"use client";
import { Anime, AnimeCharacter, JikanClient } from "@tutkli/jikan-ts";
import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import { PostgrestSingleResponse, User } from "@supabase/supabase-js";
import { Collection } from "@/app/types/all-types";
import getUser from "@/app/libs/getUser";
import { supabase } from "@/app/libs/supabase";

interface Props {
  mal_id: number;
}

const CardDetail: React.FC<Props> = ({ mal_id }) => {
  const [anime, setAnime] = useState<Anime>();
  const [characters, setCharacters] = useState<AnimeCharacter[]>();
  const [collection, setCollection] = useState(false);
  const [user, setUser] = useState<User>();
  const jikanClient = new JikanClient();
  async function request() {
    const res = await jikanClient.anime.getAnimeFullById(mal_id);
    return res;
  }
  async function request1() {
    const res = await jikanClient.anime.getAnimeCharacters(mal_id);
    return res;
  }
  async function request2() {
    const user = await getUser();
    if (user) {
      const { data }: PostgrestSingleResponse<Collection> = await supabase
        .from("collection")
        .select()
        .eq("email", user.email)
        .eq("mal_id", mal_id)
        .single();
      return {
        data,
        user,
      };
    }
    return {
      data: null,
      user,
    };
  }
  useEffect(() => {
    request().then((res) => setAnime(res.data));
    request1().then((res) => setCharacters(res.data));
    request2().then((res) => {
      if (res.data) {
        setCollection(true);
      }
      if (res.user) {
        setUser(res.user);
      }
    });
  }, []);
  function status(airing: boolean) {
    if (airing) {
      return "Ongoing";
    } else {
      return "Finished";
    }
  }
  async function collectionAdd() {
    const { error } = await supabase.from("collection").insert({
      email: user?.email,
      mal_id,
    });
    if (error) console.error(error);
    if (!error) setCollection(true);
  }
  // console.log(characters);
  return (
    <>
      {!anime && (
        <div className="flex justify-center items-center">
          <div className="pt-20"></div>
          <div className="loader"></div>
        </div>
      )}
      {anime && (
        <div className="px-4">
          <div className="pt-7"></div>
          <div className="flex justify-center">
            <div className="bg-gray-600 p-2 rounded-lg">
              <img
                src={anime.images.webp?.image_url}
                className="rounded-lg"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
          <h1 className="text-center pt-4 text-white font-bold text-2xl lg:text-4xl">
            {anime.title}
          </h1>
          <div className="bg-gray-600 w-full mx-auto md:w-1/2 p-3 mt-20 rounded-lg">
            <h1 className="text-2xl text-center mb-10 font-bold text-white md:text-3xl underline underline-offset-4">
              Information
            </h1>
            <div className="flex gap-2 text-white justify-center flex-wrap">
              {anime.genres.map((genre, idx) => (
                <button
                  className="bg-blue-600 py-1 px-3 rounded-full"
                  key={idx}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-center mt-10">
              <button className="bg-black text-white p-3 rounded-xl cursor-default">
                <p className="font-semibold">Rilis</p>
                <p>{anime.year}</p>
              </button>
              <button className="bg-black text-white p-3 rounded-xl cursor-default">
                <p className="font-semibold">Episodes</p>
                <p>{anime.episodes ? anime.episodes : "Not Known"}</p>
              </button>
              <button className="bg-black text-white p-3 rounded-xl cursor-default">
                <p className="font-semibold">Status</p>
                <p>{status(anime.airing)}</p>
              </button>
            </div>
            <div className="pt-10"></div>
            <div className="px-4 leading-relaxed text-white text-base">
              {anime.synopsis}
            </div>
            <div className="p-10"></div>
          </div>
          {!characters && (
            <div className="flex justify-center items-center">
              <div className="pt-20"></div>
              <div className="loader"></div>
            </div>
          )}
          {characters && (
            <div className="bg-gray-600 w-full mx-auto md:w-1/2 p-3 mt-10 rounded-lg text-white">
              <h1 className="text-center underline underline-offset-4 text-2xl font-bold md:text-3xl mb-5">
                Characters
              </h1>
              <div className="flex gap-2 flex-col">
                {characters.map((character, idx) => (
                  <div
                    key={idx}
                    className="bg-black w-full p-3 rounded-lg flex justify-between gap-4"
                  >
                    <div className="flex gap-1">
                      <img
                        src={character.character.images.webp?.image_url}
                        width={64}
                        loading="lazy"
                        className="rounded-lg"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">
                          {character.character.name}
                        </p>
                        <p>{character.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 items-end">
                      <p className="font-medium">
                        {character.voice_actors[0]?.person.name}
                      </p>
                      <img
                        src={
                          character.voice_actors[0]?.person.images.webp
                            ? character.voice_actors[0]?.person.images.webp
                                .image_url
                            : character.voice_actors[0]?.person.images.jpg
                                .image_url
                        }
                        className="rounded-lg"
                        width={64}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-10"></div>
          {user && !collection && (
            <div
              className="bottom-7 right-7 fixed bg-blue-600 p-3 flex gap-3 cursor-pointer rounded-lg text-white"
              onClick={collectionAdd}
            >
              <div
                dangerouslySetInnerHTML={{ __html: feather.icons.plus.toSvg() }}
                className=""
              ></div>
              <p className="hidden md:block">Add to my collection</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardDetail;
