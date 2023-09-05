import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PenerimaanCucian = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button value="pelanggan" style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Pencucian = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button value="items" style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Pengeriangan = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button value="pesanan" style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Lipatan = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Setrikaan = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Pengepakan = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Pengambilan = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

const Pembayaran = ({ text, to }) => {
  return (
    <Link to={to}>
        <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
    </Link>
  );
}

export const TerimaButton = () => <PenerimaanCucian text="TERIMA CUCIAN" to="/terima-cucian" />;
export const CucianButton = () => <Pencucian text="PENCUCIAN" to="/pencucian"/>;
export const PengerianganButton = () => <Pengeriangan text="PENGERIANGAN" to="/pengeringan"/>;
export const LipatanButton = () => <Lipatan text="LIPATAN" to="/pelipatan"/>;
export const SetrikaButton = () => <Setrikaan text="SETRIKAAN" to="/setrikaan"/>;
export const PengepakanButton = () => <Pengepakan text="PENGEPAKAN" to="/pengepakan"/>;
export const PengambilanButton = () => <Pengambilan text="PENGAMBILAN" to="/pengambilan"/>;
export const PembayaranButton = () => <Pembayaran text="PEMBAYARAN" to="/pembayaran"/>;
