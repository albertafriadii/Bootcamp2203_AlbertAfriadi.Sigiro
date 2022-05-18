import React, { useEffect, useState } from "react";
import TambahBarangKeluar from "./tambahBarangKeluar";
import "../App.css";
import Layout from "../components/layout";
export default function ListBarangKeluar() {
  const [barangKeluar, setBarangKeluar] = useState([]);

  const getBarang = async () => {
    try {
      const response = await fetch("http://localhost:5000/barang-keluar");
      const jsonData = await response.json();
      setBarangKeluar(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  return (
    <Layout key={barangKeluar.idkeluar}>
      {/* <div className="barang"> */}
      <TambahBarangKeluar />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-light">
          <thead>
            <tr>
              <th className="align-middle text-center">No.</th>
              <th className="align-middle text-center">Nama Barang</th>
              <th className="align-middle text-center">Penerima</th>
              <th className="align-middle text-center">Tanggal</th>
              <th className="align-middle text-center">Jumlah Barang Keluar</th>
            </tr>
          </thead>
          <tbody>
            {barangKeluar.map((item, i) => (
              <tr>
                <td className="align-middle">{i + 1}</td>
                <td className="align-middle">{item.namabarang}</td>
                <td className="align-middle">{item.penerima}</td>
                <td className="align-middle">{item.tanggal}</td>
                <td className="align-middle">{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </Layout>
  );
}
