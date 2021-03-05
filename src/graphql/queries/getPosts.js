import gql from "graphql-tag";

export const GET_ALL_POSTS = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        username
      }
      likeCount
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
