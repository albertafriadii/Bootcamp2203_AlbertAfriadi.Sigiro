const Home = () => {
  return (
    <>
      <div class="container-home">
        <div class="content-home">
          <h3 class="title-home">FINAL PROJECT WGS</h3>
          <p>
            Final project di perusahaan WGS (Walden Global Services) dengan
            bertemakan Data Barang.
          </p>
          <a
            href="/login"
            button
            type="button"
            class="btn btn-info"
            id="btnHome"
          >
            Login
          </a>
        </div>
        <div class="image-home">
          <img src={require("../assets/home.gif")} alt="Home" />
        </div>
      </div>
    </>
  );
};

export default Home;
