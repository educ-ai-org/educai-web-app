import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box/Box'
import Divider from '@mui/material/Divider/Divider'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs/Tabs'
import Typography from '@mui/material/Typography/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from '@mui/lab/Skeleton'
import SearchBar from '../SearchBar/SearchBar'
import NewClassroomModal from './NewClassroomModal'
import { useTranslation } from 'react-i18next'

type Tab = 'posts' | 'atividades' | 'pessoas'

type PageHeaderProps = {
  title?: string
  showButton?: boolean
  createClassroom?: (title: string, course: string) => Promise<void>
  search?: {
    searchValue: string
    setSearchValue: (value: string) => void
    onSearch: () => void
  }
  tab?: Tab
  classroomId?: string
  iconPath?: string
}

export default function PageHeader(PageHeaderProps: PageHeaderProps) {
  const { title, showButton, search, createClassroom, iconPath } = PageHeaderProps
  const { t } = useTranslation(['home'])

  const tabName: { [key: string]: Tab } = {
    posts: 'posts',
    atividades: 'atividades',
    pessoas: 'pessoas',
    'criar-atividade': 'atividades',
    'criar-atividade-ia': 'atividades',
    'revisao': 'atividades',
    'responder-atividade': 'atividades',
    'listagem-atividade': 'atividades'
  }

  const actualTab = PageHeaderProps.tab ? PageHeaderProps.tab : new URLSearchParams(window.location.search).get('tab')
  const [tab, setTab] = useState<Tab>(actualTab ? tabName[actualTab] as Tab : 'posts')
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsLoading, setModalIsLoading] = useState(false)
  const classroomId = PageHeaderProps.classroomId

  const createClass = () => {
    if (name && subject && createClassroom) {
      setModalIsLoading(true)
      createClassroom(name, subject).finally(() => {
        setModalIsLoading(false)
        setModalIsOpen(false)
      })
    }
  }

  const isTabsNecessary = title === t('page_header.turmas') || title === 'Falando com o Edu'

  const handleChange = (_e: React.SyntheticEvent, newTab: Tab) => {
    const url = new URL(window.location.href)
    classroomId ? navigate(`/turma/${classroomId}?tab=${newTab}`) : navigate(`${url.pathname}?tab=${newTab}`)
    setTab(newTab)
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
          <img src={iconPath ? iconPath : '/iconsPages/turma.svg'} alt={t('page_header.pessoas')} />
          <Typography variant='h5' sx={{
            fontWeight: '700'
          }}>
            {title ?? (
              <Skeleton variant='text' width='200px' height='40px' animation='wave' sx={{ borderRadius: '10px' }} />
            )}
          </Typography>
        </Box>
        {!isTabsNecessary && (
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
                  <Tab label={t('page_header.posts')} value='posts' />
                  <Tab label={t('page_header.atividades')} value='atividades' />
                  <Tab label={t('page_header.pessoas')} value='pessoas' />
                </Tabs>
              </Box>
            </TabContext>
          </Box>
        )}

        {search &&
          <Box sx={{ width: '60%' }}>
            <SearchBar
              onSearch={search.onSearch}
              value={search.searchValue}
              setValue={search.setSearchValue}
              placeholder={t('page_header.search_placeholder')}
            />
          </Box>
        }

        {showButton && (
          <NewClassroomModal
            createClass={createClass}
            setModalIsLoading={setModalIsLoading}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
            setName={setName}
            name={name}
            setSubject={setSubject}
            subject={subject}
            modalIsLoading={modalIsLoading}
          />
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
