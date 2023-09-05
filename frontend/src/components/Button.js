import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomTron = ({ text, to }) => {
    return (
      <Link to={to}>
          <Button style={{width: '100%',height: '100%'}}><h3>{text}</h3></Button>
      </Link>
    );
  }

export const TerimaButton = () => <CustomTron text="TERIMA CUCIAN" to="/terima-cucian" />;
export const CucianButton = () => <CustomTron text="PENCUCIAN" to="/pencucian"/>;
export const PengerianganButton = () => <CustomTron text="PENGERIANGAN" to="/pengeringan"/>;
export const LipatanButton = () => <CustomTron text="LIPATAN" to="/pelipatan"/>;
export const SetrikaButton = () => <CustomTron text="SETRIKAAN" to="/setrikaan"/>;
export const PengepakanButton = () => <CustomTron text="PENGEPAKAN" to="/pengepakan"/>;
export const PengambilanButton = () => <CustomTron text="PENGAMBILAN" to="/pengambilan"/>;
export const PembayaranButton = () => <CustomTron text="PEMBAYARAN" to="/pembayaran"/>;
