import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar
        style={{ display: "flex", justifyContent: "start", gap: "30px" }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            cursor: "pointer",
            letterSpacing: "2px",
            fontFamily: "The Halloween",
            color: location.pathname === "/" ? "yellow" : "white",
            textShadow: location.pathname === "/" ? "2px 2px black" : "0",
          }}
          onClick={() => navigate("/")}
        >
          All Monsters
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{
            cursor: "pointer",
            letterSpacing: "2px",
            fontFamily: "The Halloween",
            color: location.pathname === "/new" ? "yellow" : "white",
            textShadow: location.pathname === "/new" ? "2px 2px black" : "0",
          }}
          onClick={() => navigate("/new")}
        >
          Create monsters
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{
            cursor: "pointer",
            letterSpacing: "2px",
            fontFamily: "The Halloween",
            color: location.pathname === "/show" ? "yellow" : "white",
            textShadow: location.pathname === "/show" ? "2px 2px black" : "0",
          }}
          onClick={() => navigate("/show")}
        >
          Monster Show
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
