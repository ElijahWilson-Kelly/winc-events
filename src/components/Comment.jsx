import { useContext } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Image, Text, Stack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

import { UsersContext } from "./UsersContext";

/***
 * Comment Component
 *
 *  Props
 *  - comment {object}
 *  - deleteComment {function}
 *
 *  Hooks
 *  - useContext() - getting users from {UsersContext}
 */

export const Comment = ({ comment, deleteComment }) => {
  const { currentUser, allUsers } = useContext(UsersContext);
  const imageSrc =
    allUsers.find((user) => user.id === comment.commentedBy)?.image || "";
  const commentedByCurrentUser = comment.commentedBy === currentUser?.id;
  const styling = {
    p: 4,
    borderRadius: 20,
  };

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
      gap={2}
      className="comment"
    >
      <Box>
        <Text overflowWrap={"anywhere"}>{comment.comment}</Text>
      </Box>
      <Stack align={"center"} justify={"space-between"}>
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
          w={"40px"}
          minW={"40px"}
          h={"40px"}
          className={commentedByCurrentUser ? "current-user" : ""}
        />
      </Stack>
    </Flex>
  );
};

Comment.propTypes = {
  comment: PropTypes.exact({
    comment: PropTypes.string.isRequired,
    commentedBy: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};
