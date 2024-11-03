/* eslint-disable react-hooks/exhaustive-deps */
import PageHeader from '../components/PageHeader/PageHeader'
import Layout from './Layout'
import Box from '@mui/material/Box/Box'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { TurmaType } from '../lib/types/Turma'
import useClient from '../lib/client/useClient'
import PostsPage from '../components/PostsPage/PostsPage'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import ClassWorksPage from '../components/ClassWorksPage/ClassWorksPage'
import CriarAtividade from './Atividades/CriarAtividade'
import CriarAtividadeIA from './Atividades/CriarAtividadeIA'
import { Question } from '../lib/types/Question'
import ParticipantsPage from '../components/ParticipantsPage/ParticipantsPage'
import Revisao from './Revisao'
import AnswerQuestionPage from '../components/AnswerQuestionPage/AnswerQuestionPage'

export default function Turma() {
  const client = useClient()
  const { id } = useParams()
  const [turma, setTurma] = useState<TurmaType>()

  const tab = new URLSearchParams(window.location.search).get('tab') as 'posts' | 'atividades' | 'pessoas' | 'criar-atividade' | 'criar-atividade-ia' | 'revisao' | 'responder-atividade'
  const location = useLocation()
  const questions = location.state?.questions as Question[]

  useEffect(() => {
    if (id) {
      client.getClassroomById(id).then((res) => setTurma(res))
    }
  }, [id])

  return (
    <Layout>
      <Box sx={{ width: '100%', overflowY: 'auto' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader title={tab == 'revisao' ? 'Revisão questionário' : turma?.title} iconPath={tab == 'revisao' ? '/iconsPages/bookIcon.svg' : undefined}/>
        </Box>

        {tab === 'criar-atividade' && (
          <>
            <CriarAtividade questions={questions} />
          </>
        )}

        {tab === 'criar-atividade-ia' && (
          <>
            <CriarAtividadeIA />
          </>
        )}

        {
          tab === 'revisao' && (
            <>
              <Revisao />
            </>
          )
        }

        {
          tab === 'responder-atividade' && (
            <>
              <AnswerQuestionPage />
            </>
          )
        }

        {tab !== 'criar-atividade' && tab !== 'criar-atividade-ia' && tab !== 'revisao' && tab !== 'responder-atividade' &&
          <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px' }}>
            <Box sx={{
              width: '65%',
              height: '100%',
              gap: '16px',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px'
            }}>
              {tab === 'posts' && id &&  (
                <PostsPage classroomId={id} />
              )}
              {tab === 'atividades' && (
                <ClassWorksPage classRoomId={id as string} />
              )}
              {tab === 'pessoas' && (
                <ParticipantsPage classroomId={id as string} />
              )}
            </Box>

            <Leaderboard/>
          </Box>
        }
      </Box>
    </Layout>
  )
}
