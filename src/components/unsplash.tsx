function Unsplash() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        maxHeight: "90vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <img
        src="hero-bg.jpg"
        width="100%"
        alt="girl-with-yellow-backgroud"
        style={{
          position: "relative",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          width: "50%",
          fontFamily: "Roboto",
        }}
      >
        <h2 style={{ color: "white", fontSize: "40px" }}>
          BENVENUTO NEL NOSTRO NEGOZIO
        </h2>
        <h3 style={{ color: "white", fontSize: "25px" }}>
          Scopri le nostre offerte
        </h3>
      </div>
    </div>
  );
}

export default Unsplash;
