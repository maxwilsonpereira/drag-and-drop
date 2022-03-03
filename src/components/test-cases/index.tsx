import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TestCaseList from "./TestCaseList";
import { ITestCase } from "../../interfaces/interfaces";
import { getTestCases } from "../../services/http.service";

const TestCases = () => {
  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [testsOfPlaylist, setTestsOfPlaylist] = useState<ITestCase[]>([]);
  const [testCaseListDisabled, setTestCaseListDisabled] = useState(false);

  useEffect(() => {
    getPlaylistsHandler();
    async function getPlaylistsHandler() {
      const res: ITestCase[] = await getTestCases();
      setTestCases(res.slice(0, 30));
      setTestsOfPlaylist(res.slice(30, 40));
    }
  }, []);

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
        setTestCases={setTestCases}
        testsOfPlaylist={testsOfPlaylist}
        setTestsOfPlaylist={setTestsOfPlaylist}
        testCaseListDisabled={testCaseListDisabled}
      />
    </DragDropContext>
  );
};

export default TestCases;
