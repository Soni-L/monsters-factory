import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar
        style={{ display: "flex", justifyContent: "start", gap: "30px" }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          All Monsters
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/new")}
        >
          Create monsters
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/show")}
        >
          Monster Show
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
