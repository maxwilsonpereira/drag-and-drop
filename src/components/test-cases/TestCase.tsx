import { AiFillDelete } from "react-icons/ai";
import { ITestCase } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

const SingleTodo: React.FC<{
  index: number;
  testCases: Array<ITestCase>;
  playlist: ITestCase;
  setTestCases: React.Dispatch<React.SetStateAction<Array<ITestCase>>>;
}> = ({ index, testCases, playlist, setTestCases }) => {
  const handleDelete = (id: number) => {
    setTestCases(testCases.filter((cur) => cur.id !== id));
  };

  return (
    <Draggable
      draggableId={playlist.id.toString()}
      index={index}
      isDragDisabled={testCases.length <= 1}
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
          <AiFillDelete
            className={classes.listIcon}
            onClick={() => handleDelete(playlist.id)}
          />
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
