import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import PlaylistList from "./PlaylistList";
import { IPlaylist } from "../../interfaces/interfaces";
import { getPlaylists } from "../../services/http.service";

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    getPlaylistsHandler();
    async function getPlaylistsHandler() {
      const res: IPlaylist[] = await getPlaylists();
      setPlaylists(res);
    }
  }, []);

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
      let aux;
      let updated = playlists;
      aux = updated[source.index];
      updated.splice(source.index, 1);
      updated.splice(destination.index, 0, aux);
      setPlaylists(updated);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PlaylistList playlists={playlists} setPlaylists={setPlaylists} />
    </DragDropContext>
  );
};

export default Playlists;