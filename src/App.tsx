import React, { useState, useEffect } from "react";
import classes from "./App.styles.module.scss";
import Playlists from "./components/playlists";
import TestCases from "./components/test-cases";
import { IPlaylist, ITestCase } from "./interfaces/interfaces";
import { getPlaylists, getTestCases } from "./services/http.service";

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<IPlaylist>();
  const [testCases, setTestCases] = useState<ITestCase[]>([]);

  useEffect(() => {
    getPlaylistsHandler();
    getTestCasesHandler();
  }, []);

  async function getPlaylistsHandler() {
    const res: IPlaylist[] = await getPlaylists();
    setPlaylists(res);
  }
  async function getTestCasesHandler() {
    const res: ITestCase[] = await getTestCases();
    setTestCases(res.slice(0, 30));
  }

  return (
    <div className={classes.root}>
      <div className={classes.rootGrid}>
        <Playlists
          playlists={playlists}
          setPlaylists={(updated) => setPlaylists(updated)}
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={(cur) => setSelectedPlaylist(cur)}
        />
        <TestCases
          testCases={testCases}
          setTestCases={(updated) => setTestCases(updated)}
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={(cur) => setSelectedPlaylist(cur)}
        />
      </div>
    </div>
  );
};

export default App;
