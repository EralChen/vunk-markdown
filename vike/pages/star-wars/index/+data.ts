// https://vike.dev/data

import { useConfig } from "vike-vue/useConfig";
import type { Movie, MovieDetails } from "../types.js";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  // https://vike.dev/useConfig
  const config = useConfig();

  const response = await fetch(
    "https://swapi.dev/api/films/?format=json"
  );

  const res = (await response.json());
  const moviesData: MovieDetails[] = res.results

  config({
    // Set <title>
    title: `${moviesData.length} Star Wars Movies`,
  });

  // We remove data we don't need because the data is passed to the client; we should
  // minimize what is sent over the network.
  const movies = minimize(moviesData);

  return { movies };
}

function minimize(movies: MovieDetails[]): Movie[] {
  return movies.map((movie, index) => {
    const { title, release_date } = movie;

    return { title, release_date, id: index + 1 + ''};
  });
}
