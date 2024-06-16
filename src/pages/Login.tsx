import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo/Logo'
import SlideLogin from '../components/SlidesLogin/SlidesLogin'
import useClient from '../lib/client/useClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingButton } from '@mui/lab'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'

export default function Login() {
    const client = useClient()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const errorToast = (message: string) => {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 2600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    }

    useEffect(() => {
        const onEnter = (e: any) => {
            if (e.key === 'Enter') {
                handleLogin.execute
            }
        }
        window.addEventListener('keypress', onEnter)
    })

    const handleLogin = useAsyncCallback(async () => {
        if (email === '' || password === '') {
            errorToast('Preencha todos os campos antes de realizar o login.')
            return
        }
        await client.login({ email, password }).then((res) => {
            sessionStorage.setItem('token', res.token)
            navigate('/home')
        }).catch((e) => {
            console.log(e)
            if (e.name === 'AxiosError') {
                errorToast('Email ou senha invalidos, tente novamente.')
            }
        })
    })

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                height: '100%',
                borderRadius: '0px 50px 50px 0px',
                background: 'linear-gradient(177deg, rgba(103,48,236,1) 0%, rgba(30,1,50,1) 100%)',
            }}>
                <SlideLogin />
            </Box>

            <Box sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
            }}>

                <Logo variant='padraoBlack' width='sm' />

                <Box sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <TextField
                        variant='outlined'
                        label='E-mail'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl variant='outlined'>
                        <InputLabel htmlFor='outlined-adornment-password'>Senha</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            label='Senha'
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Checkbox defaultChecked />
                        <Typography variant='body2'>Mantenha-me conectado</Typography>
                    </Box>

                    <LoadingButton variant='contained'
                        onClick={handleLogin.execute}
                        loading={handleLogin.loading}
                        sx={{
                            backgroundColor: '#6730EC',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#4D1EAD',
                            },
                            paddingY: '12px'
                        }} >
                        Entrar
                    </LoadingButton>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        justifyContent: 'center',
                    }}>
                    </Box>
                </Box>
            </Box>
            <ToastContainer
                position='bottom-right'
                autoClose={2600}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </Box>
    )
}