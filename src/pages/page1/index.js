import React, { useState } from 'react';
import { connect } from "af-render"
import { Module } from "@common/component/Module.js"
import model from "./model"
import { withRouter } from "react-router-dom";

function App(props) {
  const { dispatch, page1: { text } = {}, history } = props
  return (
    <Module resources={[model]}>
      <div>
        <p>{text}</p>
        <button onClick={() => {
          dispatch({
            type: "page1/mockfetch",
          })
        }}>
          change Data after 1s
      </button>
        <button onClick={() => {
          dispatch({
            type: "page1/testActionSync",
          })
        }}>
          test sync
      </button>
        <button onClick={() => {
          dispatch({
            type: "page1/testActionSync",
          })
        }}>
          test sync2
      </button>
        <br />
        <button onClick={() => {
          history.push("page2")
        }}>
          go page2
      </button>
      </div>
    </Module >
  );
}

const mapStateToProps = ({ page1 }) => ({
  page1
});

export default withRouter(connect(mapStateToProps)(App));
