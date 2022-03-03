import React from "react";
import classes from "./App.styles.module.scss";
import Playlists from "./components/playlists";
import TestCases from "./components/test-cases";

const App: React.FC = () => {
  return (
    <div className={classes.root}>
      <div className={classes.rootGrid}>
        <Playlists />
        <TestCases />
      </div>
    </div>
  );
};

export default App;
