import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/Auth'
import LikeButton from './LikeButton'

const  PostCard = ({ post }) => {
    const { user } = useContext(AuthContext)
    const {
        body,
        username,
        createdAt,
        id,
        comments,
        commentCount,
        likeCount,
        likes
    } = post

    const likePost = () => {
        console.log('Like post here')
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>

                <Button labelPosition='right' as={Link} to={`/posts/$id`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button
                        as='div'
                        color='red'
                        onClick={() => console.log('Delete post')}
                        floated='right'
                    >
                        <Icon name='trash'/> Delete
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard