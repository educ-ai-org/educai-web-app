import Box from '@mui/material/Box/Box'
import PageHeader from '../components/PageHeader/PageHeader'
import Layout from './Layout'
import Turma from '../components/Turma/Turma'
import { useNavigate } from 'react-router-dom'

export default function Turmas() {
  const turmasArray = Array.from({ length: 10 })
  const navigate = useNavigate()

  const handleClick = (index: number) => {
    // const id = turmasArray[index].id quando tiver conectado
    navigate(`/turma/${index}`)
  }

  return (
    <Layout>
      <Box sx={{ width: '100%' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader title='Turmas' />
        </Box>
        <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px', backgroundColor: 'red',
          flexBasis: '100%', flexShrink: 0, flexGrow: 1, flexWrap: 'wrap', gap: '5px'
         }}>
          {turmasArray.map((_, index) => (
            <Turma key={index} nome='Turma 1' disciplina='Matemática' qtdAlunos={20} onClick={() => handleClick(index)}/>
          ))}
        </Box>
      </Box>
    </Layout>
  )
}
