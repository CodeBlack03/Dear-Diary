import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
const NotesContainer = ({ children }) => {
  return (
    <Card variant="flush" className="my-3 p-3 rounded">
      <Col sc={12} md={6} className="py-3">
        {children}
      </Col>
    </Card>
  );
};
export default NotesContainer;
