import { Navbar } from "react-bootstrap";
import { MusicNote } from "react-bootstrap-icons";

export function Brand() {
  return (
    <Navbar.Brand className="d-flex align-items-center gap-2">
      <div
        style={{
          backgroundColor: "#7c3aed",
          borderRadius: "8px",
          padding: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MusicNote color="white" size={18} />
      </div>
      <span style={{ fontWeight: 600 }}>Sistema de Gestão de Composições</span>
    </Navbar.Brand>
  );
}
