import { Flex, Box, Image, Text, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { UsersContext } from "./UsersContext";

import { MdDelete } from "react-icons/md";

export const Comment = ({ comment, deleteComment }) => {
  const { currentUser, allUsers } = useContext(UsersContext);

  const imageSrc =
    allUsers.find((user) => user.id === comment.commentedBy)?.image || "";

  const styling = {
    p: 5,
    borderRadius: 20,
  };

  const commentedByCurrentUser = comment.commentedBy === currentUser?.id;

  if (commentedByCurrentUser) {
    styling.bg = "green.100";
    styling.borderBottomRightRadius = 0;
  } else {
    styling.bg = "blue.100";
    styling.borderBottomLeftRadius = 0;
  }

  return (
    <Flex
      {...styling}
      justify={"space-between"}
      w={"100%"}
      gap={5}
      className="comment"
    >
      <Box maxWidth={"85%"}>
        <Text overflowWrap={"anywhere"}>{comment.comment}</Text>
      </Box>
      <Stack align={"center"} justify={"space-between"} gap={20}>
        <MdDelete
          fontSize={"1.4rem"}
          onClick={() => deleteComment(comment.id)}
          className={`icon-hover-grow delete-btn ${
            !commentedByCurrentUser ? "disabled" : ""
          }`}
        />
        <Image
          src={imageSrc}
          borderRadius={"50%"}
          boxSize="50px"
          className={commentedByCurrentUser ? "current-user" : ""}
        />
      </Stack>
    </Flex>
  );
};
