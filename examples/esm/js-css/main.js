import { e, eCss } from "../../../embel.esm.js";

const yellow_bullet_styles = eCss({
  backgroundColor: "#dfa92b",
  width: "100px",
  height: "50px",
  borderRadius: ["0", "25px", "25px", "0"],
  border: null,
});
e.Div(yellow_bullet_styles);
