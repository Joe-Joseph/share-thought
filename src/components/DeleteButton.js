import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_POST } from "../graphql/mutation/post";
import { DELETE_COMMENT_MUTATION } from "../graphql/mutation/comment";
import { GET_ALL_POSTS } from "../graphql/queries/getPosts";

export default function DeleteButton({ postId, callback, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    onCompleted: () => {
      setConfirmOpen(false);
      callback && callback();
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
        content="Are you sure you want to delete this?"
      />
    </>
  );
}
