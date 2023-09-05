import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BadgeLaundry } from '../components/BadgeTron';
import LiveTv from '../components/LiveTv';
import { Antrian } from '../components/Antrian';
import { TerimaButton,CucianButton,PengerianganButton,LipatanButton,SetrikaButton,PengepakanButton,PengambilanButton,PembayaranButton} from '../components/Button';

const Laundry = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Container fluid style={{ height: '100%' }}>
        <Row>
          <BadgeLaundry />
        </Row>
        <Row>
          <Col style={{ padding: 0, margin: 0, paddingTop: 2 }}>
            <Antrian />
          </Col>
          <Col style={{ padding: 0, margin: 0, paddingTop: 2 }}>
            <LiveTv />
          </Col>
        </Row>
        <Row style={{ height: '20%' }}>
          <Col><TerimaButton /></Col>
          <Col><CucianButton /></Col>
          <Col><PengerianganButton /></Col>
          <Col><LipatanButton /></Col>
        </Row>
        <Row style={{ height: '20%', paddingTop: 10 }}>
          <Col><SetrikaButton /></Col>
          <Col><PengepakanButton /></Col>
          <Col><PengambilanButton /></Col>
          <Col><PembayaranButton /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Laundry;