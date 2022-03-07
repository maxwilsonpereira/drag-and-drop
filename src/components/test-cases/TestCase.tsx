import React, { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ITestCase, IPlaylist } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import editIcon from "../../assets/edit.svg";
import saveIcon from "../../assets/save.svg";
import classes from "./style.module.scss";

const SingleTodo: React.FC<{
  index: number;
  testCases: ITestCase[];
  testCaseCur: ITestCase;
  setTestCases: (updated: ITestCase[]) => void;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist?: (cur: IPlaylist) => void;
  isTestCaseList?: boolean;
  disableDrag: boolean;
  setDisableDrag: (val: boolean) => void;
  playlists: IPlaylist[];
  setPlaylists: (updated: IPlaylist[]) => void;
}> = ({
  index,
  testCases,
  testCaseCur,
  setTestCases,
  selectedPlaylist,
  setSelectedPlaylist,
  isTestCaseList,
  disableDrag,
  setDisableDrag,
  playlists,
  setPlaylists,
}) => {
  const [editing, setEditing] = useState<boolean[]>([]);
  const [newName, setNewName] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef && editInputRef.current) editInputRef!.current!.focus();
  }, [editing]);

  function editTestCase(e: any) {
    e.stopPropagation();
    setDisableDrag(true);
    const aux = [...editing];
    aux[testCaseCur.order] = true;
    setEditing(aux);
  }

  function savePlaylist() {
    if (newName) {
      const clone = [...testCases];
      clone[testCaseCur.order].name = newName;
      clone[testCaseCur.order].isNew = false;
      setTestCases(clone);
    }
    const aux = [...editing];
    aux[testCaseCur.order] = false;
    setEditing(aux);
    setDisableDrag(false);
  }

  function deleteTestCase(id: number) {
    if (isTestCaseList) setTestCases(testCases.filter((cur) => cur.id !== id));
    else {
      if (selectedPlaylist && setSelectedPlaylist) {
        const clone: IPlaylist = Object.assign({}, selectedPlaylist);
        const updatedTestCases = clone.testCases.filter((cur) => cur.id !== id);
        clone.testCases = updatedTestCases;
        setSelectedPlaylist(clone);

        const clonePlaylists = [...playlists];
        clonePlaylists[selectedPlaylist.order].testCases = playlists[
          selectedPlaylist.order
        ].testCases.filter((cur) => cur.id !== id);
        setPlaylists(clonePlaylists);
      }
    }
  }

  if (editing[testCaseCur.order])
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
          placeholder={testCaseCur.name}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
    );

  return (
    <Draggable
      draggableId={testCaseCur.id.toString()}
      index={index}
      isDragDisabled={testCaseCur.isNew}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={[
            classes.listItem,
            snapshot.isDragging && classes.listItemDrag,
            testCaseCur.isNew && classes.newListItem,
            disableDrag && classes.disabled,
            testCaseCur.isNew && classes.noHoverGreyA,
          ].join(" ")}
        >
          <span className={classes.listItemTitle}>{testCaseCur.name}</span>
          {!snapshot.isDragging && (
            <>
              <img
                src={editIcon}
                className={classes.editIcon}
                alt="edit"
                title="edit"
                onClick={(e) => editTestCase(e)}
              />
              <AiFillDelete
                className={classes.listIcon}
                onClick={() => deleteTestCase(testCaseCur.id)}
              />
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
