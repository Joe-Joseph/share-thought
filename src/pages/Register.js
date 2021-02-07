import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { REGISTER_USER } from '../graphql/mutation/user'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/Auth'


const Register = (props) => {
    const [errors, setErrors] = useState({})
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const context = useContext(AuthContext)

    const { handleChange, handleSubmit, values } = useForm(registerUser, initialState)

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, {data: {register: userData}}) => {
            context.login(userData)
            setErrors({})
            props.history.push('/')
        },

        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log('ERRORS', errors)
        },

        variables: values
    })

    function registerUser(){
        addUser()
    }

    // const registerUser = () => addUser()

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type='email'
                    error={errors.email ? true : false}
                    value={values.email}
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

                <Form.Input
                    label="Comfirm password"
                    placeholder="Comfrim password.."
                    name="confirmPassword"
                    type='password'
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={handleChange}
                />

                <Button type="submit" loading={loading} primary>Register</Button>
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

export default Register

