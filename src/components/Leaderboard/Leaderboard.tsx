import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'

export default function Leaderboard() {
    return (
        <Box sx={{ backgroundColor: 'red', display: 'flex', width: '20vw', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    icon
                    <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>Leaderboard</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px' }}>Alunos que mais acertaram questões</Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ fontSize: '12px' }}>#</Typography>
                    <Typography sx={{ fontSize: '12px' }}>Nome</Typography>
                    <Typography sx={{ fontSize: '12px' }}>Questões</Typography>
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}