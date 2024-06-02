import * as React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

const CustomTypography = (props) => {
  return <Typography {...props} style={{ fontSize: "12px" }} />;
};

export default function MintedMonstersDialog({
  open,
  handleClose,
  handleSave,
  mintedMonsters,
}) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">Minted Monsters</DialogTitle>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr)",
              flexWrap: "wrap",
              minWidth: "400px",
              gap: "10px",
            }}
          >
            {mintedMonsters.map((monster: MintedMonster) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "160px",
                  borderRadius: "8px",
                  borderLeft: '1px solid lightgray',
                  boxShadow: "2px 2px gray",
                }}
              >
                <div
                  style={{
                    height: "40px",
                    marginBottom: "4px",
                    borderRadius: "8px 8px 0 0",
                    backgroundColor:
                      "#" +
                      stringToColorCode(
                        monster?.type?.species + monster?.type?.sub_species
                      ),
                    display: "flex",
                    justifyContent: "end",
                  }}
                ></div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    justifyContent: "space-around",
                    gap: "3px",
                    padding: "4px",
                    paddingLeft: '8px',
                  }}
                >
                  <CustomTypography>
                    <span style={{ fontWeight: "bold" }}>Name </span>
                  </CustomTypography>
                  <CustomTypography>{monster.name}</CustomTypography>
                  <CustomTypography>
                    <span style={{ fontWeight: "bold" }}>Level </span>
                  </CustomTypography>
                  <CustomTypography>{monster.level}</CustomTypography>
                  <CustomTypography>
                    <span style={{ fontWeight: "bold" }}>Species </span>
                  </CustomTypography>
                  <CustomTypography>{monster.type.species}</CustomTypography>
                  <CustomTypography>
                    <span style={{ fontWeight: "bold" }}>Sub-species </span>
                  </CustomTypography>
                  <CustomTypography>
                    {monster.type.sub_species}
                  </CustomTypography>
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
