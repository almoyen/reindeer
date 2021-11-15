import { Button } from "react-bootstrap";

function SwitchButton({ handleChange }) {
  return (
    <Button
      type="button"
      className="mb-3"
      id="custom-switch"
      onClick={(e) => handleChange(e.target.checked)}
    >
      load More
    </Button>
  );
}

export default SwitchButton;
