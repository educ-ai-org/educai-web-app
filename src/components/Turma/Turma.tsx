import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton/IconButton'

type TurmaProps = {
    nome: string
    disciplina: string
    qtdAlunos: number
}

export default function Turma(props: TurmaProps) {
    const { nome, disciplina, qtdAlunos } = props

    const handleClick = () => {
        console.log('clicou')
    }

    return (
        <Box sx={{ width: '15vw', height: '14vh', border: '2px solid #BEBEBE', borderRadius: '10px' }}>
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
                    <img src='./logos/bookTwo.svg' style={{ width: '26px', marginBottom: '5px' }} />
                    <Typography sx={{ fontSize: '16px', whiteSpace: 'nowrap' }}>{nome}</Typography>
                </Box>
                <IconButton size='small' onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Box sx={{ width: '100%', height: '65%', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography>Disciplina: {disciplina}</Typography>
                <Typography>Quantidade de alunos: {qtdAlunos}</Typography>
            </Box>
        </Box>
    )
}