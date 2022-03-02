import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TestCaseList from "./TestCaseList";
import { ITestCase } from "../../interfaces/interfaces";
import { getTestCases } from "../../services/http.service";

const TestCases: React.FC = () => {
  const [testCases, setTestCases] = useState<ITestCase[]>([]);

  useEffect(() => {
    getPlaylistsHandler();
    async function getPlaylistsHandler() {
      const res: ITestCase[] = await getTestCases();
      setTestCases(res);
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log("source: ", source);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === "PlaylistList") {
      let aux;
      let updated = testCases;
      aux = updated[source.index];
      updated.splice(source.index, 1);
      updated.splice(destination.index, 0, aux);
      setTestCases(updated);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TestCaseList testCases={testCases} setTestCases={setTestCases} />
    </DragDropContext>
  );
};

export default TestCases;
