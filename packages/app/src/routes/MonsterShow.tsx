import { useState, useEffect, useRef } from "react";
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

export default function MonsterShow() {
  const [displayMonsters, setDisplayMonsters] = useState([]);
  const cachedMonsters = useRef([]);
  const page = useRef(1);
  const totalElements = useRef(1);

  useEffect(() => {
    //Fetch from backend every 5 seconds
    const fetchInterval = setInterval(async () => {
      try {
        //if there are more than 100 items in catche don't load more
        if (cachedMonsters.current?.length <= 100) {
          const response = await fetch(
            `${BACKEND_URL}?page=${page.current}&limit=${10}`
          );
          const data = await response.json();

          // Filter out duplicates based on _id
          let newUniqueData = [];
          data.monsters.forEach((newMonster) => {
            let monsterIncache = cachedMonsters.current.some(
              (item) => item._id === newMonster._id
            );

            if (!monsterIncache) {
              newUniqueData.push(newMonster);
            }
          });

          cachedMonsters.current = [
            ...cachedMonsters.current,
            ...newUniqueData,
          ];

          //if we are not on the last page we advance to the next
          if (data.page * 10 <= data.total) {
            totalElements.current = data.total;
            page.current = Number(data.page) + 1;
          }
          //otherwise if its the last page we start over
          else {
            totalElements.current = data.total;
            page.current = 1;
          }
        }
      } catch (error) {
        console.error("Error fetching monsters:", error);
      }
    }, 5000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  useEffect(() => {
    const displayEveryOneSecondInterval = setInterval(() => {
      if (displayMonsters.length == 0 && cachedMonsters.current.length > 0) {
        setDisplayMonsters([cachedMonsters.current[0]]);
      }

      if (
        displayMonsters.length > 0 &&
        displayMonsters.length < cachedMonsters.current.length
      ) {
        const monsterInDisplay = displayMonsters.some(
          (item) =>
            item._id === cachedMonsters.current[displayMonsters.length]._id
        );
        if (!monsterInDisplay) {
          setDisplayMonsters((prevData) => [
            ...prevData,
            cachedMonsters.current[prevData.length],
          ]);
        }
      }
    }, 1000);

    const tenSecondInterval = setInterval(() => {
      if (displayMonsters.length > 0 && cachedMonsters.current.length > 0) {
        cachedMonsters.current = cachedMonsters.current.slice(1);
        setDisplayMonsters((prevArray) => prevArray.slice(1));
      }
    }, 10000);

    return () => {
      clearInterval(displayEveryOneSecondInterval);
      clearInterval(tenSecondInterval);
    };
  }, [displayMonsters]);

  // console.log(displayMonsters)

  return (
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
      {displayMonsters.map((monster: Monster) => (
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
          ></div>
          <div>
            {monster?.name} level:
            <span style={{ fontWeight: "bold" }}>{monster.level}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
