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
import { stringToColorCode } from "../common/helperFunctions";
import { MintedMonster } from "../types/MonsterTypes";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MintedMonstersDialog({
  open,
  handleClose,
  handleSave,
  mintedMonsters,
}) {
  const [loading, setLoading] = useState<boolean>(false);

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
            {mintedMonsters.map((monster: MintedMonster) => (
              <div
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
          <Button
            variant="contained"
            style={{ borderRadius: "8px" }}
            onClick={() => handleSave(mintedMonsters)}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
