/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField/TextField'
import Modal from '../Modal/Modal'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import Post from '../Post/Post'
import { LoadingButton } from '@mui/lab'
import { useState, useEffect } from 'react'
import { PostType } from '../../lib/types/Post'
import useClient from '../../lib/client/useClient'
import Typography from '@mui/material/Typography/Typography'
import { ChangeEvent } from 'react'
import FileInput from '../FileInput/FileInput'
import { LuFile } from 'react-icons/lu'
import { TbSchool } from 'react-icons/tb'

type postsPageProps = {
    classroomId: string
    posts?: any
}

export default function PostsPage(props: postsPageProps) {
    const { classroomId } = props

    const client = useClient()
    const [posts, setPosts] = useState<PostType[]>([])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [datePosting, setDatePosting] = useState('')

    const [modal, _setModal] = useState<{ isLoading: boolean, isOpen: boolean, type: 'EDIT' | 'DELETE' | null }>({
        isLoading: false,
        isOpen: false,
        type: null
    })

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsLoading, setModalIsLoading] = useState(false)

    useEffect(() => {
        setDatePosting(new Date().toISOString())
    }, [])

    // Atualizar os campos do modal
    useEffect(() => {
        if (modal.isOpen) {
            setTitle(title)
            setDescription(description)
        }
    }, [modal.isOpen])

    // Carregar os posts
    useEffect(() => {
        if (classroomId) {
            updatePosts()
        }
    }, [classroomId])

    // Função de atualizar os posts
    const updatePosts = () => {
        if (classroomId) {
            client.getPostsByClassroom(classroomId).then((data) => setPosts(data || []))
        }
    }

    // Função de criar um post
    const createPost = async (title: string, description: string, datePosting: string, file: File): Promise<void> => {
        const formattedDatePosting = datePosting.split('T')[0]
        const { post, url } = await client.createPost({ title, description, datePosting: formattedDatePosting, classroomId }, file)
        setPosts((prevPosts) => [{ ...post, file: url }, ...prevPosts])
    }

    const createAPost = () => {
        if (title && description && file) {
            setModalIsLoading(true)
            createPost(title, description, datePosting, file).finally(() => {
                setModalIsLoading(false)
                setModalIsOpen(false)
                updatePosts()
                setFile(null)
            })
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    return (
        <>
            <Modal
                variantButton='lg' titulo='Novo Post'
                iconeReact={
                    <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                        <TbSchool color='#341069' size={30} />
                    </Box>
                }
                altIcone='Pessoas agrupadas'
                textoBotaoAbrirModal='Novo Post'
                showModal={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false)
                    setFile(null)
                }}
                onOpen={() => setModalIsOpen(true)}
            >
                <TextField
                    id='outlined-basic'
                    variant='outlined'
                    label='Título*'
                    onChange={(e) => setTitle(e.target.value)} />

                <TextField id='outlined-basic'
                    variant='outlined'
                    label='Descrição*'
                    onChange={(e) => setDescription(e.target.value)}
                />

                <FileInput id='document' onChange={handleFileChange} value={file} description='Carregar um documento' icon={<LuFile size={22} color='#7750DE' />}></FileInput>

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
                    }} variant='outlined' onClick={() => {
                        setModalIsOpen(false)
                        setFile(null)
                    }
                    }>Cancelar</Button>

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
                    }} variant='contained' onClick={createAPost} loading={modalIsLoading}>Criar Post</LoadingButton>
                </Box>
            </Modal>

            <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column', overflow: 'auto' }}>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Post key={index} id={post.id} datePosting={post.datePosting} title={post.title} description={post.description} file={post.file} updatePost={updatePosts} originalFileName={post.originalFileName} />
                    ))
                ) : (
                    <Typography variant="h6" align="center">Nenhum post...</Typography>
                )}
            </Box>
        </>
    )
}
