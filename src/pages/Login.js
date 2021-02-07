import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { LOGIN_USER } from '../graphql/mutation/user'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/Auth'


const Login = (props) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const initialState = {
        username: '',
        password: '',
    }

    const { handleChange, handleSubmit, values } = useForm(loginUserCallback, initialState)

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update: (_, {data: {login: userData}}) => {
            setErrors({})
            context.login(userData)
            props.history.push('/')
        },

        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },

        variables: values
    })

    function loginUserCallback(){
        loginUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type='text'
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={handleChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type='password'
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={handleChange}
                />

                <Button type="submit" loading={loading} primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Login



