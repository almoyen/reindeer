import { Col, Row } from "react-bootstrap";

export default function Count({ item, label }) {
  return (
    <Row>
      <Col sm={12} md={12} lg={12}>
        <h1 className="ml-3 mb-3 text-muted">
          {item?.length}{" "}
          {item.length > 1
            ? `${label !== "result" ? `${label}s` : "result"} found`
            : `${label} found`}
        </h1>
      </Col>
    </Row>
  );
}
