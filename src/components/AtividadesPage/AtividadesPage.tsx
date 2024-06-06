import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import Atividade from '../Atividade/Atividade'
import { useState } from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography/Typography'
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { TbSchool } from 'react-icons/tb'
import { BsStars } from 'react-icons/bs'
import { FaBook } from 'react-icons/fa'

type AtividadePageProps = {
    atividades: {
        id: number
        title: string
        deadline: Date
        asignmentDate: Date
        description: string
        exercises: number
        answered: number
    }[]
    onSelectAtividade: (atividade: any) => void
    classRoomId: string
}

export default function AtividadesPage(props: AtividadePageProps) {
    const { atividades, onSelectAtividade, classRoomId } = props
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleManualCreate = () => {
        setModalIsOpen(false)
        navigate(`/turma/${classRoomId}?tab=criar-atividade`)
    }

    const handleIACreate = () => {
        setModalIsOpen(false)
        navigate(`/turma/${classRoomId}?tab=criar-atividade-ia`)
    }

    return (
        <>
            <Modal
                variantButton='lg' 
                titulo='Nova atividade'
                iconeReact={
                    <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
                        <TbSchool color='#341069' size={30} />
                    </Box>      
                }
                altIcone='Caderno de atividade'
                textoBotaoAbrirModal='Nova Atividade'
                showModal={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onOpen={() => setModalIsOpen(true)}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}>
                    <Button sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        backgroundColor: '#6730EC',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#4D1EAD'
                        },
                        paddingY: '12px',
                        width: '90%',
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 700
                    }}
                    startIcon={<FaBook color='#FFF' size={18}/>} 
                    variant='contained'
                    onClick={handleManualCreate}>Montar Questionário Manual</Button>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        <Divider sx={{width: '40%'}}/>
                        <Typography sx={{fontSize: '12px'}}>ou</Typography>
                        <Divider sx={{width: '40%'}} />
                    </Box>

                    <Button sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        color: 'black',
                        borderColor: '#5D1EF4',
                        '&:hover': {
                            backgroundColor: '#D8D8D8'
                        },
                        paddingY: '12px',
                        width: '90%',
                        textTransform: 'none',
                        borderRadius: '10px',
                        fontWeight: 700
                    }} variant='outlined'
                    startIcon={<BsStars color='#6730EC' size={22}/>}
                    onClick={handleIACreate}>Gerar Questionário por IA</Button>
                </Box>
            </Modal>

            <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                {atividades.map((atividade, index) => (
                    <Box key={index} onClick={() => onSelectAtividade(atividade)}>
                        <Atividade
                            title={atividade.title}
                            deadline={atividade.deadline}
                            asignmentDate={atividade.asignmentDate}
                            description={atividade.description}
                            exercises={atividade.exercises}
                            answered={atividade.answered}
                        />
                    </Box>
                ))}
            </Box>
        </>
    )
}
