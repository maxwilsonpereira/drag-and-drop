import { AiFillDelete } from "react-icons/ai";
import { IPlaylist } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

const SingleTodo: React.FC<{
  index: number;
  playlists: IPlaylist[];
  playlist: IPlaylist;
  setPlaylists: (updated: IPlaylist[]) => void;
}> = ({ index, playlists, playlist, setPlaylists }) => {
  const handleDelete = (id: number) => {
    setPlaylists(playlists.filter((cur) => cur.id !== id));
  };

  return (
    <Draggable
      draggableId={playlist.id.toString()}
      index={index}
      isDragDisabled={playlists.length <= 1}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={[
            classes.listItem,
            snapshot.isDragging && classes.listItemDrag,
          ].join(" ")}
        >
          <span className={classes.listItemTitle}>{playlist.name}</span>
          {!snapshot.isDragging && (
            <AiFillDelete
              className={classes.listIcon}
              onClick={() => handleDelete(playlist.id)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
