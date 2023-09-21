import { useState, useEffect, useContext } from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";
import { Heading, Stack, Textarea, Button, Box } from "@chakra-ui/react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Comment } from "./Comment";

export const CommentsSection = ({ commentsFromServer, eventId, users }) => {
  let [comments, setComments] = useState(commentsFromServer);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    (async () => {
      try {
        await fetch(`https://events-data.onrender.com/events/${eventId}`, {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify({
            comments: comments,
          }),
        });
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
      <Heading fontWeight={300} textAlign={"center"} fontSize={"2rem"}>
        Comments
      </Heading>

      <Box
        border="1px solid"
        borderColor="blue.200"
        borderRadius={10}
        p={3}
        boxShadow={"inset 0px 0px 1px 0px black"}
      >
        <Stack
          overflow={"scroll"}
          borderRadius={"inherit"}
          maxH={["400px", "500px", "600px"]}
          p={2}
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
      </Box>
    </Stack>
  );
};

CommentsSection.propTypes = {
  commentsFromServer: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired,
};
