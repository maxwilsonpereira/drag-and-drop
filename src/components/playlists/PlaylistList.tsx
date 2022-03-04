import React from "react";
import { IPlaylist } from "../../interfaces/interfaces";
import Playlist from "./Playlist";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  playlists: IPlaylist[];
  setPlaylists: (updated: IPlaylist[]) => void;
}

const PlaylistList: React.FC<props> = ({ playlists, setPlaylists }) => {
  return (
    <div className={classes.listContainer} style={{ height: "25vh" }}>
      <div className={classes.listContainerTitle}>Other Playlists</div>
      <Droppable droppableId="PlaylistList">
        {(provided, snapshot) => (
          <div
            style={{ minHeight: "calc(75%)" }} // droppable area
            className={
              snapshot.isDraggingOver ? classes.listContainerActive : ""
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {playlists?.map((playlist, index) => (
              <Playlist
                key={playlist.id}
                index={index}
                playlists={playlists}
                playlist={playlist}
                setPlaylists={(updated) => setPlaylists(updated)}
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
