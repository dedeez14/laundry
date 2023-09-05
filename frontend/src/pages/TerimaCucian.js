import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomCheck from "../components/Checkbox";

const TerimaCucian = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Container style={{color:'white'}}>
        <Row>
            <Col md={12} style={{ textAlign: 'center' }}>
                <h1><b>TERIMA CUCIAN</b></h1>
            </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label><b>Nama</b></Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukan nama" />
          </Col>
          <Col md={6}>
            <Form.Label><b>No Hp</b></Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukan No Hp" />
          </Col>
            <Col md={6}>
                <CustomCheck />
            </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label><b>Alamat</b></Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukan Alamat" />
          </Col>
          <Col md={6}>
            <Form.Label><b>Status</b></Form.Label>
            <Form.Select>
                <option value={0}>Antrian</option>
                <option value={1}>Sedang dikerjakan</option>
                <option value={2}>Selesai</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label><b>Berat @KG</b></Form.Label>
            <Form.Control size="md" type="number" placeholder="Berat Per KG" />
          </Col>
          <Col md={6}>
            <Form.Label><b>Status</b></Form.Label>
            <Form.Select>
                <option value={0}>Antrian</option>
                <option value={1}>Sedang dikerjakan</option>
                <option value={2}>Selesai</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TerimaCucian;
