import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu/Menu'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import { PostType } from '../../lib/types/Post'
import useClient from '../../lib/client/useClient'
import Modal from '../Modal/Modal'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button/Button'

interface PostProps extends PostType {
    updatePost: () => void
}

export default function Post(post: PostProps) {
    const client = useClient()
    const { id, title, description, datePosting, file, originalFileName, updatePost } = post
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const [name, setName] = useState(title)
    const [text, setText] = useState(description)
    const [fileUrl, setFile] = useState(file)
    const [url, setUrl] = useState('')
    
    const [modal, setModal] = useState<{ isLoading: boolean, isOpen: boolean, type: 'EDIT' | 'DELETE' | null }>({
        isLoading: false,
        isOpen: false,
        type: null
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    useEffect(() => {
        if (modal.isOpen) {
            setName(title)
            setText(description)
            setFile(fileUrl)
        }
    }, [modal.isOpen])

    const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, editOrDelete: string) => {
        event.stopPropagation()
        setAnchorEl(null)

        if (editOrDelete === 'edit') {
            setModal({
                ...modal,
                isOpen: true,
                type: 'EDIT'
            })
        } else if (editOrDelete === 'delete') {
            setModal({
                ...modal,
                isOpen: true,
                type: 'DELETE'
            })
        }
    }

    const deletePost = () => {
        setModal({ ...modal, isLoading: true })
        client.deletePost(id).finally(() => {
            setModal({
                isLoading: false,
                type: null,
                isOpen: false
            })
            updatePost()
        })
    }

    useEffect(() => {
        if (file) {
            client.getUrlArquivoPost(id).then((data) => setUrl(data))
        }
    }, [id, file])

    const updatePostData = () => {
        setModal({ ...modal, isLoading: true })

        const body = {} as { title?: string, description?: string }

        if (name.trim())
            body.title = name

        if (text.trim())
            body.description = text

        client.updatePost(id, body).finally(() => {
            setModal({
                isLoading: false,
                type: null,
                isOpen: false
            })
            updatePost()
        })
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    return (
        <Box sx={{ width: '100%', height: '18vh', border: '2px solid #BEBEBE', borderRadius: '10px' }}>
            <Box sx={{
                width: '100%',
                height: '35%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '8px',
                borderBottom: '2px solid #BEBEBE',
                borderColor: '#BEBEBE'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '60%', alignItems: 'center', gap: '10px' }}>
                    <img src='/logos/bookTwo.svg' alt='Ícone de livro' style={{ width: '26px', marginBottom: '5px' }} />
                    <Typography sx={{ fontSize: '16px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>{title}</Typography>
                </Box>
                <IconButton size='small' onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={(event) => { handleClose(event, 'edit') }}>
                        Editar
                    </MenuItem>
                    <MenuItem onClick={(event) => { handleClose(event, 'delete') }}>
                        Apagar
                    </MenuItem>
                </Menu>
            </Box>
            <Box sx={{ width: '100%', height: '65%', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
                <Typography sx={{ fontSize: '12px' }}>Data de publicação: <b>{formatDate(datePosting)}</b></Typography>
                {description && <Typography sx={{ fontSize: '14px' }}>{description}</Typography>}
                {url && <a href={url} target='_blank' rel='noopener noreferrer'><Typography sx={{
                    fontSize: '14px',
                    color: 'blue',
                    textDecoration: 'underline'

                }}>{originalFileName}</Typography></a>}
            </Box>

            <Box>
                <Modal
                    titulo={modal.type === 'DELETE' ? 'Deletar post' : 'Editar post'}
                    altIcone={modal.type === 'DELETE' ? 'Deletar post' : 'Editar post'}
                    variantButton='none'
                    icone={modal.type === 'DELETE' ? '/iconsPages/iconExcluir.svg' : '/iconsPages/iconEditar.svg'}
                    showModal={modal.isOpen}
                    onClose={() => setModal({ ...modal, isOpen: false })}
                    onOpen={() => setModal({ ...modal, isOpen: true })}>

                    <Typography sx={{ fontSize: 16, color: '#5E5E5E' }}>
                        {
                            modal.type === 'DELETE'
                                ? <>Tem certeza que deseja deletar o post <strong>{title}?</strong></>
                                : 'Preenche os campos abaixo com as informações atualizadas'
                        }
                    </Typography>

                    {
                        modal.type === 'EDIT' &&
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <TextField
                                variant='outlined'
                                label='Título'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <TextField
                                variant='outlined'
                                label='Descrição'
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                        </Box>
                    }

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button sx={{
                            color: 'black',
                            borderColor: '#5D1EF4',
                            '&:hover': {
                                backgroundColor: '#D8D8D8'
                            },
                            paddingY: '12px',
                            width: '48%'
                        }} variant='outlined' onClick={() => setModal({ ...modal, isOpen: false })}>{modal.type === 'DELETE' ? 'Não' : 'Cancelar'}</Button>

                        <LoadingButton sx={{
                            backgroundColor: '#6730EC',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#4D1EAD'
                            },
                            paddingY: '12px',
                            width: '48%'
                        }} variant='contained' onClick={modal.type === 'DELETE' ? deletePost : updatePostData}
                            loading={modal.isLoading}>{modal.type === 'DELETE' ? 'Sim' : 'Atualizar'}</LoadingButton>
                    </Box>
                </Modal>
            </Box>

        </Box>
    )
}
