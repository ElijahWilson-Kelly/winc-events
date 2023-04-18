import { useOutletContext } from "react-router-dom";
import { Flex, Box, Image, Text, Grid } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const Comment = ({ comment }) => {
  const users = useOutletContext();
  const { currentUser } = useContext(UserContext);

  const imageSrc =
    users.find((user) => user.id === comment.commentedBy)?.image || "";

  const styling = {
    p: 5,
    borderRadius: 20,
  };

  if (comment.commentedBy === currentUser?.id) {
    styling.bg = "green.100";
    styling.borderBottomRightRadius = 0;
  } else {
    styling.bg = "blue.100";
    styling.borderBottomLeftRadius = 0;
  }
  // maxWidth={["60px", "180px", "240px", "400px", "600px"]}

  return (
    <Flex {...styling} justify={"space-between"} w={"100%"} gap={5}>
      <Text>{comment.comment}</Text>

      <Image
        src={imageSrc}
        borderRadius={"50%"}
        boxSize="50px"
        className={
          comment.commentedBy === currentUser?.id ? "current-user" : ""
        }
      />
    </Flex>
  );
};
