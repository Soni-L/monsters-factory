import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function stringToColorCode(text: string) {
  // Generate a hash code from the input text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash code to hex
  const color =
    ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 8) & 0xff).toString(16).padStart(2, "0") +
    (hash & 0xff).toString(16).padStart(2, "0");

  return color.toUpperCase();
}

export default function MintedMonstersDialog({
  open,
  handleClose,
  mintedMonsters,
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  async function handleSave(data) {
    try {
      setLoading(true);
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      setOpenSnackbar(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Minted Monsters
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              flexWrap: "wrap",
              minWidth: "400px",
              gap: "10px",
              padding: "20px",
            }}
          >
            {mintedMonsters.map((monster) => (
              <div
                key={monster._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "100px",
                    width: "150px",
                    backgroundColor:
                      "#" +
                      stringToColorCode(
                        monster?.type?.species + monster?.type?.sub_species
                      ),
                    display: "flex",
                    justifyContent: "end",
                  }}
                ></div>

                <div>
                  {monster.name} level:
                  <span style={{ fontWeight: "bold" }}>{monster.level}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Button
              variant="contained"
              disabled
              style={{ borderRadius: "8px" }}
              onClick={() => handleSave(mintedMonsters)}
              endIcon={<CircularProgress color="inherit" size={16} />}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ borderRadius: "8px" }}
              onClick={() => handleSave(mintedMonsters)}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Monsters saved"
      />
    </React.Fragment>
  );
}
