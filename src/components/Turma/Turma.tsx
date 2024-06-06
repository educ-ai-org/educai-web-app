/* eslint-disable react-hooks/exhaustive-deps */
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Menu from '@mui/material/Menu/Menu'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import Typography from '@mui/material/Typography/Typography'
import { useContext, useEffect, useState } from 'react'
import { TurmaType } from '../../lib/types/Turma'
import Modal from '../Modal/Modal'
import { Button, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useClient from '../../lib/client/useClient'
import { AuthContext } from '../../contexts/AuthContext'
import { TbEdit } from 'react-icons/tb'
import { FiTrash2 } from 'react-icons/fi'

interface TurmaProps extends TurmaType {
    isTeacher: boolean
    onClick: () => void
    updateClassrooms: () => void
}

export default function Turma(props: TurmaProps) {
    const client = useClient()
    const { role } = useContext(AuthContext)
    const { title, course, nextSubmission, studentsCount, isTeacher, id, onClick, updateClassrooms } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [modal, setModal] = useState<{ isLoading: boolean, isOpen: boolean, type: 'EDIT' | 'DELETE' | null }>({
        isLoading: false,
        isOpen: false,
        type: null
    })
    const [name, setName] = useState(title)
    const [subject, setSubject] = useState(course)
    const regex = /[^a-zA-Z0-9\s]/g

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    useEffect(() => {
        if(modal.isOpen) {
            setName(title)
            setSubject(course)
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

    const deleteClassroom = () => {
        setModal({...modal, isLoading: true})
        client.deleteClassroom(id).finally(() => {
            setModal({
                isLoading: false,
                type: null,
                isOpen: false
            })
            updateClassrooms()
        })
    }

    const updateClassroomData = () => {
        setModal({...modal, isLoading: true})

        const body = {} as {title?: string, course?: string}

        if(name.trim())
            body.title = name

        if(subject.trim())
            body.course = subject

        client.updateClassroom(id, body).finally(() => {
            setModal({
                isLoading: false,
                type: null,
                isOpen: false
            })
            updateClassrooms()
        })
    }

    return (
        <Box>
            <Box sx={{
                cursor: 'pointer',
                width: '16vw',
                height: '14vh',
                border: '1px solid #BEBEBE',
                borderRadius: '10px',
                boxShadow: '0px 2px 3px 1px #00000012',
                userSelect: 'none'
            }} onClick={onClick}>
                <Box sx={{
                    width: '100%',
                    height: '35%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: '16px',
                    paddingRight: '6px',
                    borderBottom: '1px solid #BEBEBE',
                    borderColor: '#BEBEBE'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%',
                    width: '100%', alignItems: 'center', gap: '10px' }}>
                        <img src='/logos/bookTwo.svg' alt='Ícone de livro' style={{ width: '26px', marginBottom: '3px' }} />
                        <Typography sx={{ fontSize: '16px', whiteSpace: 'nowrap',
                        fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
                    </Box>
                    {role === 'TEACHER' &&
                        <IconButton sx={{ justifyContent: 'end' }} size='small' onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    <Menu
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

                <Box sx={{ width: '100%', height: '65%', padding: '8px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                        <Typography sx={{ display: 'flex', fontSize: 14, color: '#5E5E5E' }}>Disciplina: </Typography>
                        <Typography sx={{ color: '#5E5E5E', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis' }}>{course}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '4px' }}>
                        <Typography sx={{ display: 'flex', fontSize: 14, color: '#5E5E5E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isTeacher ? 'Quantidade de alunos:' : 'Próxima entrega: ' }
                        </Typography>

                        <Typography sx={{ color: '#5E5E5E', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isTeacher ? studentsCount : nextSubmission}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box>
                <Modal
                    titulo={modal.type === 'DELETE' ? 'Deletar turma' : 'Editar turma'}
                    altIcone={modal.type === 'DELETE' ? 'Deletar turma' : 'Editar turma'}
                    variantButton='none'
                    iconeReact={
                        <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                          {modal.type === 'DELETE' ? <FiTrash2 color='#341069' size={22} /> : <TbEdit color='#341069' size={22} />}
                        </Box>
                    }
                    showModal={modal.isOpen}
                    onClose={() => setModal({...modal, isOpen: false})}
                    onOpen={() => setModal({...modal, isOpen: true})}
                >
                    <Typography sx={{ fontSize: 16, color: '#5E5E5E' }}>
                        {
                            modal.type === 'DELETE'
                            ? <>Tem certeza que deseja deletar a turma <strong>{title}?</strong></>
                            : 'Preencha os campos abaixo com as informações atualizadas'
                        }
                    </Typography>

                    {
                        modal.type === 'EDIT' &&
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <TextField
                                variant='outlined'
                                label='Nome'
                                onChange={(e) => {
                                    const rawValue = e.target.value
                                    const cleanValue = rawValue.replace(regex, '')
                                    setName(cleanValue)
                                }}
                                value={name}
                            />
                            <TextField
                                variant='outlined'
                                label='Matéria'
                                onChange={(e) => {
                                    const rawValue = e.target.value
                                    const cleanValue = rawValue.replace(regex, '')
                                    setSubject(cleanValue)
                                }
                                }
                                value={subject}
                            />
                        </Box>
                    }

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        }} variant='outlined' onClick={() => setModal({...modal, isOpen: false})}>{modal.type === 'DELETE' ? 'Não' : 'Cancelar'}</Button>

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
                        }} variant='contained' onClick={modal.type === 'DELETE' ? deleteClassroom : updateClassroomData}
                        loading={modal.isLoading}>{modal.type === 'DELETE' ? 'Sim' : 'Atualizar'}</LoadingButton>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}
