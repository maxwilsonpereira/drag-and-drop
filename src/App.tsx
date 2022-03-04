import React, { useState, useEffect } from "react";
import classes from "./App.styles.module.scss";
import Playlists from "./components/playlists";
import TestCases from "./components/test-cases";
import { IPlaylist, ITestCase } from "./interfaces/interfaces";
import { getPlaylists, getTestCases } from "./services/http.service";

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [testsOfPlaylist, setTestsOfPlaylist] = useState<ITestCase[]>([]);

  useEffect(() => {
    getPlaylistsHandler();
    async function getPlaylistsHandler() {
      const res: IPlaylist[] = await getPlaylists();
      setPlaylists(res);
    }
  }, []);

  useEffect(() => {
    getPlaylistsHandler();
    async function getPlaylistsHandler() {
      const res: ITestCase[] = await getTestCases();
      setTestCases(res.slice(0, 30));
      setTestsOfPlaylist(res.slice(30, 40));
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.rootGrid}>
        <Playlists
          playlists={playlists}
          setPlaylists={(updated) => setPlaylists(updated)}
        />
        <TestCases
          testCases={testCases}
          setTestCases={(updated) => setTestCases(updated)}
          testsOfPlaylist={testsOfPlaylist}
          setTestsOfPlaylist={(updated) => setTestsOfPlaylist(updated)}
        />
      </div>
    </div>
  );
};

export default App;
