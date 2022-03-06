import axios from "axios";
import { IPlaylist, ITestCase } from "../interfaces/interfaces";

export async function getPlaylists(): Promise<IPlaylist[]> {
  const playlists: IPlaylist[] = [];
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  let current = 0;
  data.forEach((cur: any) => {
    playlists.push({
      order: cur.id - 1,
      id: cur.id,
      name: cur.id + "- " + cur.name,
      testCases: [],
    });
    current = current + 2;
  });
  return playlists;
}

export async function getTestCases() {
  const testCases: ITestCase[] = [];
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/albums"
  );
  data.forEach((cur: any) => {
    const firstWords: string = cur.title.split(" ").slice(0, 2).join(" ");
    testCases.push({
      order: cur.id - 1,
      id: cur.id,
      name: cur.id + "- " + firstWords,
    });
  });
  return testCases;
}
