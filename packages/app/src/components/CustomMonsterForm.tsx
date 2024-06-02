import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { MintedMonster } from "../types/MonsterTypes";
import { stringToColorCode } from "../common/helperFunctions";

interface MonsterFormProps {
  onSubmit: (monster: MintedMonster) => void;
}

const CustomMonsterForm: React.FC<MonsterFormProps> = ({ onSubmit }) => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    level: "",
    type: {
      species: "",
      sub_species: "",
    },
  });

  const [monster, setMonster] = useState<MintedMonster>({
    name: "",
    level: 0,
    type: {
      species: "",
      sub_species: "",
    },
  });

  const handleValidate = (monsterForm) => {
    let isValid = true;

    let name = "";
    let level = "";
    let species = "";
    let sub_species = "";

    if (!monsterForm.name) {
      name = "Required";
      isValid = false;
    }

    if (!monsterForm.level) {
      level = "Required";
      isValid = false;
    } else if (monsterForm.level < 1 || monsterForm.level > 100) {
      level = "Level should be between 0 - 100";
      isValid = false;
    }

    if (!monsterForm.type.species) {
      species = "Required";
      isValid = false;
    }
    if (!monsterForm.type.sub_species) {
      sub_species = "Required";
      isValid = false;
    }

    setFormErrors({
      name: name,
      level: level,
      type: {
        species: species,
        sub_species: sub_species,
      },
    });
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMonster((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMonster((prev) => ({
      ...prev,
      type: {
        ...prev.type,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidate(monster) === true) {
      onSubmit(
        monster,
        setMonster({
          name: "",
          level: 0,
          type: {
            species: "",
            sub_species: "",
          },
        })
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Monster
        </Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={monster.name}
          onChange={handleChange}
          error={formErrors.name ? true : false}
          helperText={formErrors.name ? formErrors.name : ""}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Level"
          name="level"
          type="number"
          value={monster.level}
          onChange={handleChange}
          error={formErrors.level ? true : false}
          helperText={formErrors.level ? formErrors.level : ""}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Species"
          name="species"
          value={monster.type.species}
          onChange={handleTypeChange}
          error={formErrors.type.species ? true : false}
          helperText={formErrors.type.species ? formErrors.type.species : ""}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="sub species"
          name="sub_species"
          value={monster.type.sub_species}
          onChange={handleTypeChange}
          error={formErrors.type.sub_species ? true : false}
          helperText={
            formErrors.type.sub_species ? formErrors.type.sub_species : ""
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            textShadow: "1px 1px #512888",
            backgroundColor:
              !monster.type.species && !monster.type.sub_species
                ? "#512888"
                : "#" +
                  stringToColorCode(
                    monster.type.species + monster.type.sub_species
                  ),
          }}
        >
          Create Monster
        </Button>
      </Box>
    </Container>
  );
};

export default CustomMonsterForm;
