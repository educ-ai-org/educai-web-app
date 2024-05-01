import Box from '@mui/material/Box/Box'
import Divider from '@mui/material/Divider/Divider'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography/Typography'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs/Tabs'
import TextField from '@mui/material/TextField/TextField'
import Modal from '../Modal/Modal'

type PageHeaderProps = {
  title: string
}

type Tab = 'posts' | 'atividades' | 'pessoas'

export default function PageHeader(PageHeaderProps: PageHeaderProps) {
  const { title } = PageHeaderProps

  const actualTab = new URLSearchParams(window.location.search).get('tab')
  const [tab, setTab] = useState<Tab>(actualTab ? actualTab as Tab : 'posts')
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')

  const createClass = () => {
    console.log(name)
    console.log(subject)
  }

  const isTurmasPage = title === 'Turmas'

  const handleChange = (e: React.SyntheticEvent, newTab: Tab) => {
    const url = new URL(window.location.href)
    navigate(`${url.pathname}?tab=${newTab}`)
    setTab(newTab)
    console.log(e) // se tirar o log o ts reclama que eu nao usei, e pra funcionar as tabs tem que ter o parametro e
  }

  return (
    <Box sx={{
      width: '95%',
      marginTop: '20px'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src='/iconsPages/turma.svg' alt='Pessoas agrupadas' />
          <Typography variant='h5' sx={{
            fontWeight: '700'
          }}>
            {title}
          </Typography>
        </Box>
        {!isTurmasPage && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '5px' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  sx={{
                    '.MuiTabs-indicator': {
                      backgroundColor: '#6730EC'
                    },
                    '.MuiTab-root': {
                      color: 'black',
                      fontWeight: '600'
                    }
                  }}
                  indicatorColor='primary'
                  textColor='secondary'
                  onChange={handleChange}
                  value={tab}
                >
                  <Tab label='Posts' value='posts' />
                  <Tab label='Atividades' value='atividades' />
                  <Tab label='Pessoas' value='pessoas' />
                </Tabs>
              </Box>
            </TabContext>
          </Box>
        )}
        {isTurmasPage && (
          <Modal
            titulo='Nova Turma'
            textoBotaoAbrirModal='Nova Turma'
            altIcone='Nova Turma'
            variantButton='novaTurma'
            icone='/iconsPages/plus-circle.svg'
            textoBotaoConfirmar='Criar Turma'
            onClick={createClass}
          >
            <TextField
              variant='outlined'
              label='Nome'
              onChange={(e) => setName(e.target.value)}
              />
            <TextField
             variant='outlined'
             label='Matéria'
            onChange={(e) => setSubject(e.target.value)}
             />
          </Modal>
        )}
      </Box>
      <Divider sx={{
        width: '100%',
        border: 0,
        marginTop: '15px',
        height: '2px',
        background: 'linear-gradient(to right, #E0D5F4 0%, #A578F9 50%, #DBCFF2 100%)'
      }} />
    </Box>
  )
}
