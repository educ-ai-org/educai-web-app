import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Modal from '@mui/material/Modal'
import Layout from './Layout'
import CheckBox from '../components/CheckBox/CheckBox'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { RiCloseFill, RiLink } from 'react-icons/ri'
import { useState } from 'react'
import FileInput from '../components/FileInput/FileInput'
import { CiMusicNote1 } from 'react-icons/ci'
import { LuFile } from 'react-icons/lu'
import useClient from '../lib/client/useAIClient'
import TypingAnimation from '../components/TypingAnimation/TypingAnimation'
import { FaFilePdf } from 'react-icons/fa6'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Material() {
    const client = useClient()

    const [document, setDocument] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)
    const [instrucoes, setInstrucoes] = useState<string>('')
    const [linkYoutube, setLinkYoutube] = useState<string>('')

    const [errorMessage, setErrorMessage] = useState<string>('')

    const [instrucoesIsChecked, setInstrucoesIsChecked] = useState<boolean>(true)
    const [documentoIsChecked, setDocumentoIsChecked] = useState<boolean>(false)
    const [linkYoutubeIsChecked, setLinkYoutubeIsChecked] = useState<boolean>(false)
    const [mp3IsChecked, setMp3IsChecked] = useState<boolean>(false)

    const errorToast = (message: string) => {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 2600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        })
    }

    const [openModal, setOpenModal] = useState<boolean>(false)

    const [pdfLink, setPdfLink] = useState<string>('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<File | null>>) => {
        set(event.target.files ? event.target.files[0] : null)
    }

    const handleValueChange = (event: string, set: React.Dispatch<React.SetStateAction<string>>) => {
        set(event)
    }

    const isValidYoutubeUrl = (url: string) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
        return regex.test(url)
    }

    const extractYoutubeId = (url: string) => {
        const regex = /v=([a-zA-Z0-9_-]{11})/
        const match = url.match(regex)
        console.log(match)
        return match ? match[1] : null
    }

    const handleClick = async () => {
        if (!instrucoes && !linkYoutube && !audio && !document) {
            setErrorMessage('Pelo menos uma entrada deve ser preenchida!')
            return
        }

        if (linkYoutubeIsChecked && !isValidYoutubeUrl(linkYoutube)) {
            setErrorMessage('Por favor, insira um link válido do YouTube!')
            return
        }

        setErrorMessage('')

        let payload = {}
        const youtubeId = linkYoutubeIsChecked ? extractYoutubeId(linkYoutube) : null
        linkYoutubeIsChecked && (payload = { ...payload, youtubeLink: youtubeId })
        mp3IsChecked && (payload = { ...payload, audio })
        documentoIsChecked && (payload = { ...payload, document })
        instrucoesIsChecked && (payload = { ...payload, instructions: instrucoes })

        setOpenModal(true)
        try {

            const response = await client.generateEducationalMaterial(payload)
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            const pdfUrl = URL.createObjectURL(pdfBlob)
            setPdfLink(pdfUrl)
        } catch (error) {
            errorToast('Ocorreu um erro ao gerar o material didático. Tente novamente.')
            setOpenModal(false)
        }

    }

    const handleOnCloseModal = () => {
        setOpenModal(false)
        setPdfLink('')
    }

    return (
        <Layout>
            <Box sx={{ width: '100%', padding: '25px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <img src='./Illustration/Edu-Robot.svg' alt='Robo do Educ.AI' />
                    <Box sx={{
                        width: '80%', display: 'flex', justifyItems: 'center', alignItems: 'center',
                        backgroundColor: '#F5F5F5', border: '1px solid #E2E2E2', borderRadius: '10px', padding: '15px'
                    }}>
                        <Typography sx={{ color: '#5E5E5E', fontWeight: 700, fontSize: 14 }}>
                            Quais tipos de entradas você fornecerá para a criação do material didático?
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ padding: '20px', marginTop: '12px' }}>
                    <Typography sx={{ color: '#545454', fontWeight: 400, fontSize: 12, marginBottom: '6px' }}>
                        Escolha uma ou mais entradas:
                    </Typography>

                    <FormGroup>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <CheckBox checked={instrucoesIsChecked} setChecked={setInstrucoesIsChecked} label='Instruções' />
                            <CheckBox checked={linkYoutubeIsChecked} setChecked={setLinkYoutubeIsChecked} label='Link Youtube' />
                            <CheckBox checked={mp3IsChecked} setChecked={setMp3IsChecked} label='MP3' />
                            <CheckBox checked={documentoIsChecked} setChecked={setDocumentoIsChecked} label='Documento' />
                        </Box>
                    </FormGroup>
                </Box>

                <Box sx={{
                    padding: '20px 120px',
                    border: '1px solid #DADADA',
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <Typography sx={{ color: '#545454', fontWeight: 600, fontSize: 16, marginBottom: '6px' }}>
                        Entradas
                    </Typography>

                    {instrucoesIsChecked && <TextField
                        onChange={(event) => handleValueChange(event.target.value, setInstrucoes)}
                        multiline
                        rows={3}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position='start' sx={{ marginBottom: 'auto', marginTop: '10px' }}>
                                    <IoChatbubblesOutline size={22} color='#7750DE' />
                                </InputAdornment>,
                            sx: { borderRadius: 2 }
                        }}
                        placeholder='Escreva instruções'
                        sx={{ fontSize: '16px', width: '100%' }}
                    />}

                    {linkYoutubeIsChecked && <TextField
                        onChange={(event) => handleValueChange(event.target.value, setLinkYoutube)}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position='start'>
                                    <RiLink size={22} color='#7750DE' />
                                </InputAdornment>,
                            sx: { borderRadius: 2 }
                        }}
                        placeholder='Link do Youtube'
                        sx={{ fontSize: '16px', width: '100%' }}
                    />}

                    {mp3IsChecked &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                            <FileInput
                                id='audio'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, setAudio)}
                                value={audio}
                                description='Carregar arquivo de áudio MP3'
                                icon={<CiMusicNote1 size={22} color='#7750DE' />}
                            />
                        </Box>
                    }

                    {documentoIsChecked &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                            <FileInput
                                id='document'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, setDocument)}
                                value={document}
                                description='Carregar um documento'
                                icon={<LuFile size={22} color='#7750DE' />}
                            />
                        </Box>
                    }
                </Box>

                {errorMessage && <Typography sx={{ color: '#FF0000', fontWeight: 400, fontSize: 14, marginTop: '10px' }}>
                    {errorMessage}
                </Typography>}

                <Button
                    onClick={handleClick}
                    variant='contained'
                    sx={{
                        width: '70%',
                        marginTop: '26px',
                        textTransform: 'none',
                    }}>Gerar Material Didático</Button>
            </Box>

            <Modal open={openModal} onClose={handleOnCloseModal} sx={{ zIndex: 100000 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {!pdfLink && <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFF',
                        padding: '24px',
                        width: '400px',
                        height: '200px',
                        borderRadius: '10px',
                    }}>
                        <img src='./Illustration/Edu-Robot.svg' alt='Edu' />
                        <Box>
                            <Typography sx={{ color: '#7750DE', fontWeight: 600, fontSize: 18, marginLeft: '12px', textAlign: 'center' }}>
                                Gerando
                            </Typography>
                            <Typography sx={{
                                color: '#545454',
                                fontWeight: 600,
                                fontSize: 18,
                                marginLeft: '12px',
                                textAlign: 'center',
                            }}>
                                Material Didático<TypingAnimation />
                            </Typography>
                        </Box>
                    </Box>}

                    {pdfLink &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFF',
                            padding: '24px',
                            width: '400px',
                            height: '200px',
                            borderRadius: '10px',
                        }}>
                            <RiCloseFill size={25} style={{
                                position: 'absolute',
                                marginTop: '-145px',
                                marginRight: '-340px',
                                cursor: 'pointer',
                                color: '#545454'
                            }}
                                onClick={handleOnCloseModal}
                            />
                            <Typography sx={{
                                color: '#545454',
                                fontWeight: 600,
                                fontSize: 18,
                                marginLeft: '12px',
                                textAlign: 'center',
                            }}>
                                Material gerado com sucesso!
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <FaFilePdf color='#7750DE' size={35} />
                                <Typography sx={{
                                    color: '#545454',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    marginLeft: '12px',
                                    textAlign: 'center',
                                }}>
                                    {`Material-${new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-')}.pdf`}
                                </Typography>
                            </Box>

                            <a
                                style={{ color: '#7750DE', fontWeight: 400, fontSize: 14, textDecoration: 'underline' }}
                                href={pdfLink}
                                download={`material-didatico-${new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-')}.pdf`}>
                                Clique aqui para fazer o download
                            </a>
                        </Box>
                    }
                </Box>
            </Modal>
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
        </Layout>
    )
}
