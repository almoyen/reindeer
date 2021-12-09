import { React } from "react";
import { styles } from "../../config";
import { Spinner } from "react-bootstrap";

export const Loader = () => (
  <div>
    <Spinner
      style={styles.loaderStyle}
      animation="border"
      variant="warning"
      name="loading..."
    />
  </div>
);
