import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({ label, type, nama }) => {
  return (
      <Form.Check
        inline
        label={label}
        name={nama}
        type={type}
        id={`checkbox-${nama}`}
        defaultChecked={true}
      />
  );
};

const PakaianCheck = () => <Checkbox label="Pakaian" type="checkbox" nama="pakaian" />
const PeralatanTidurCheck = () => <Checkbox label="Peralatan Tidur" type="checkbox" nama="peralatan_tidur" />
const PakaianKhususCheck = () => <Checkbox label="Pakaian Khusus" type="checkbox" nama="pakaian_khusus" />
const LinenCheck = () => <Checkbox label="Linen" type="checkbox" nama="linen" />
const PakaianBerbahanKhususCheck = () => <Checkbox label="PakaianBerbahanKhusus" type="checkbox" nama="pakaian_berbahan_khusus" />
const SepatuCheck = () => <Checkbox label="Sepatu" nama="sepatu" />;
const AksesorisCheck = () => <Checkbox label="Aksesoris" nama="aksesoris" />;
const TasCheck = () => <Checkbox label="Tas" nama="tas" />;
const PeralatanRumahTanggaCheck = () => <Checkbox label="Peralatan Rumah Tangga" nama="peralatan_rumah_tangga" />;
const KarpetCheck = () => <Checkbox label="Karpet" nama="karpet" />;
const SelimutBerbuluCheck = () => <Checkbox label="Selimut Berbulu" nama="selimut_berbulu" />;
const PerhiasanCheck = () => <Checkbox label="Perhiasan" nama="perhiasan" />;
const MainanAnakAnakCheck = () => <Checkbox label="Mainan Anak-anak" nama="mainan_anak_anak" />;
const PakaianPeliharaanCheck = () => <Checkbox label="Pakaian Peliharaan" nama="pakaian_peliharaan" />;
const KaosKakiDanCelanaDalamCheck = () => <Checkbox label="Kaos Kaki dan Celana Dalam" nama="kaos_kaki_dan_celana_dalam" />;
const BarangKhususLainnyaCheck = () => <Checkbox label="Barang-barang Khusus Lainnya" nama="barang_khusus_lainnya" />;


const CustomCheck = () => {
    return (
        <>
            <PakaianCheck />
            <PeralatanTidurCheck />
            <PakaianKhususCheck />
            <LinenCheck />
            <PakaianBerbahanKhususCheck />
            <SepatuCheck />
            <AksesorisCheck />
            <TasCheck />
            <PeralatanRumahTanggaCheck />
            <KarpetCheck />
            <SelimutBerbuluCheck />
            <PerhiasanCheck />
            <MainanAnakAnakCheck />
            <PakaianPeliharaanCheck />
            <KaosKakiDanCelanaDalamCheck />
            <BarangKhususLainnyaCheck />
        </>
    )
}

export default CustomCheck