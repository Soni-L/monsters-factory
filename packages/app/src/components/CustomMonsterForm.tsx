import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

interface Monster {
  name: string;
  level: number;
  type: {
    species: string;
    sub_species: string;
  };
}

interface MonsterFormProps {
  onSubmit: (monster: Monster) => void;
}

const CustomMonsterForm: React.FC<MonsterFormProps> = ({ onSubmit }) => {
  const [monster, setMonster] = useState<Monster>({
    name: "",
    level: 0,
    type: {
      species: "",
      sub_species: "",
    },
  });

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
    onSubmit(monster);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Monster
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={monster.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Level"
          name="level"
          type="number"
          value={monster.level}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Species"
          name="species"
          value={monster.type.species}
          onChange={handleTypeChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="sub species"
          name="sub_species"
          value={monster.type.sub_species}
          onChange={handleTypeChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Monster
        </Button>
      </Box>
    </Container>
  );
};

export default CustomMonsterForm;
