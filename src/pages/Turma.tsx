import PageHeader from '../components/PageHeader/PageHeader'
import Layout from './Layout'
import Box from '@mui/material/Box/Box'
import Post from '../components/Post/Post'
import Modal from '../components/Modal/Modal'
import TextField from '@mui/material/TextField/TextField'

export default function Turma() {
  const postProps = {
    dtPublicacao: new Date(),
    title: 'Título do post'
  }
  return (
    <Layout>
      <Box sx={{ width: '100%' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader title='Turma 01' />
        </Box>
        <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px' }}>
          <Box sx={{
            width: '50%',
            height: '100%',
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px'
            }}>

            <Modal variantButton='lg' titulo='Novo Post' icone='../../public/IconsPages/turma.svg' altIcone='Pessoas agrupadas' textoBotaoAbrirModal='Novo Post' textoBotaoConfirmar='Postar'>
              <TextField id='outlined-basic' variant='outlined' label='Título*'/>
              <TextField id='outlined-basic' variant='outlined' label='Descrição*'/>
              <TextField id='outlined-basic' variant='outlined' label='Upload de arquivo'/>
            </Modal>

            <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <Post dtPublicacao={postProps.dtPublicacao} title={postProps.title}/>
              <Post dtPublicacao={postProps.dtPublicacao} title={postProps.title}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
