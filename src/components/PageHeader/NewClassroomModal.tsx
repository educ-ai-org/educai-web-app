import { LoadingButton } from '@mui/lab'
import { Box, TextField, Button } from '@mui/material'
import Modal from '../Modal/Modal'
import { TbSchool } from 'react-icons/tb'
import { useState } from 'react'

type NewClassroomModalProps = {
    createClass: () => void
    setModalIsOpen: (value: boolean) => void
    modalIsOpen: boolean
    modalIsLoading: boolean
    setModalIsLoading: (value: boolean) => void
    setSubject: (value: string) => void
    subject: string
    setName: (value: string) => void
    name: string
}

export default function NewClassroomModal(props: NewClassroomModalProps) {
    const { createClass, setModalIsOpen, modalIsOpen, modalIsLoading, setSubject, setName, subject, name } = props
    const [nameError, setNameError] = useState(false)
    const [subjectError, setSubjectError] = useState(false)

    const handleCreateClass = () => {

        if (!name && !subject) {
            setNameError(true)
            setSubjectError(true)
            return
        }

        if (!name) {
            setNameError(true)
            return
        }

        if (!subject) {
            setSubjectError(true)
            return
        }

        createClass()
    }

    const onClose = () => {
        setName('')
        setSubject('')
        setNameError(false)
        setSubjectError(false)
        setModalIsOpen(false)
    }

    return (
        <Modal
            titulo='Nova Turma'
            textoBotaoAbrirModal='Nova Turma'
            altIcone='Nova Turma'
            variantButton='novaTurma'
            iconeReact={
                <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                    <TbSchool color='#341069' size={30} />
                </Box>
            }
            showModal={modalIsOpen}
            onClose={onClose}
            onOpen={() => setModalIsOpen(true)}
        >
            <TextField
                required
                error={nameError}
                variant='outlined'
                label='Nome'
                onChange={(e) => setName(e.target.value)}
                helperText={nameError ? 'Campo obrigatório' : ''}
            />
            <TextField
                required
                error={subjectError}
                variant='outlined'
                label='Matéria'
                onChange={(e) => setSubject(e.target.value)}
                helperText={subjectError ? 'Campo obrigatório' : ''}
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
                }} variant='outlined' onClick={onClose}>
                    Cancelar
                </Button>

                <LoadingButton
                    sx={{
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
                    onClick={handleCreateClass}
                    loading={modalIsLoading}>
                    Criar turma
                </LoadingButton>
            </Box>
        </Modal>
    )
}