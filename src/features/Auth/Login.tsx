import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import { useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {Paper} from "@mui/material";
import {selectIsLoggedIn} from "./selectors";
import {authActions} from "./index";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const formik = useFormik({
        validate: values => {
            type ErrorsType = {
                password: string
                email: string
            }
            const errors = {} as ErrorsType;
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length > 20) {
                errors.password = 'Must be 20 characters or less';
            }
            if (!values.email) {
                errors.email = ' Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(authActions.login(values))
            if (authActions.login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }

            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }
    return (
        <Grid container justifyContent={'center'} style={{marginTop: '40px'}}>
            <Paper elevation={2} style={{padding: "15px",}}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}
                                   rel="noreferrer">
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email ? <div style={{
                                color: 'red',
                                fontSize: '14px',
                                fontWeight: '600',
                                lineHeight: '14px'
                            }}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password ? <div style={{
                                color: 'red',
                                fontSize: '14px',
                                fontWeight: '600',
                                lineHeight: '14px'
                            }}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox/>}
                                              {...formik.getFieldProps("rememberMe")}
                                              checked={formik.values.rememberMe}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    )
}
