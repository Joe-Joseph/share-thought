import gql from 'graphql-tag'


export const GET_ALL_POSTS = gql`
    query{
        getPosts{
            id
            body
            username
            createdAt
            likeCount
            commentCount
            likes{
                username
            }
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`