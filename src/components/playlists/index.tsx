import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IPlaylist } from "../../interfaces/interfaces";
import PlaylistList from "./PlaylistList";

const Playlists: React.FC<{
  playlists: IPlaylist[];
  setPlaylists: (updated: IPlaylist[]) => void;
}> = ({ playlists, setPlaylists }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId === "PlaylistList") {
      const aux = playlists[source.index];
      playlists.splice(source.index, 1);
      playlists.splice(destination.index, 0, aux);
      setPlaylists(playlists);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PlaylistList
        playlists={playlists}
        setPlaylists={(updated) => setPlaylists(updated)}
      />
    </DragDropContext>
  );
};

export default Playlists;
