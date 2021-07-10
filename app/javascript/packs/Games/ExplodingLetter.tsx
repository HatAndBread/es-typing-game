import React, { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import explosion from "../../../assets/images/explosion.gif";

const ExplodingLetter = ({
  letter,
  size,
  startExploding,
}: {
  letter: string;
  size: number;
  startExploding: 0 | 1;
}): JSX.Element => {
  const [exploded, setExploded] = useState(false);
  const [exploding, setExploding] = useState(false);
  useEffect(() => {
    if (startExploding) {
      setExploding(true);
    }
  }, [startExploding, setExploding]);
  return (
    <div className='ExplodingLetter' style={{ fontSize: `${size}px` }}>
      {letter}
      {exploding ? <img src={explosion} alt={""}></img> : ""}
    </div>
  );
};

export default ExplodingLetter;
