function Unsplash() {
  return (
    <div
      style={{
        position: "relative", 
        overflow: "hidden",
        maxHeight: "80vh",
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
          left: "215px", 
          top: "50%", 
          transform: "translateY(-50%)", 
          textAlign: "center", 
          width: "100%", 
          fontFamily: "Roboto",
        }}
      >
        <h2 style={{ color: "white" }}>BENVENUTO NEL NOSTRO NEGOZIO</h2>
        <h3 style={{ color: "white" }}>Scopri le nostre offerte</h3>
      </div>
    </div>
  );
}

export default Unsplash;
