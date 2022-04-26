import React, { Fragment } from "react";
import "./App.css";
// components
import TambahKontak from "./components/tambahKontak";
import ListKontak from "./components/listKontak";

function App() {
  return (
    <Fragment>
      <div className="container">
        <TambahKontak />
        <ListKontak />
      </div>
    </Fragment>
  );
}

export default App;
