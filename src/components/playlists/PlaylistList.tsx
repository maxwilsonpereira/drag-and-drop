import React from "react";
import { IPlaylist } from "../../interfaces/interfaces";
import Playlist from "./Playlist";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  playlists: Array<IPlaylist>;
  setPlaylists: React.Dispatch<React.SetStateAction<Array<IPlaylist>>>;
}

const PlaylistList: React.FC<props> = ({ playlists, setPlaylists }) => {
  return (
    <div className={classes.listContainer}>
      <Droppable droppableId="PlaylistList">
        {(provided, snapshot) => (
          <div
            className={[
              classes.playlists,
              snapshot.isDraggingOver ? classes.listContainerActive : "",
            ].join(" ")}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {playlists?.map((playlist, index) => (
              <Playlist
                key={playlist.id}
                index={index}
                playlists={playlists}
                playlist={playlist}
                setPlaylists={setPlaylists}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default PlaylistList;
