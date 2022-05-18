import React, { useEffect, useState } from "react";
import UpdateBarang from "./updateBarang";
import DetailBarang from "./detailBarang";
import { Button, ButtonGroup } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import TambahBarang from "./tambahBarang";
import "../App.css";
import Layout from "../components/layout";
export default function ListBarang() {
  const [barang, setBarang] = useState([]);

  const getBarang = async () => {
    try {
      const response = await fetch("http://localhost:5000/barang");
      const jsonData = await response.json();
      setBarang(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  const handleDelete = async (idbarang) => {
    console.log(idbarang);
    try {
      await fetch(`http://localhost:5000/barang/${idbarang}`, {
        method: "DELETE",
      });
      const filterData = barang.filter((item) => item.idbarang !== idbarang);
      setBarang(filterData);
      console.log(setBarang(filterData));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Layout>
      {/* <div className="barang"> */}
      <TambahBarang />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-light">
          <thead>
            <tr>
              <th className="align-middle text-center">No.</th>
              <th className="align-middle text-center">Nama Barang</th>
              <th className="align-middle text-center">Tipe Barang</th>
              <th className="align-middle text-center" colSpan="3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, i) => (
              <tr>
                <td className="align-middle">{i + 1}</td>
                <td className="align-middle">{item.namabarang}</td>
                <td className="align-middle">{item.tipebarang}</td>
                <td>
                  <DetailBarang barang={item} />
                </td>
                <td>
                  <UpdateBarang barang={item} />
                </td>
                <td>
                  <ButtonGroup className="mx-auto">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.idbarang)}
                    >
                      <AiIcons.AiOutlineCloseCircle />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </Layout>
  );
}
