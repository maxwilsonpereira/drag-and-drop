import React from "react";
import { ITestCase } from "../../interfaces/interfaces";
import TestCase from "./TestCase";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  testCases: ITestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<ITestCase[]>>;
  testsOfPlaylist: ITestCase[];
  setTestsOfPlaylist: React.Dispatch<React.SetStateAction<ITestCase[]>>;
  testCaseListDisabled: boolean;
}

const TestCaseList: React.FC<props> = ({
  testCases,
  setTestCases,
  testsOfPlaylist,
  setTestsOfPlaylist,
  testCaseListDisabled,
}) => {
  return (
    <>
      <div
        className={[classes.listContainer, classes.gridLeftDown].join(" ")}
        style={{ height: "calc(60vh)", marginTop: 20 }}
      >
        <div className={classes.listContainerTitle}>Test Cases</div>
        <Droppable
          droppableId="TestCaseList"
          isDropDisabled={testCaseListDisabled}
        >
          {(provided, snapshot) => (
            <div
              className={[
                classes.listContainer,
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
                  testCase={cur}
                  setTestCases={setTestCases}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div
        className={[classes.listContainer, classes.gridRight].join(" ")}
        style={{ height: "calc(80vh + 25px" }} // 20 marginTop + 5 padding
      >
        <div className={classes.listContainerTitle}>Playlist Name</div>
        <Droppable droppableId="TestCaseOfPlaylist">
          {(provided, snapshot) => (
            <div
              className={[
                classes.listContainer,
                snapshot.isDraggingOver ? classes.listContainerActive : "",
              ].join(" ")}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {testsOfPlaylist?.map((cur, index) => (
                <TestCase
                  key={cur.id}
                  index={index}
                  testCases={testsOfPlaylist}
                  testCase={cur}
                  setTestCases={setTestsOfPlaylist}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TestCaseList;
