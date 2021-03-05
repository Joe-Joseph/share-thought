import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Label, Icon, Popup } from "semantic-ui-react";

import { LIKE_POST } from "../graphql/mutation/post";
import { GET_SINGLE_POST } from "../graphql/queries/getPosts";

const LikeButton = ({ post: { id, likeCount, likes }, user }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    onError: (err) => err,
    refetchQueries: [{ query: GET_SINGLE_POST, variables: { postId: id } }],
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Popup content={liked ? "Unlike" : "Like"} trigger={likeButton} />
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
