import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react'

import { GET_ALL_POSTS } from '../graphql/queries/getPosts'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/Auth'


const Home = () => {
    const { user } = useContext(AuthContext)
    const {loading, data} = useQuery(GET_ALL_POSTS)

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading posts ...</h1>
                ): (
                    <Transition.Group>
                        {
                            data && data.getPosts &&
                            data.getPosts.map(post => (
                                <Grid.Column key={post.id} className="post-container">
                                    <PostCard post={post}/>
                                </Grid.Column>
                                
                            )) 
                        }
                    </Transition.Group>
                   
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home

