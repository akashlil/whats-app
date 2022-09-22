import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://thumbs.dreamstime.com/b/whatsapp-icon-isolated-white-vector-file-included-whatsapp-flat-icon-164609425.jpg"
          alt=""
          style={{ marginBottom: "20px", width: "300px", height: "300px" }}
        />
        <Circle color="#3cbc28" size={60}></Circle>
      </div>
    </center>
  );
}
