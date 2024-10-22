/* eslint-disable react-hooks/exhaustive-deps */
import IconButton from '@mui/material/IconButton'
import BookIcon from '@mui/icons-material/Book'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { alpha } from '@mui/material/styles'
import { Box, TextField, Tooltip, Typography } from '@mui/material'
import useClient from '../lib/client/useClient'
import { DictonaryResponse } from '../lib/types/DictonaryResponse'
import VolumeUpIcon from '@mui/icons-material/VolumeUpRounded'
import { Stack } from '../lib/stack'
import Divider from '@mui/material/Divider'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'

const stack = new Stack<string>()

export default function Dictionary() {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [resultData, setResultData] = useState<DictonaryResponse | null>(null)
    const client = useClient()
    const [history, setHistory] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

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
        setTimeout(() => {
            setSearch('')
            setResultData(null)
            stack.clear()
            setHistory([])
        }, 180)
    }

    const handleSearch = async (word: string) => {
        setLoading(true)
        if (word !== search) {
            setSearch(word)
        }
        const data = await client.getWordDefinition(search)
        setResultData(data)
        if (search && !stack.storage.includes(search)) {
            stack.push(search)
            setHistory([...stack.storage])
        }
        setLoading(false)
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
                    margin: 3,
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
                PaperProps={{
                    sx: {
                        borderRadius: '20px'
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <img src='/iconsPages/iconDictionary.svg' alt={t('dictionary.title')}
                    style={{
                        marginRight: '14px',
                    }} />
                    <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }}>{t('dictionary.title')}</Typography>
                    </Box>
                    <Divider sx={{
                        width: '100%',
                        border: 0,
                        height: '2px',
                        background: 'linear-gradient(to right, #E0D5F4 0%, #A578F9 50%, #DBCFF2 100%)',
                    }} />
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '6px' }}>
                        <TextField label={t('dictionary.search.label')} variant='outlined' fullWidth value={search} onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            sx: {
                                borderRadius: '10px'
                            }
                        }} />
                        <LoadingButton
                            sx={{ marginLeft: 1, height: '100%', padding: '16px', paddingX: '40px', borderRadius: '10px', fontWeight: 'bold'}}
                            variant='contained'
                            loading={loading}
                            color='primary'
                            onClick={() => handleSearch(search)}
                        >{t('dictionary.search.button')}</LoadingButton>
                    </Box>
                    <Box sx={{ marginTop: '16px' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{t('dictionary.searchHistory.title')}</Typography>
                        {history.length === 0 ? (
                            <Typography sx={{ fontStyle: 'italic' }}>{t('dictionary.searchHistory.noHistory')}</Typography>
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
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{resultData.word}</Typography>
                                {resultData.audio && (
                                    <Tooltip title={t('dictionary.tooltip.audio')} placement='right'>
                                        <IconButton size='small' sx={{ marginTop: '4px' }} onClick={() => listenAudio(resultData.audio)}>
                                            <VolumeUpIcon sx={{ color: '#4921a5' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                            {resultData.meanings.map((meaning, index) => (
                                <div key={index}>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{t('dictionary.result.partOfSpeech')}: {meaning.partOfSpeech}</Typography>
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
