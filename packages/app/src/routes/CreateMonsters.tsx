import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import MintedMonstersDialog from "../components/MintedMonstersDialog";
import generateRandomMonster from "../common/generateRandomMonster";
import CustomMonsterForm from "../components/CustomMonsterForm";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
interface MonsterType {
  species: string;
  sub_species: string;
}

interface MintedMonster {
  name: string;
  level: number;
  type: MonsterType;
}

export default function CreateMonsters() {
  const [tab, setTab] = useState(0);
  const [monstersToMint, setMonstersToMint] = useState<number>(1);
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [mintedMonsters, setMintedMonsters] = useState<MintedMonster[] | []>(
    []
  );
  const [mintedMonstersDialog, setMintedMonstersDialog] =
    useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleGenerateRandomMonsters = (numberOfMonsters: number) => {
    setMintLoading(true);
    const monstersArray = [];
    for (let i = 0; i < numberOfMonsters; i++) {
      const [species, sub_species, level] = generateRandomMonster();
      const monster: MintedMonster = {
        name: species + " " + sub_species,
        level: level,
        type: {
          species: species,
          sub_species: sub_species,
        },
      };
      monstersArray.push(monster);
    }

    setMintedMonsters(monstersArray);
    setMintLoading(false);
    setMintedMonstersDialog(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDialogClose = () => {
    setMintedMonstersDialog(false);
    setMintedMonsters([]);
  };

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
      setOpenSnackbar(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSaveMinted(data) {
    try {
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
      setMintedMonstersDialog(false);
      setMintedMonsters([]);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "350px",
          margin: "auto",
        }}
      >
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Generate monsters" />
          <Tab label="Custom monster" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <div
          style={{
            padding: "20px",
            margin: "auto",
            width: "400px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            style={{ maxWidth: "200px", margin: "0" }}
            margin="normal"
            label="Number of monsters"
            name="level"
            type="number"
            value={monstersToMint}
            onChange={(e: React.SyntheticEvent) =>
              setMonstersToMint(e.target.value)
            }
          />
          <Button
            variant="contained"
            style={{ borderRadius: "8px", height: "50px" }}
            onClick={() => handleGenerateRandomMonsters(monstersToMint)}
            endIcon={
              mintLoading ? <CircularProgress color="inherit" size={16} /> : ""
            }
          >
            Mint
          </Button>
        </div>
      )}

      {tab === 1 && (
        <Box
          sx={{
            borderColor: "divider",
            width: "350px",
            margin: "auto",
          }}
        >
          <CustomMonsterForm onSubmit={(monster) => handleSave([monster])} />
        </Box>
      )}

      <MintedMonstersDialog
        open={mintedMonstersDialog}
        handleSave={handleSaveMinted}
        handleClose={handleDialogClose}
        mintedMonsters={mintedMonsters}
      />

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Monsters saved"
      />
    </div>
  );
}
