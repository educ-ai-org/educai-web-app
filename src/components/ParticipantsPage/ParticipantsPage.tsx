/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BasicModal from '../Modal/Modal'
import { useContext, useEffect, useState } from 'react'
import useClient from '../../lib/client/useClient'
import Participant from '../Participant/Participant'
import { Participant as ParticipantType } from '../../lib/types/Participant'
import { MenuItem, Skeleton, TextField } from '@mui/material'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

type ParticipantsPageProps = {
    classroomId: string
}

export default function ParticipantsPage(props: ParticipantsPageProps) {
    const { role } = useContext(AuthContext)
    const { classroomId } = props
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [participants, setParticipants] = useState<ParticipantType[]>([])
    const [newParticipantName, setNewParticipantName] = useState('')
    const [newParticipantEmail, setNewParticipantEmail] = useState('')
    const [newParticipantRole, setNewParticipantRole] = useState('STUDENT')
    const [inviteLoading, setInviteLoading] = useState(false)
    const [loading, setLoading] = useState(true)

    const client = useClient()

    const updateParticipants = () => {
        client.getParticipantsById(classroomId).then((res: any) => {
            setParticipants(res)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (classroomId) {
            updateParticipants()
        }
    }, [classroomId])

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

    const handleCleanFields = () => {
        setNewParticipantName('')
        setNewParticipantEmail('')
        setNewParticipantRole('STUDENT')
    }

    const handleAddParticipant = async () => {
        setInviteLoading(true)
        const participant = {
            name: newParticipantName,
            email: newParticipantEmail,
            role: newParticipantRole
        }
        await client.addParticipant(classroomId, participant)
        handleCleanFields()
        setModalIsOpen(false)
        navigate(0)
        setInviteLoading(false)
        sucessToast('Integrante convidado com sucesso!')
    }

    return (
        <>
            {role === 'TEACHER' && <BasicModal
                variantButton='lg' titulo='Convidar Integrante'
                iconeReact={
                    <AssignmentIcon />
                }
                altIcone='Caderno de atividade'
                textoBotaoAbrirModal='Convidar Integrante'
                showModal={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onOpen={() => setModalIsOpen(true)}
            >
                <TextField
                    label='Nome'
                    variant='outlined'
                    fullWidth
                    value={newParticipantName}
                    onChange={(e) => setNewParticipantName(e.target.value)}
                />
                <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    value={newParticipantEmail}
                    onChange={(e) => setNewParticipantEmail(e.target.value)}
                />
                <TextField
                    select
                    label='Tipo'
                    variant='outlined'
                    value={newParticipantRole}
                    onChange={(e) => setNewParticipantRole(e.target.value)}
                    fullWidth
                >
                    <MenuItem value='STUDENT'>Aluno</MenuItem>
                    <MenuItem value='TEACHER'>Professor</MenuItem>
                </TextField>
                <LoadingButton
                    variant='contained'
                    sx={{ width: '100%', marginTop: '10px' }}
                    onClick={handleAddParticipant}
                    loading={inviteLoading}
                    >
                    Convidar
                </LoadingButton>
            </BasicModal>}
            <Box sx={{ width: '100%', flexDirection: 'collumn', alignItems: 'center', justifyContent: 'space-evenly', border: '1px solid #BEBEBE', borderRadius: '10px', padding: '8px', height: '90%' }}>
                <Box sx={{ width: '100%', padding: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src='/iconsPages/teacher.svg' style={{ width: '40px', marginBottom: '5px' }} />
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >Professores</Typography>
                    </Box>
                    <div className='content-none w-[100%] h-[1px] bg-gradient-to-r from-gradientPurple' />
                    <Box sx={{ marginTop: '10px' }}>
                        {participants.map((participant, index) => {
                            if (participant.role === 'TEACHER') {
                                return (
                                    <Participant key={index} name={participant.name} url={participant.profilePicture} id={participant.id} updateParticipants={updateParticipants} classroomId={classroomId} />
                                )
                            }
                        })}
                        {loading && (
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Skeleton variant='circular' width={40} height={40} />
                                <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='20%' />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box sx={{ width: '100%', padding: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src='/iconsPages/student.svg' style={{ width: '40px', marginBottom: '5px' }} />
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >Alunos</Typography>
                    </Box>
                    <div className='content-none w-[100%] h-[1px] bg-gradient-to-r from-gradientPurple' />
                    <Box sx={{ marginTop: '10px' }}>
                        {participants.map((participant, index) => {
                            if (participant.role === 'STUDENT') {
                                return (
                                    <Participant key={index} name={participant.name} url={participant.profilePicture} id={participant.id} updateParticipants={updateParticipants} classroomId={classroomId} />
                                )
                            }
                        })}
                        {loading && Array.from({ length: 5 }).map((_, index) => (
                            <Box sx={{ display: 'flex', gap: '10px', marginTop: '8px' }} key={index}>
                                <Skeleton variant='circular' width={40} height={40} />
                                <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='20%' />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
