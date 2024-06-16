/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField/TextField'
import Modal from '../Modal/Modal'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import Post from '../Post/Post'
import { LoadingButton, Skeleton } from '@mui/lab'
import { useState, useEffect, useContext } from 'react'
import { PostType } from '../../lib/types/Post'
import useClient from '../../lib/client/useClient'
import Typography from '@mui/material/Typography/Typography'
import { ChangeEvent } from 'react'
import FileInput from '../FileInput/FileInput'
import { LuFile } from 'react-icons/lu'
import { TbSchool } from 'react-icons/tb'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type postsPageProps = {
    classroomId: string
}

export default function PostsPage(props: postsPageProps) {
    const { classroomId } = props
    const { role } = useContext(AuthContext)

    const client = useClient()
    const [posts, setPosts] = useState<PostType[]>([])

    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [file, setFile] = useState<File | null>(null)
    const [datePosting, setDatePosting] = useState('')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsLoading, setModalIsLoading] = useState(false)
    const [postsLoading, setPostsLoading] = useState(true)

    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [fileError, setFileError] = useState(false)

    const sucessToast = (message: string) => {
        toast.success(message, {
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

    useEffect(() => {
        setDatePosting(new Date().toISOString())
    }, [])

    useEffect(() => {
        if (classroomId) {
            updatePosts()
        }
    }, [classroomId])

    const updatePosts = () => {
        if (classroomId) {
            client.getPostsByClassroom(classroomId).then((data) => {
                setPosts(data)
                setPostsLoading(false)
            })
        }
    }

    const createPost = async (title: string, description: string, datePosting: string, file: File): Promise<void> => {
        const formattedDatePosting = datePosting.split('T')[0]
        const post = await client.createPost({ title, description, datePosting: formattedDatePosting, classroomId }, file)
        setPosts((prevPosts) => [{ ...post }, ...prevPosts])
    }

    const createAPost = () => {

        if (!title && !description && !file) {
            setTitleError(true)
            setDescriptionError(true)
            setFileError(true)
            return
        }

        if (!title) {
            setTitleError(true)
            return
        }

        if (!description) {
            setDescriptionError(true)
            return
        }

        if (!file) {
            setFileError(true)
            return
        }

        if (title && description && file) {
            setModalIsLoading(true)
            createPost(title, description, datePosting, file).finally(() => {
                setModalIsLoading(false)
                setModalIsOpen(false)
                sucessToast('Post criado com sucesso!')
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

    useEffect(() => {
        if (title) setTitleError(false)
        if (description) setDescriptionError(false)
        if (file) setFileError(false)
    }, [title, description, file])

    const cleanFields = () => {
        setTitle('')
        setDescription('')
        setFile(null)
        setModalIsOpen(false)
        setTitleError(false)
        setDescriptionError(false)
        setFileError(false)
    }

    return (
        <>
            {role == 'TEACHER' && <Modal
                variantButton='lg' titulo='Novo Post'
                iconeReact={
                    <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                        <TbSchool color='#341069' size={30} />
                    </Box>
                }
                altIcone='Pessoas agrupadas'
                textoBotaoAbrirModal='Novo Post'
                showModal={modalIsOpen}
                onClose={cleanFields}
                onOpen={() => setModalIsOpen(true)}
            >
                <TextField
                    error={titleError}
                    required
                    variant='outlined'
                    label='Título'
                    onChange={(e) => setTitle(e.target.value)} />

                <TextField
                    error={descriptionError}
                    required
                    variant='outlined'
                    label='Descrição'
                    onChange={(e) => setDescription(e.target.value)}
                />

                <FileInput
                    id='document'
                    onChange={handleFileChange}
                    value={file}
                    description='Carregar um documento *' // em breve deixara de ser obrigatorio
                    icon={<LuFile size={22} color='#7750DE' />}
                    error={fileError}
                />

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
                    }} variant='outlined' onClick={cleanFields}>
                        Cancelar
                    </Button>

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
            </Modal>}

            <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column', overflow: 'auto' }}>
                {Array.isArray(posts) && (
                    posts.map((post, index) => (
                        <Post key={index} id={post.id} datePosting={post.datePosting} title={post.title} description={post.description} file={post.file} updatePost={updatePosts} originalFileName={post.originalFileName} />
                    ))
                )}
                {posts.length === 0 && !postsLoading && (
                    <Typography variant='h6' align='center' sx={{ fontSize: '16px' }}>
                        Poxa! Nenhum post publicado ainda.. 😕
                    </Typography>
                )}
                {postsLoading && (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton variant='rounded' width='100%' height={180} key={index} />
                    ))
                )}
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
        </>
    )
}
