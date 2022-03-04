import { AiFillDelete } from "react-icons/ai";
import { ITestCase } from "../../interfaces/interfaces";
import { Draggable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

const SingleTodo: React.FC<{
  index: number;
  testCases: ITestCase[];
  testCase: ITestCase;
  setTestCases: (updated: ITestCase[]) => void;
}> = ({ index, testCases, testCase, setTestCases }) => {
  const handleDelete = (id: number) => {
    setTestCases(testCases.filter((cur) => cur.id !== id));
  };

  return (
    <Draggable
      draggableId={testCase.id.toString()}
      index={index}
      // isDragDisabled={testCases.length <= 1}
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
          <span className={classes.listItemTitle}>{testCase.name}</span>
          {!snapshot.isDragging && (
            <AiFillDelete
              className={classes.listIcon}
              onClick={() => handleDelete(testCase.id)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
