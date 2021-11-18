import { React } from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div>
      <Spinner
        style={{ marginLeft: "50vw", marginTop: "30vh", fontSize: "200px" }}
        animation="border"
        variant="warning"
        name="loading..."
      />
    </div>
  );
}
