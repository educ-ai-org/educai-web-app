import DrawerItem from './components/DrawerItem'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box/Box'

export default function SideDrawer() {
  const home = '../../public/IconSideBar/home_icon.svg'
  const turma = '../../public/IconSideBar/turma_icon.svg'
  const material = '../../public/IconSideBar/material.svg'
  const chat = '../../public/IconSideBar/chat.svg'
  const logout = '../../public/IconSideBar/logout.svg'

  return (
    <Box
      sx={{
        borderRight: '1px solid #e0e0e0',
        width: '18%',
      }}>
      <List sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '80px'
          }}
        >
          <DrawerItem name='Home' icon={home} path='/' variant='unselected' />
          <DrawerItem name='Turma' icon={turma} path='/turma' variant='turma-selected' />
          <DrawerItem name='Criar Material' icon={material} path='/educacao' variant='unselected' color='#6730EC' />
          <DrawerItem name='Fale com o edu' icon={chat} path='/avaliacao' variant='unselected' color='#6730EC' />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '80px'
          }}
        >
          <DrawerItem name='Sair' icon={logout} path='/avaliacao' variant='unselected' color='red' />
        </Box>
      </List>
    </Box>
  )
}
