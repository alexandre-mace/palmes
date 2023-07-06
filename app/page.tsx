"use client"

import Image from 'next/image'
import {useEffect, useState} from "react";
import filmsPalmeDOr from './../domain/movies.json'
import JSConfetti from 'js-confetti'

interface Movie {
    title: string,
    watched: boolean,
    year: number
}

export default function Home() {
    const [filmList, setFilmList] = useState<Movie[]>([]);
    const [watchedFilms, setWatchedFilms] = useState<string[]>([]);
    const [randomFilm, setRandomFilm] = useState<Movie|null>(null);

    useEffect(() => {
        const storedWatchedFilms = JSON.parse(localStorage.getItem('watchedFilms') || '{}')
        if (storedWatchedFilms) {
            setWatchedFilms(storedWatchedFilms);
        }

        const films = filmsPalmeDOr.map(film => ({
            ...film,
            watched: storedWatchedFilms.includes(film.title)
        }));
        setFilmList(films);
    }, []);

    useEffect(() => {
        localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
    }, [watchedFilms]);

    const toggleFilmWatched = (title: String) => {
        const updatedFilms = filmList.map(film => {
            if (film.title === title) {
                return { ...film, watched: !film.watched };
            }
            return film;
        });
        setFilmList(updatedFilms);

        const updatedWatchedFilms = updatedFilms
            .filter(film => film.watched)
            .map(film => film.title);
        setWatchedFilms(updatedWatchedFilms);
    };

    const getRandomFilm = () => {
        const unseenFilms = filmList.filter(film => !film.watched);
        if (unseenFilms.length > 0) {
            const randomIndex = Math.floor(Math.random() * unseenFilms.length);
            setRandomFilm(unseenFilms[randomIndex]);
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
                emojis: ['🎬', '🍿', '📽️', '🎞️', '📀', '🕴️', '🎥'],
            })
        } else {
            setRandomFilm(null);
        }
    };

  return (
    <main className={"container mx-auto mt-4 px-2"}>
      <div>
        <h1 className={"mb-10 text-3xl tracking-tight mx-auto text-center"}>Liste des Palmes d&apos;Or</h1>
          <div className="text-center mb-10">
              <button className={"inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2"} onClick={getRandomFilm}>On regarde quoi ? 👀</button>
          </div>
          {randomFilm && (
              <div className={"mb-10 text-center"}>
                  <h2>Ce soir, on regarde :</h2>
                  <p className={"font-medium text-xl mt-3"}>{randomFilm.title}</p>
                  <div className={"text-slate-600 text-md"}>{randomFilm.year}</div>
              </div>
          )}
        <ul className={"grid grid-cols-2 md:grid-cols-5 gap-3"}>
          {filmList.map(film => (
              <li key={film.title} className={"bg-slate-100 p-4 rounded-xl text-center"}>
                  <div>{film.title}</div>
                  <div className={"text-slate-600 text-sm mb-2"}>{film.year}</div>
                  <div className={"text-center"}>
                      {film.watched &&
                          <button onClick={() => toggleFilmWatched(film.title)} className={"inline-flex items-center justify-center text-sm rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-black/90 h-7 px-3 py-1"}>
                              Vu 👀
                          </button>
                      }
                      {!film.watched &&
                          <button onClick={() => toggleFilmWatched(film.title)} className={"inline-flex items-center justify-center text-sm rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-7 px-3 py-1"}>
                              À voir 🍿
                          </button>
                      }
                  </div>
              </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
