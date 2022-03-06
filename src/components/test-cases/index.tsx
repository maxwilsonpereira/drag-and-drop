import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TestCaseList from "./TestCaseList";
import { IPlaylist, ITestCase } from "../../interfaces/interfaces";

const TestCases: React.FC<{
  testCases: ITestCase[];
  setTestCases: (updated: ITestCase[]) => void;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist: (cur: IPlaylist) => void;
}> = ({ testCases, setTestCases, selectedPlaylist, setSelectedPlaylist }) => {
  const [testCaseListDisabled, setTestCaseListDisabled] = useState(false);

  const onDragEnd = (result: DropResult) => {
    setTestCaseListDisabled(false);
    const { destination, source } = result;
    if (!destination) return;

    if (destination.droppableId === "TestCaseList") {
      if (source.index === destination.index) return;
      const clone = [...testCases];
      clone[source.index].order = destination.index;
      if (source.index < destination.index) {
        for (let i = destination.index; i > source.index; i--) {
          clone[i].order = clone[i].order - 1;
        }
      } else {
        for (let i = destination.index; i < source.index; i++) {
          clone[i].order = clone[i].order + 1;
        }
      }
      setTestCases(clone);
    } else if (source.droppableId === "TestCaseOfPlaylist") {
      if (source.index === destination.index) return;
      const clone = Object.assign({}, selectedPlaylist);
      clone.testCases[source.index].order = destination.index;
      if (source.index < destination.index) {
        for (let i = destination.index; i > source.index; i--) {
          clone.testCases[i].order = clone.testCases[i].order - 1;
        }
      } else {
        for (let i = destination.index; i < source.index; i++) {
          clone.testCases[i].order = clone.testCases[i].order + 1;
        }
      }
      setSelectedPlaylist(clone);
    } else {
      if (!selectedPlaylist) return;
      const selected = { ...testCases[source.index] };
      const clone = Object.assign({}, selectedPlaylist);
      let destinationOrder: number = 0;

      // if will be the first test case
      if (clone.testCases.length === 0) {
        selected.order = destinationOrder;
        clone.testCases.push(selected);
        setSelectedPlaylist(clone);
        return;
      }

      // if dragged to last position
      if (destination.index === clone.testCases.length) {
        destinationOrder = clone.testCases[destination.index - 1].order + 1;
      } else destinationOrder = clone.testCases[destination.index].order;

      selected.order = destinationOrder;
      clone.testCases.splice(destination.index, 0, selected);

      if (destination.index < clone.testCases.length - 1) {
        for (let i = destination.index + 1; i < clone.testCases.length; i++) {
          clone.testCases[i].order = clone.testCases[i].order + 1;
        }
      }
      setSelectedPlaylist(clone);
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
        testCaseListDisabled={testCaseListDisabled}
        selectedPlaylist={selectedPlaylist}
        setSelectedPlaylist={setSelectedPlaylist}
      />
    </DragDropContext>
  );
};

export default TestCases;
