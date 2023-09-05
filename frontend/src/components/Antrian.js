import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const pelanggan = [
  {
    no: 1,
    nama: 'Dadu',
    alamat: 'Depok',
    status: '0',
  },
  {
    no: 2,
    nama: 'Alice',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 3,
    nama: 'Alice1',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 4,
    nama: 'Alice2',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
  {
    no: 5,
    nama: 'Alice3',
    alamat: 'Jakarta',
    status: '1',
  },
];

const Antrian1 = ({ data }) => {
  return (
    <Container fluid>
      <div style={{ maxHeight: '315px', overflowY: 'auto' }}>
            <Table striped bordered hover rounded style={{ border: '2px solid black', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.nama}</td>
                    <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    </Container>
  );
};

export const Antrian = () => <Antrian1 data={pelanggan} />;