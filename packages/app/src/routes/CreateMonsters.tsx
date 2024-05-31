import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress, Button } from "@mui/material";
import NumberInput from "../components/NumberInput";
import MintedMonstersDialog from "../components/MintedMonstersDialog";
import generateRandomMonster from "../common/generateRandomMonster";

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
          }}
        >
          <NumberInput
            placeholder="Number of desired monsters"
            value={monstersToMint}
            setValue={(val) => setMonstersToMint(val)}
          />
          <Button
            variant="contained"
            style={{ borderRadius: "8px" }}
            onClick={() => handleGenerateRandomMonsters(monstersToMint)}
            endIcon={
              mintLoading ? <CircularProgress color="inherit" size={16} /> : ""
            }
          >
            Mint
          </Button>
        </div>
      )}

      <MintedMonstersDialog
        open={mintedMonstersDialog}
        handleClose={handleDialogClose}
        mintedMonsters={mintedMonsters}
      />
    </div>
  );
}
