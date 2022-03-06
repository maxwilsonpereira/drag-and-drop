import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IPlaylist } from "../../interfaces/interfaces";
import PlaylistList from "./PlaylistList";

const Playlists: React.FC<{
  playlists: IPlaylist[];
  setPlaylists: (updated: IPlaylist[]) => void;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist: (cur: IPlaylist) => void;
}> = ({ playlists, setPlaylists, setSelectedPlaylist, selectedPlaylist }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const clone = [...playlists];
    clone[source.index].order = destination.index;
    if (source.index < destination.index) {
      for (let i = destination.index; i > source.index; i--) {
        clone[i].order = clone[i].order - 1;
      }
    } else {
      for (let i = destination.index; i < source.index; i++) {
        clone[i].order = clone[i].order + 1;
      }
    }
    setPlaylists(clone);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PlaylistList
        playlists={playlists}
        setPlaylists={(updated) => setPlaylists(updated)}
        selectedPlaylist={selectedPlaylist}
        setSelectedPlaylist={(cur) => setSelectedPlaylist(cur)}
      />
    </DragDropContext>
  );
};

export default Playlists;
