import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

export default function CreateMonsters() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "350px", margin: 'auto' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Generate monsters" />
          <Tab label="Custom monster" />
        </Tabs>
      </Box>
    </div>
  );
}
