"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LegendCell } from "./LegendCell";

type Genre =
  | "romance"
  | "action"
  | "drama"
  | "epic"
  | "thriller"
  | "social"
  | "crime"
  | "horror"
  | "comedy"
  | "biopic";

type MovieItem = [title: string, genre: Genre];

const MOVIES: MovieItem[] = [
  ["SHOLAY","action"],      ["DEVDAS","romance"],     ["LAGAAN","epic"],
  ["DDLJ","romance"],       ["MUGHAL-E-AZAM","epic"], ["KABHI KHUSHI","romance"],
  ["3 IDIOTS","comedy"],    ["PAKEEZAH","drama"],      ["GUIDE","drama"],
  ["DEEWAR","action"],      ["MOTHER INDIA","social"], ["AWAARA","drama"],
  ["AGNEEPATH","action"],   ["ZANJEER","action"],      ["SILSILA","romance"],
  ["PYAASA","drama"],       ["TRISHUL","action"],      ["DON","thriller"],
  ["ARADHANA","romance"],   ["ANAND","drama"],         ["BANDINI","drama"],
  ["UMRAO JAAN","drama"],   ["ABHIMAAN","drama"],      ["NASEEB","action"],
  ["SUJATA","social"],      ["PARAKH","social"],       ["HAQEEQAT","epic"],
  ["RANG DE BASANTI","social"], ["GANGS OF WAS.","crime"], ["BRAHMASTRA","epic"],
  ["PATHAAN","action"],     ["DILWALE","romance"],     ["RAM LAKHAN","action"],
  ["KHALNAYAK","action"],   ["TEZAAB","action"],       ["BAAZIGAR","thriller"],
  ["KAL HO NA HO","romance"], ["JODHAA AKBAR","epic"], ["BAJRANGI BH.","social"],
  ["PK","comedy"],          ["DANGAL","biopic"],       ["ARTICLE 15","social"],
  ["ANDHADHUN","thriller"], ["DRISHYAM","thriller"],   ["URI","biopic"],
  ["RAAZI","thriller"],     ["GULLY BOY","biopic"],    ["SWADES","social"],
  ["TAARE ZAMEEN","social"],["ROCK ON","drama"],       ["LOOTERA","romance"],
  ["HAIDER","crime"],       ["TALVAR","thriller"],     ["PINK","social"],
  ["QUEEN","drama"],        ["HIGHWAY","drama"],       ["THAPPAD","social"],
  ["SHERSHAAH","biopic"],   ["BHOOL BHULAIYAA","horror"], ["JAWAN","action"],
  ["DUNKI","social"],       ["ANIMAL","crime"],        ["KALKI","epic"],
];

const COLS = 7, ROWS = 9;

export function LegendGrid() {
  const gridData = useMemo(() => {
    const data = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const [title, genre] = MOVIES[i % MOVIES.length];
      data.push({ title, genre, idx: i });
    }
    return data;
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1,
      opacity: 0.65,
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      alignItems: "center",
      justifyItems: "center",
    }}>
      {Array.from({ length: COLS }, (_, colIdx) => (
        <motion.div
          key={colIdx}
          animate={{ y: colIdx % 2 === 0 ? [0, -120, 0] : [0, 120, 0] }}
          transition={{ duration: 28 + colIdx * 1.2, repeat: Infinity, ease: "linear" }}
          style={{
            gridColumn: colIdx + 1,
            gridRow: "1 / -1",
            display: "grid",
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            height: "100vh",
            width: "100%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {Array.from({ length: ROWS }, (_, rowIdx) => {
            const cellIdx = rowIdx * COLS + colIdx;
            const item = gridData[cellIdx];
            return (
              <div
                key={cellIdx}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LegendCell
                  title={item.title}
                  genre={item.genre}
                  idx={cellIdx}
                />
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}
