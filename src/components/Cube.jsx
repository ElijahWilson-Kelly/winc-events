import { useState } from "react";

import { Box } from "@chakra-ui/react";

export const Cube = () => {
  const [rotation, setRotation] = useState("rotate3d(-1, 1, 1, -45deg)");

  return (
    <a href="https://elijahwilsonkellyportfolio.netlify.app/">
      <Box
        w={["20px"]}
        h={["20px"]}
        display={"inline-block"}
        onMouseEnter={() => setRotation("rotate3d(-1, 1, 1, -275deg)")}
        onMouseLeave={() => setRotation("rotate3d(-1, 1, 1, -45deg)")}
      >
        <Box
          style={{
            transformStyle: "preserve-3d",
            height: "inherit",
            width: "inherit",
            transform: `${rotation}`,
            transition: "transform 600ms ease-in",
            position: "relative",
          }}
        >
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "translateZ(11px)",
            }}
          ></Box>
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "rotateY(90deg) translateZ(11px)",
            }}
          ></Box>
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "rotateY(-90deg) translateZ(11px)",
            }}
          ></Box>
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "rotateY(180deg) translateZ(11px)",
            }}
          ></Box>
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "rotateX(90deg) translateZ(11px)",
            }}
          ></Box>
          <Box
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              border: "1px solid black",
              transform: "rotateX(-90deg) translateZ(11px)",
            }}
          ></Box>
        </Box>
      </Box>
    </a>
  );
};
