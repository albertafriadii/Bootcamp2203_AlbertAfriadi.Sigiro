import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import ImageSlider from "../components/imageSlider";
import Layout from "../components/layout";
import { SliderData } from "../components/sliderData";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { Card, Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const [barang, setBarang] = useState([]);
  const [users, setUsers] = useState([]);

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

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.log(error);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  });

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <Container>
          <Row>
            <Col xs>
              <Card
                style={{
                  width: "18rem",
                  margin: "1rem",
                  color: "black",
                }}
              >
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={require("../assets/barang.png")}
                  ></Card.Img>
                  <Card.Title>DATA BARANG</Card.Title>
                  <Card.Text>
                    <h3>{barang.length}</h3> Barang
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs>
              <Card
                style={{
                  width: "18rem",
                  margin: "1rem",
                  color: "black",
                }}
              >
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={require("../assets/users.png")}
                  ></Card.Img>
                  <Card.Title>DATA USERS</Card.Title>
                  <Card.Text>
                    <h3>{users.length}</h3> Users
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <span style={{ display: "none" }}>{protectedData}</span>
        <ImageSlider slides={SliderData} />
      </Layout>
    </div>
  );
};

export default Dashboard;
