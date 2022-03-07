import React, { useState } from "react";
import { IPlaylist } from "../../interfaces/interfaces";
import Playlist from "./Playlist";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  playlists: IPlaylist[];
  setPlaylists: (updated: IPlaylist[]) => void;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist: (cur: IPlaylist) => void;
}

const PlaylistList: React.FC<props> = ({
  playlists,
  setPlaylists,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const [disableDrag, setDisableDrag] = useState(false);

  function addPlaylist() {
    const clone = [...playlists];
    let lastId = 0;
    for (let i = 0; i < clone.length; i++) {
      clone[i].order = clone[i].order + 1;
      if (clone[i].id > lastId) lastId = clone[i].id;
    }
    clone.unshift({
      order: 0,
      id: lastId + 1,
      name: "New Playlist",
      testCases: [],
      isNew: true,
    });
    setPlaylists(clone);
    const listContainer = document.getElementById("other-playlists");
    if (listContainer) {
      listContainer.scrollTop = 0;
    }
  }

  return (
    <div
      id="other-playlists"
      className={[
        classes.listContainer,
        disableDrag && classes.disableScroll,
      ].join(" ")}
      style={{ position: "relative", height: "25vh" }}
    >
      <div className={classes.listContainerTitle}>
        {playlists.length === 0
          ? "Add a Playlist"
          : selectedPlaylist && selectedPlaylist.id !== -1
          ? "Other Playlists"
          : "Select a Playlist"}
        <div
          className={[classes.addIcon, disableDrag && classes.disabled].join(
            " "
          )}
          title="add playlist"
          onClick={addPlaylist}
        >
          +
        </div>
      </div>

      <Droppable droppableId="PlaylistList">
        {(provided, snapshot) => (
          <div
            className={
              snapshot.isDraggingOver ? classes.listContainerActive : ""
            }
            style={{ minHeight: "calc(65%)" }} // droppable area
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {playlists
              ?.sort((a, b) => (a.order < b.order ? -1 : 1))
              .map((cur, index) => (
                <Playlist
                  key={cur.id}
                  index={index}
                  playlists={playlists}
                  playlistCur={cur}
                  setPlaylists={(updated) => setPlaylists(updated)}
                  selectedPlaylist={selectedPlaylist}
                  setSelectedPlaylist={(cur) => setSelectedPlaylist(cur)}
                  setDisableDrag={setDisableDrag}
                  disableDrag={disableDrag}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={classes.listContainerBottom} />
    </div>
  );
};

export default PlaylistList;
