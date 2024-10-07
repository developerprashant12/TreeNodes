import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';

type CustomControlsProps = {
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomControls: React.FC<CustomControlsProps> = ({
  onUndo,
  onRedo,
  onExport,
  onImport,
}) => {
  return (
    <Container fluid>
      <Row className="mt-3">
        {/* Arrange buttons in two rows */}
        <Col xs={6} className="d-flex justify-content-center mb-2">
          <Button variant="primary" onClick={onUndo} className="w-100">
            Undo
          </Button>
        </Col>
        <Col xs={6} className="d-flex justify-content-center mb-2">
          <Button variant="primary" onClick={onRedo} className="w-100">
            Redo
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="d-flex justify-content-center mb-2">
          <Button variant="success" onClick={onExport} className="w-100">
            Export
          </Button>
        </Col>
        <Col xs={6} className="d-flex justify-content-center mb-2">
          <label htmlFor="import-file" className="w-100">
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              style={{ display: 'none' }}
              id="import-file"
            />
            <Button variant="success" className="w-100">
              Import
            </Button>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomControls;
