import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

interface Monster {
  _id: string;
  name: string;
  type: object;
}

interface MonstersResponse {
  total: number;
  page: number;
  limit: number;
  monsters: Monster[];
}

export default function DisplayMonsters() {
  const [monsters, setMonsters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalElements, setTotalElements] = useState(1);

  useEffect(() => {
    const fetchMonsters = async () => {
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

    fetchMonsters();
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

  return (
    <div style={{ padding: "10px" }}>
      {monsters.map((monster: Monster) => (
        <div key={monster._id}>{monster.name}</div>
      ))}

      <TablePagination
        component="div"
        count={totalElements}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
