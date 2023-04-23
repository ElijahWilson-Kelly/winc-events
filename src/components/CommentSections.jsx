import { Box, Heading, Stack, Textarea, Button, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Form, useSubmit } from "react-router-dom";
import { Comment } from "./Comment";

import { UsersContext } from "./UsersContext";

/***
 * Comments Section
 *
 *  Hooks
 *  - useContext() - get users data from {UserContext}
 *  - useEffect() - when comments state is changed upload new comments array to server with "Patch" reequest
 *
 *  State
 *  - comments { array = [{object}, {object},...] } - comments on event
 *
 *  Functions
 *  - addComment (event) - adds comment {object} to {comments}
 *  - deleteComment (id) - deletes comment {object} from {comments}
 */

export const CommentsSection = ({ commentsFromServer, eventId }) => {
  let [comments, setComments] = useState(commentsFromServer);
  const { currentUser } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
              comments: comments,
            }),
          }
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [comments]);

  const addComment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = Object.fromEntries(formData);
    comment.commentedBy = currentUser.id;
    setComments((prevComments) => {
      const id =
        prevComments.length > 0
          ? prevComments[prevComments.length - 1].id + 1
          : 0;
      comment.id = id;
      return prevComments.concat(comment);
    });
    e.target.comment.value = "";
  };

  const deleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id != id)
    );
  };

  return (
    <Stack>
      <Heading fontWeight={100} textAlign={"center"} fontSize={"3rem"}>
        Comments
      </Heading>

      <Stack
        border="1px solid"
        borderColor="blue.900"
        borderRadius={10}
        p={10}
        boxShadow={"inset 0px 0px 2px 0px black"}
      >
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
          );
        })}
        <Form method="patch" onSubmit={addComment}>
          <Textarea
            placeholder="Write your comment:"
            resize={"none"}
            name="comment"
          ></Textarea>
          <Button float={"right"} type="submit">
            Add
          </Button>
        </Form>
      </Stack>
    </Stack>
  );
};
