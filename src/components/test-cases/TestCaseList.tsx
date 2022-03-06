import React, { useState, useEffect } from "react";
import { IPlaylist, ITestCase } from "../../interfaces/interfaces";
import TestCase from "./TestCase";
import { Droppable } from "react-beautiful-dnd";
import classes from "./style.module.scss";

interface props {
  testCases: ITestCase[];
  setTestCases: (updated: ITestCase[]) => void;
  testCaseListDisabled: boolean;
  selectedPlaylist?: IPlaylist;
  setSelectedPlaylist: (cur: IPlaylist) => void;
}

const TestCaseList: React.FC<props> = ({
  testCases,
  setTestCases,
  testCaseListDisabled,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const [disableDrag, setDisableDrag] = useState(false);

  function addTestCase() {
    const clone = [...testCases];
    let lastId = 0;
    for (let i = 0; i < clone.length; i++) {
      clone[i].order = clone[i].order + 1;
      if (clone[i].id > lastId) lastId = clone[i].id;
    }
    clone.unshift({
      order: 0,
      id: lastId + 1,
      name: "New Test Case",
      isNew: true,
    });
    setTestCases(clone);
    const listContainer = document.getElementById("other-playlists");
    if (listContainer) {
      listContainer.scrollTop = 0;
    }
  }

  return (
    <>
      {/* ***** Test Cases ***** */}
      <div
        className={[
          classes.listContainer,
          classes.gridLeftDown,
          disableDrag && classes.disableScroll,
        ].join(" ")}
        style={{ height: "calc(60vh)", marginTop: 20 }}
      >
        <div className={classes.listContainerTitle}>
          Test Cases
          <div
            className={classes.addIcon}
            title="add test case"
            onClick={addTestCase}
          >
            +
          </div>
        </div>

        <Droppable
          droppableId="TestCaseList"
          isDropDisabled={testCaseListDisabled}
        >
          {(provided, snapshot) => (
            <div
              style={{ minHeight: "calc(80%)" }} // droppable area
              className={[
                snapshot.isDraggingOver ? classes.listContainerActive : "",
              ].join(" ")}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {testCases
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map((cur, index) => {
                  if (
                    !selectedPlaylist?.testCases?.find((e) => e.id === cur.id)
                  ) {
                    return (
                      <TestCase
                        key={cur.id}
                        index={index}
                        testCases={testCases}
                        testCaseCur={cur}
                        setTestCases={setTestCases}
                        isTestCaseList={true}
                        disableDrag={disableDrag}
                        setDisableDrag={setDisableDrag}
                      />
                    );
                  } else return null;
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className={classes.listContainerBottom} />
      </div>

      {/* ***** Test Cases of Specific Playlist ***** */}
      <div
        className={[classes.listContainer, classes.gridRight].join(" ")}
        style={{ height: "calc(85vh + 20px)" }} // 20 marginTop gridLeftDown
      >
        <div className={classes.listContainerTitle}>
          {selectedPlaylist
            ? selectedPlaylist.name + "s Test Cases"
            : "Select a Playlist"}
        </div>
        {selectedPlaylist?.testCases.length === 0 && (
          <div className={classes.messageContainer}>
            drag and drop <b>below</b> the desired test cases fom the Test Cases
            list in the desired order
          </div>
        )}

        <Droppable droppableId="TestCaseOfPlaylist">
          {(provided, snapshot) => (
            <div
              style={{ minHeight: "calc(80%)" }} // droppable area
              className={[
                snapshot.isDraggingOver ? classes.listContainerActive : "",
              ].join(" ")}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {selectedPlaylist?.testCases
                ?.sort((a, b) => (a.order < b.order ? -1 : 1))
                .map((cur: any, index) => {
                  return (
                    <TestCase
                      key={cur.id}
                      index={index}
                      testCases={testCases}
                      testCaseCur={cur}
                      setTestCases={setTestCases}
                      selectedPlaylist={selectedPlaylist}
                      setSelectedPlaylist={setSelectedPlaylist}
                      disableDrag={disableDrag}
                      setDisableDrag={setDisableDrag}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className={classes.listContainerBottom} />
      </div>
    </>
  );
};

export default TestCaseList;
