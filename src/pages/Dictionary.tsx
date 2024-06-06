import IconButton from '@mui/material/IconButton'
import BookIcon from '@mui/icons-material/Book'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha } from '@mui/material/styles'
import { Box, TextField, Tooltip, Typography } from '@mui/material'
import useClient from '../lib/client/useClient'
import { DictonaryResponse } from '../lib/types/DictonaryResponse'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Stack } from '../lib/stack'

const stack = new Stack<string>()

export default function Dictionary() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [resultData, setResultData] = useState<DictonaryResponse | null>(null)
    const client = useClient()
    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        setHistory([...stack.storage])
    }, [])

    useEffect(() => {
        setHistory([...stack.storage])
    }, [stack.storage.length])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSearch('')
        setResultData(null)
        stack.clear()
        setHistory([])
    }

    const handleSearch = async (word: string) => {
        if (word !== search) {
            setSearch(word)
        }
        const data = await client.getWordDefinition(search)
        setResultData(data)
        if (search && !stack.storage.includes(search)) {
            stack.push(search)
            setHistory([...stack.storage])
        }
    }

    const listenAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl)
        audio.play()
    }

    return (
        <>
            <IconButton size='small' onClick={handleOpen}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 1,
                    width: 50,
                    height: 50,
                    backgroundColor: '#A681FF',
                    '&:hover': {
                        backgroundColor: alpha('#A681FF', 0.85)
                    },
                    zIndex: 1000
                }}
            >
                <BookIcon sx={{ color: 'black' }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ padding: '32px' }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <BookIcon sx={{ color: 'black' }} />
                    Dicionário
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '8px' }}>
                        <TextField label='Pesquisar' variant='outlined' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button
                            sx={{ marginLeft: 1, height: '100%', padding: '16px', paddingX: '24px' }}
                            variant='contained'
                            color='primary'
                            onClick={() => handleSearch(search)}
                        >Buscar</Button>
                    </Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Histórico de Pesquisa</Typography>
                        {history.length === 0 ? (
                            <Typography sx={{ fontStyle: 'italic' }}>Nenhuma pesquisa realizada</Typography>
                        ) : (
                            history.map((word, index) => (
                                <Typography key={index} sx={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    color: 'blue'
                                }}
                                    onClick={() => handleSearch(word)}
                                >{index + 1} - {word}</Typography>
                            ))
                        )}
                    </Box>
                    {resultData && (
                        <Box sx={{ marginTop: '16px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'center' }}>
                                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Significados</Typography>
                                {resultData.audio && (
                                    <Tooltip title='Ouvir pronúncia' placement='right'>
                                        <IconButton size='small' sx={{ marginTop: '4px' }} onClick={() => listenAudio(resultData.audio)}>
                                            <VolumeUpIcon sx={{ color: 'black' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                            {resultData.meanings.map((meaning, index) => (
                                <div key={index}>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{meaning.partOfSpeech}</Typography>
                                    {meaning.definitions.map((definition, idx) => (
                                        <Typography key={idx}> - {definition}</Typography>
                                    ))}
                                </div>
                            ))}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
