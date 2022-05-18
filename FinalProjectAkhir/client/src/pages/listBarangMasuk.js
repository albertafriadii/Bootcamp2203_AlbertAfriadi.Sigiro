import React, { useEffect, useState } from "react";
import TambahBarangMasuk from "./tambahBarangMasuk";
import "../App.css";
import Layout from "../components/layout";
export default function ListBarangMasuk() {
  const [barangMasuk, setBarangMasuk] = useState([]);

  const getBarangMasuk = async () => {
    try {
      const response = await fetch("http://localhost:5000/barang-masuk");
      const jsonData = await response.json();
      setBarangMasuk(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBarangMasuk();
  }, []);

  return (
    <Layout key={barangMasuk.idmasuk}>
      {/* <div className="barang"> */}
      <TambahBarangMasuk />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-light">
          <thead>
            <tr>
              <th className="align-middle text-center">No.</th>
              <th className="align-middle text-center">Nama Barang</th>
              <th className="align-middle text-center">Penerima</th>
              <th className="align-middle text-center">Tanggal</th>
              <th className="align-middle text-center">Jumlah Barang Masuk</th>
            </tr>
          </thead>
          <tbody>
            {barangMasuk.map((item, i) => (
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
