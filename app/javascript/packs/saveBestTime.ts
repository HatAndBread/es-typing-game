import React from "react";
import { Player } from "./Types/JsonTypes";
import { getRequestObject } from "./getRequestObject";
import { camel } from "./camel";

export const saveBestTime = async (
  quizId: number,
  playerName: string,
  bestTime: number,
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>
): Promise<void> => {
  const res = await fetch(
    `/quizzes/${quizId}/update_best`,
    getRequestObject("POST", {
      name: playerName,
      best_time: bestTime.toFixed(1),
    })
  );
  const data = await res.json();
  const camelized: Player = camel(data);
  setPlayer(camelized);
};
