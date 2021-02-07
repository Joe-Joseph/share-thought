import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_POST } from '../graphql/mutation/post'
import { GET_ALL_POSTS } from '../graphql/queries/getPosts'

import { useForm } from '../util/hooks'


const PostForm = () => {
    const initialState = { body: '' }

    const { values, handleSubmit, handleChange } = useForm(createPostCallBack, initialState)

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        refetchQueries: [{ query: GET_ALL_POSTS }],
        onCompleted: () => {
            values.body = ''
        },

        onError: (err) => {
            console.log(err)
        }
    })

    function createPostCallBack(){
        createPost()
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Create a post</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Your post..."
                        name="body"
                        onChange={handleChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">Submit</Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message">
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default PostForm
