import gql from 'graphql-tag'

export const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            username
            createdAt
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

export const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`