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
      id: cur.id,
      name: cur.name,
      testCases: [cur.id + current, cur.id + current + 1, cur.id + current + 2],
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
    testCases.push({ id: cur.id, name: cur.id + "- " + firstWords });
  });
  return testCases;
}
