import { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
import ActionsMenu from "../components/ActionsMenu";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

interface MonsterType {
  species: string;
  sub_species: string;
}

interface Monster {
  _id: string;
  name: string;
  level: number;
  type: MonsterType;
}

interface MonstersResponse {
  total: number;
  page: number;
  limit: number;
  monsters: Monster[];
}

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

export default function DisplayMonsters() {
  const [monsters, setMonsters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalElements, setTotalElements] = useState(1);

  const fetchMonsters = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}?page=${page}&limit=${limit}`
      );
      const data: MonstersResponse = await response.json();

      setMonsters(data.monsters);
      setTotalElements(data.total);
    } catch (error) {
      console.error("Error fetching monsters:", error);
    }
  };

  const deleteMonster = async (monster: Monster) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${monster._id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        fetchMonsters(1, limit);
      } else {
        console.error(result.message || "Failed to delete monster");
      }
    } catch (error) {
      console.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchMonsters(page, limit);
  }, [page, limit]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDeleteMonster = (monster: Monster) => {
    if (confirm(`Delete ${monster.name}?`) == true) {
      deleteMonster(monster);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "40px",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "calc(100vh - 120px)",
        }}
      >
        {monsters.map((monster: Monster) => (
          <div
            key={monster._id}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "200px",
                width: "300px",
                backgroundColor:
                  "#" +
                  stringToColorCode(
                    monster?.type?.species + monster?.type?.sub_species
                  ),
                display: "flex",
                justifyContent: "end",
              }}
            >
              <ActionsMenu onDelete={() => handleDeleteMonster(monster)} />
            </div>

            <div>
              {monster.name} level:
              <span style={{ fontWeight: "bold" }}>{monster.level}</span>
            </div>
          </div>
        ))}
      </div>

      <TablePagination
        style={{
          position: "fixed",
          bottom: 0,
          borderTop: "1px solid gray",
          width: "100%",
          backgroundColor: "#7349AC",
          color: "white",
        }}
        component="div"
        count={totalElements}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Items per page"}
      />
    </>
  );
}
