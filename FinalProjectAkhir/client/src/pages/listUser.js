import React, { useEffect, useState } from "react";
import UpdateUser from "./updateUser";
import DetailUser from "./detailUser";
import { Button, ButtonGroup } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import Layout from "../components/layout";

export default function ListUser() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const filterData = users.filter((user) => user.id !== id);
      setUsers(filterData);
      console.log(setUsers(filterData));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout key={users.id}>
      <div className="user">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover table-light">
            <thead>
              <tr>
                <th className="align-middle text-center">No.</th>
                <th className="align-middle text-center">Nama</th>
                <th className="align-middle text-center">Email</th>
                <th className="align-middle text-center" colSpan="3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr>
                  <td className="align-middle">{i + 1}</td>
                  <td className="align-middle">{user.name}</td>
                  <td className="align-middle">{user.email}</td>
                  <td>
                    <DetailUser users={user} />
                  </td>
                  <td>
                    <UpdateUser users={user} />
                  </td>
                  <td>
                    <ButtonGroup className="mx-auto">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.id)}
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
      </div>
    </Layout>
  );
}
