"use client";

export function FilmGrain() {
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:8,pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`,
      opacity:0.4,mixBlendMode:"overlay",
    }}/>
  );
}

export function Vignette() {
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:3,pointerEvents:"none",
      background:[
        "radial-gradient(ellipse 62% 60% at 50% 43%,rgba(4,2,9,0) 0%,rgba(4,2,9,0.58) 54%,rgba(4,2,9,0.96) 100%)",
        "linear-gradient(to bottom,rgba(4,2,9,0.68) 0%,transparent 17%,transparent 72%,rgba(4,2,9,0.84) 100%)",
        "linear-gradient(to right,rgba(4,2,9,0.50) 0%,transparent 13%,transparent 87%,rgba(4,2,9,0.50) 100%)",
      ].join(","),
    }}/>
  );
}
