import React from "react";
import { ITestCase } from "../../interfaces/interfaces";
import TestCase from "./TestCase";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  testCases: Array<ITestCase>;
  setTestCases: React.Dispatch<React.SetStateAction<Array<ITestCase>>>;
}

const TestCaseList: React.FC<props> = ({ testCases, setTestCases }) => {
  return (
    <div className={classes.listContainer}>
      <Droppable droppableId="TestCaseList">
        {(provided, snapshot) => (
          <div
            className={[
              classes.playlists,
              snapshot.isDraggingOver ? classes.listContainerActive : "",
            ].join(" ")}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {testCases?.map((cur, index) => (
              <TestCase
                key={cur.id}
                index={index}
                testCases={testCases}
                playlist={cur}
                setTestCases={setTestCases}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TestCaseList;
