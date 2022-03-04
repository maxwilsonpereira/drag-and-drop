import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TestCaseList from "./TestCaseList";
import { ITestCase } from "../../interfaces/interfaces";

const TestCases: React.FC<{
  testCases: ITestCase[];
  setTestCases: (updated: ITestCase[]) => void;
  testsOfPlaylist: ITestCase[];
  setTestsOfPlaylist: (updated: ITestCase[]) => void;
}> = ({ testCases, setTestCases, testsOfPlaylist, setTestsOfPlaylist }) => {
  const [testCaseListDisabled, setTestCaseListDisabled] = useState(false);

  const onDragEnd = (result: DropResult) => {
    setTestCaseListDisabled(false);
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === "TestCaseList") {
      const aux = testCases[source.index];
      testCases.splice(source.index, 1);
      testCases.splice(destination.index, 0, aux);
    } else if (source.droppableId === "TestCaseOfPlaylist") {
      const aux = testsOfPlaylist[source.index];
      testsOfPlaylist.splice(source.index, 1);
      testsOfPlaylist.splice(destination.index, 0, aux);
    } else {
      const aux = testCases[source.index];
      testCases.splice(source.index, 1);
      testsOfPlaylist.splice(destination.index, 0, aux);
    }
  };

  const onDragStart = (result: DropResult) => {
    if (result.source.droppableId === "TestCaseOfPlaylist")
      setTestCaseListDisabled(true);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <TestCaseList
        testCases={testCases}
        setTestCases={(updated) => setTestCases(updated)}
        testsOfPlaylist={testsOfPlaylist}
        setTestsOfPlaylist={(updated) => setTestsOfPlaylist(updated)}
        testCaseListDisabled={testCaseListDisabled}
      />
    </DragDropContext>
  );
};

export default TestCases;
