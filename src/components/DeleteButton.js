import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_POST } from "../graphql/mutation/post";
import { GET_ALL_POSTS } from "../graphql/queries/getPosts";

export default function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      setConfirmOpen(false);
      callback && callback();
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
    variables: {
      postId,
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
        onConfirm={deletePost}
        content="Are you sure you want to delete this post?"
      />
    </>
  );
}
