import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function ViewToast() {
  const [count, setCount] = useState(0);
  return (
    <React.Fragment>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Buttons</strong>
          <small>fungsi tambah dan kurang</small>
        </Toast.Header>
        <Toast.Body>
          <Button
            variant="primary"
            type="button"
            onClick={() => setCount((count) => count + 1)}
            className="btn-toast"
          >
            tambah
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => setCount((count) => count - 1)}
            className="btn-toast"
          >
            kurang
          </Button>
          <h3>Kuantitas = {count}</h3>
        </Toast.Body>
      </Toast>
    </React.Fragment>
  );
}
