import React, { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IPlaylist } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import editIcon from "../../assets/edit.svg";
import saveIcon from "../../assets/save.svg";
import classes from "./style.module.scss";

const SingleTodo: React.FC<{
  index: number;
  playlists: IPlaylist[];
  playlistCur: IPlaylist;
  setPlaylists: (updated: IPlaylist[]) => void;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist: (cur: IPlaylist) => void;
  disableDrag: boolean;
  setDisableDrag: (val: boolean) => void;
}> = ({
  index,
  playlists,
  playlistCur,
  setPlaylists,
  selectedPlaylist,
  setSelectedPlaylist,
  disableDrag,
  setDisableDrag,
}) => {
  const [editing, setEditing] = useState<boolean[]>([]);
  const [newName, setNewName] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef && editInputRef.current) editInputRef!.current!.focus();
  }, [editing]);

  function editPlaylist(e: any) {
    e.stopPropagation();
    setDisableDrag(true);
    const aux = [...editing];
    aux[playlistCur.order] = true;
    setEditing(aux);
  }

  function savePlaylist() {
    if (newName) {
      const clone = [...playlists];
      clone[playlistCur.order].name = newName;
      clone[playlistCur.order].isNew = false;
      setPlaylists(clone);
    }
    const aux = [...editing];
    aux[playlistCur.order] = false;
    setEditing(aux);
    setDisableDrag(false);
  }

  function deletePlaylist(e: any, id: number) {
    e.stopPropagation();
    setPlaylists(playlists.filter((cur) => cur.id !== id));
    if (selectedPlaylist && selectedPlaylist.id === id) {
      setSelectedPlaylist({
        order: -1,
        id: -1,
        name: "",
        testCases: [],
      });
    }
  }

  if (editing[playlistCur.order])
    return (
      <div className={classes.listItemEdit}>
        <img
          src={saveIcon}
          className={classes.saveIcon}
          title="save"
          alt="save"
          onClick={savePlaylist}
        />
        <input
          ref={editInputRef}
          className={classes.listItemInput}
          type="text"
          placeholder={playlistCur.name}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
    );

  return (
    <>
      <Draggable
        draggableId={playlistCur.id.toString()}
        index={index}
        isDragDisabled={playlists.length <= 1 || playlistCur.isNew}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={[
              classes.listItem,
              snapshot.isDragging && classes.listItemDrag,
              selectedPlaylist &&
                selectedPlaylist.id === playlistCur.id &&
                classes.containerActive,
              playlistCur.isNew && classes.newListItem,
              disableDrag && classes.disabled,
              playlistCur.isNew && classes.noHoverGreyA,
            ].join(" ")}
            ref={provided.innerRef}
            onClick={
              !playlistCur.isNew
                ? () => setSelectedPlaylist(playlistCur)
                : undefined
            }
          >
            <span className={classes.listItemTitle}>{playlistCur.name}</span>
            {!snapshot.isDragging && (
              <>
                <img
                  src={editIcon}
                  className={classes.editIcon}
                  alt="edit"
                  title="edit"
                  onClick={(e) => editPlaylist(e)}
                />
                <AiFillDelete
                  className={classes.listIcon}
                  title="erase"
                  onClick={(e) => deletePlaylist(e, playlistCur.id)}
                />
              </>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default SingleTodo;
