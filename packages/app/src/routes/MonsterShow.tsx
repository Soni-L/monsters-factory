import { useState, useEffect, useRef, memo } from "react";
import { stringToColorCode } from "../common/helperFunctions";
import { Monster } from "../types/MonsterTypes";
import { Typography } from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function removeMatchingObjects(array1, array2) {
  try {
    // Create a set of _id values from the second array for quick lookup
    const idsToRemove = new Set(array2.map((obj) => obj._id));

    // Filter the first array to exclude objects with _id values found in the set
    const resultArray = array1.filter((obj) => !idsToRemove.has(obj._id));

    // Return the new array
    return resultArray;
  } catch {
    return array1;
  }
}

function isTimestampOlderThan10Seconds(timestamp) {
  const currentTime = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
  return currentTime - timestamp > 10;
}

function Banner() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "calc(100vh - 64px)",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          animation: "pulsate 1s infinite cubic-bezier(.17,.67,.83,.67)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -300%)",
          fontWeight: "bold",
          fontFamily: "The halloween",
          color: "yellow",
          textShadow: "2px 2px #512888",
          letterSpacing: "2px",
          fontSize: "20px",
          "@keyframes pulsate": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.5 },
            "100%": { opacity: 1 },
          },
        }}
      >
        Beginning show
      </Typography>
    </div>
  );
}

const MemoizedBanner = memo(Banner);

export default function MonsterShow() {
  const [displayMonsters, setDisplayMonsters] = useState([]);
  const cachedMonsters = useRef([]);
  const page = useRef(1);
  const totalElements = useRef(1);

  useEffect(() => {
    //Fetch from backend every 5 seconds
    const fetchInterval = setInterval(async () => {
      const limit = 20;
      try {
        //if there are more than 100 items in catche don't load more
        if (
          cachedMonsters.current?.length < 100 &&
          cachedMonsters.current.length < totalElements.current
        ) {
          const response = await fetch(
            `${BACKEND_URL}?page=${page.current}&limit=${limit}`
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
          if (data.page * limit <= data.total) {
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
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  useEffect(() => {
    const displayEveryOneSecondInterval = setInterval(() => {
      if (displayMonsters.length == 0 && cachedMonsters.current.length > 0) {
        const newDisplayMonster = {
          ...cachedMonsters.current[0],
          timestamp: Math.floor(Date.now() / 1000),
        };
        setDisplayMonsters([newDisplayMonster]);
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
          let newDisplayMonster = {
            ...cachedMonsters.current[displayMonsters.length],
            timestamp: Math.floor(Date.now() / 1000),
          };
          setDisplayMonsters((prevData) => [...prevData, newDisplayMonster]);
        }
      }
    }, 1000);

    const removeStaleMonsters = setInterval(() => {
      if (displayMonsters.length > 0 && cachedMonsters.current.length > 0) {
        const staleMonstersArray = displayMonsters.filter((monster) =>
          isTimestampOlderThan10Seconds(monster.timestamp)
        );

        cachedMonsters.current = removeMatchingObjects(
          cachedMonsters.current,
          staleMonstersArray
        );
        setDisplayMonsters((prevArray) =>
          removeMatchingObjects(prevArray, staleMonstersArray)
        );
      }
    }, 1000);

    return () => {
      clearInterval(displayEveryOneSecondInterval);
      clearInterval(removeStaleMonsters);
    };
  }, [displayMonsters]);

  if (displayMonsters.length === 0) {
    return <MemoizedBanner />;
  }

  return (
    <div
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
        height: "calc(100vh - 65px)",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 310px)",
          justifyContent: "center",
          gap: "15px",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        {displayMonsters.map((monster: Monster) => (
          <div key={monster._id} style={{ width: "310px" }}>
            <div
              style={{
                position: "relative",
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
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -100%)",
                  fontWeight: "bold",
                  fontFamily: "The halloween",
                  fontSize: "9px",
                  color: "yellow",
                  textShadow: "2px 2px black",
                  letterSpacing: "1px",
                }}
              >
                {monster.name}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px",
                padding: "2px 4px",
                color: "yellow",
                textShadow: "2px 2px #512888",
              }}
            >
              <Typography>
                {`${monster.type.species} ${monster.type.sub_species}`}
              </Typography>
              <Typography>level: {monster.level}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
