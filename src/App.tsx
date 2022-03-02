import React from "react";
import classes from "./App.styles.module.scss";
import Playlists from "./components/playlists";
import TestCases from "./components/test-cases";

const App: React.FC = () => {
  return (
    <div className={classes.root}>
      <div className={classes.rootGrid}>
        <div>
          <div style={{ height: 25 }}>Other Playlists</div>
          <div
            className={classes.containerWrapper}
            style={{ maxHeight: "calc(25vh - 25px)", marginBottom: 20 }}
          >
            <Playlists />
          </div>
          <div style={{ height: 25 }}>Test Cases</div>
          <div
            className={classes.containerWrapper}
            style={{ maxHeight: "calc(60vh - 25px - 20px)" }}
          >
            <TestCases />
          </div>
        </div>
        <div>
          <div style={{ height: 25 }}>Playlist Name</div>
          <div
            className={classes.containerWrapper}
            style={{ maxHeight: "calc(85vh - 25px)" }}
          >
            <TestCases />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
