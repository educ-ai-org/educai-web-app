import { Box, Button, FormControlLabel, FormGroup, InputAdornment, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { RiLink } from 'react-icons/ri'
import React, { useState } from 'react'
import { CiMusicNote1 } from 'react-icons/ci'
import { LuFile } from 'react-icons/lu'
import FileInput from '../FileInput/FileInput'
import { Question } from '../../lib/types/Question' 
import { LoadingButton } from '@mui/lab'
import { GenerateQuestionPayload } from '../../lib/types/GenerateQuestionPayload' 
import { IoIosArrowDown } from 'react-icons/io'
import useClient from '../../lib/client/useAIClient'

interface GerarQuestaoModalProps {
    handleAddQuestion: (question: Question) => void
    handleCancel: () => void
}

export default function GerarQuestaoModal(props: GerarQuestaoModalProps) {
    const { handleAddQuestion, handleCancel } = props
    
    const client = useClient()

    const [document, setDocument] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)
    const [instrucoes, setInstrucoes] = useState<string>('')
    const [linkYoutube, setLinkYoutube] = useState<string>('')

    const [theme, setTheme] = useState<string>('')
    const [relatedTheme, setRelatedTheme] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('')

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [selectedValue, setSelectedValue] = useState('instrucao')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue((event.target as HTMLInputElement).value)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<File | null>>) => {
        set(event.target.files ? event.target.files[0] : null)
    }

    const handleValueChange = (event: string, set: React.Dispatch<React.SetStateAction<string>>) => {
        set(event)
    }

    const handleClick = async () => {
        if (!instrucoes && !linkYoutube && !audio && !document || (!theme || !relatedTheme || !difficulty)) {
            setErrorMessage('As entradas acima devem ser preenchidas!')
            return
        }

        setIsLoading(true)

        let payload = {} as GenerateQuestionPayload

        selectedValue == 'linkYoutube' && (payload = { ...payload, youtubeLink: linkYoutube })
        selectedValue == 'mp3' && (payload = { ...payload, audio })
        selectedValue == 'documento' && (payload = { ...payload, document })
        selectedValue == 'instrucao' && (payload = { ...payload, instructions: instrucoes })

        payload = {
            ...payload,
            theme,
            relatedTheme,
            difficulty,
            numberOfQuestions: 1
        } as GenerateQuestionPayload

        const response = await client.generateQuestion(payload)
        
        handleAddQuestion(response[0])
        
        setErrorMessage('')
        setIsLoading(false)
    }

    return (
        <Box sx={{ width: '100%', padding: '25px 50px', display: 'flex', flexDirection: 'column', minHeight: '40vh', gap: '16px' }}>
            <Select
                IconComponent={props => <IoIosArrowDown {...props} color='#7750DE' size={25} />}
                displayEmpty
                value={difficulty}
                onChange={(event) => handleValueChange(event.target.value as string, setDifficulty)}
            >   
                <MenuItem disabled value=''>
                    <em>Dificuldade</em>
                </MenuItem>
                <MenuItem value={'easy'}>Fácil</MenuItem>
                <MenuItem value={'medium'}>Médio</MenuItem>
                <MenuItem value={'hard'}>Difícil</MenuItem>
            </Select>

            <TextField
                label='Conteúdo da questão'
                onChange={(event) => handleValueChange(event.target.value, setTheme)}
                placeholder='Ex: To be verb'
                sx={{ fontSize: '16px', width: '100%' }}
            />

            <TextField
                label='Tema a ser relacionado'
                onChange={(event) => handleValueChange(event.target.value, setRelatedTheme)}
                placeholder='Ex: Tecnologia'
                sx={{ fontSize: '16px', width: '100%' }}
            />
            
            <Box sx={{ paddingBottom: '20px' }}>
                <Typography sx={{ color: '#545454', fontWeight: 400, fontSize: 16, marginBottom: '6px' }}>
                    Escolha uma entradas:
                </Typography>

                <FormGroup>
                    <RadioGroup value={selectedValue} onChange={handleChange} sx={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
                        <FormControlLabel value="instrucao" control={<Radio />} label="Instrução" />
                        <FormControlLabel value="documento" control={<Radio />} label="Documento" />
                        <FormControlLabel value="linkYoutube" control={<Radio />} label="Link Youtube" />
                        <FormControlLabel value="mp3" control={<Radio />} label="MP3" />
                    </RadioGroup>
                </FormGroup>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                overflowY: 'auto'
            }}>
                {selectedValue == 'instrucao' && <TextField
                    onChange={(event) => handleValueChange(event.target.value, setInstrucoes)}
                    multiline
                    rows={3}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start" sx={{ marginBottom: 'auto', marginTop: '10px' }}>
                                <IoChatbubblesOutline size={22} color='#7750DE' />
                            </InputAdornment>,
                        sx: { borderRadius: 2 }
                    }}
                    placeholder='Escreva instruções'
                    sx={{ fontSize: '16px', width: '100%' }}
                />}

                {selectedValue == 'linkYoutube' && <TextField
                    onChange={(event) => handleValueChange(event.target.value, setLinkYoutube)}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <RiLink size={22} color='#7750DE' />
                            </InputAdornment>,
                        sx: { borderRadius: 2 }
                    }}
                    placeholder='Link do Youtube'
                    sx={{ fontSize: '16px', width: '100%' }}
                />}

                {selectedValue == 'mp3' &&
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

                {selectedValue == 'documento' &&
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

            {errorMessage && 
                <Typography sx={{ color: '#FF0000', fontWeight: 400, fontSize: 14, marginTop: '10px' }}>
                    {errorMessage}
                </Typography>
            }

            <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px'
                }}>
                    <Button sx={{
                        borderColor: '#5D1EF4',
                        '&:hover': {
                            backgroundColor: '#D8D8D8'
                        },
                        paddingY: '12px',
                        width: '48%',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        color: '#170050'
                    }} variant='outlined' onClick={handleCancel}>Cancelar</Button>

                    <LoadingButton sx={{
                        backgroundColor: '#6730EC',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#4D1EAD'
                        },
                        paddingY: '12px',
                        width: '48%',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontWeight: 700
                    }} 
                    variant='contained'
                    loading={isLoading}
                    onClick={handleClick}>
                        Gerar Questão
                    </LoadingButton>
            </Box>
        </Box>
    )
}