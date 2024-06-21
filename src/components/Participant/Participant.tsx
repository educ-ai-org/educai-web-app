import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '../Modal/Modal'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import useClient from '../../lib/client/useClient'

type ParticipantProps = {
    id: string
    name: string
    url: string
    updateParticipants: () => void
}

export default function Participant(props: ParticipantProps) {
    const { name, url, id, updateParticipants } = props
    const client = useClient()
    const picture = url === null ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : url
    const [modal, setModal] = useState<{ isLoading: boolean, isOpen: boolean }>({
        isLoading: false,
        isOpen: false,
    })

    const deleteUser = () => {
        setModal({ ...modal, isLoading: true })
        client.deleteUser(id).finally(() => {
            setModal({
                isLoading: false,
                isOpen: false
            })
            updateParticipants()
        })
    }

    const handleClose = () => {
        setModal({
            ...modal,
            isOpen: true
        })
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '8px',
                paddingRight: '8px',
                width: '95%',
                ':hover': {
                    backgroundColor: '#f5f5f5',
                    '.closeIcon': {
                        display: 'block'
                    }
                }
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px', gap: '5px' }}>
                    <img src={picture} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} />
                    <Typography sx={{ fontSize: '18px', color: '#262626' }}>{name}</Typography>
                </Box>
                <CloseIcon sx={{ color: '#262626', cursor: 'pointer', ':hover': { color: 'red' }, display: 'none' }} className='closeIcon' onClick={handleClose} />
            </Box>
            <Box>
                <Modal
                    titulo='Remover Usuário'
                    altIcone='Remover Usuário'
                    variantButton='none'
                    iconeReact={
                        <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                            <FiTrash2 color='#341069' size={22} />
                        </Box>
                    }
                    showModal={modal.isOpen}
                    onClose={() => setModal({ ...modal, isOpen: false })}
                    onOpen={() => setModal({ ...modal, isOpen: true })}
                >
                    <Typography sx={{ fontSize: 16, color: '#5E5E5E' }}>
                        Tem certeza que deseja remover esse usuário <strong>{name}?</strong>
                    </Typography>

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
                        }} variant='outlined' onClick={() => setModal({ ...modal, isOpen: false })}>Não</Button>

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
                        }} variant='contained' onClick={deleteUser}
                            loading={modal.isLoading}>Sim</LoadingButton>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}
