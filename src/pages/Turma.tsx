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
import AtividadesPage from '../components/AtividadesPage/AtividadesPage'
import ListagemAtividade from '../components/ListagemAtividades/ListagemAtividade'
import { AtividadeType } from '../lib/types/Atividade'
import CriarAtividade from './Atividades/CriarAtividade'
import CriarAtividadeIA from './Atividades/CriarAtividadeIA'
import { Question } from '../lib/types/Question'

export default function Turma() {
  const client = useClient()
  const { id } = useParams()
  const [turma, setTurma] = useState<TurmaType>()
  const [selectedAtividade, setSelectedAtividade] = useState<AtividadeType>()

  const tab = new URLSearchParams(window.location.search).get('tab') as 'posts' | 'atividades' | 'pessoas' | 'criar-atividade' | 'criar-atividade-ia'
  const location = useLocation()
  const questions = location.state?.questions as Question[]

  const postProps = {
    dtPublicacao: new Date(),
    title: 'Título do post'
  }

  const atividadeProps = {
    id: 1,
    title: 'Atividade gu broxa',
    deadline: new Date(),
    asignmentDate: new Date(),
    description: 'Atividade referente a impotência do meu mano gug1, Atividade referente a impotência do meu mano gug1, Atividade referente a impotência do meu mano gug1, Atividade referente a impotência do meu mano gug1',
    exercises: 10,
    answered: 0
  }

  const atividadeSelectedProps = {
    icon: 'hello',
    name: 'Vitao',
    status: 'Enviado',
    grade: 10
  }

  useEffect(() => {
    if (id) {
      client.getClassroomById(id).then((res) => setTurma(res))
    }
  }, [id])

  return (
    <Layout>
      <Box sx={{ width: '100%', overflowY: 'auto' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader title={turma?.title} />
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

        {tab !== 'criar-atividade' && tab !== 'criar-atividade-ia' &&
          <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px' }}>
            <Box sx={{
              width: '65%',
              height: '100%',
              gap: '16px',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px'
            }}>
              {tab === 'posts' && (
                <PostsPage classroomId='1' posts={[postProps]} />
              )}
              {tab === 'atividades' && (
                selectedAtividade ? (
                  <ListagemAtividade atividades={[atividadeSelectedProps]} nomeAtividade={selectedAtividade.title} />
                ) : (
                  <AtividadesPage
                    atividades={[atividadeProps]}
                    onSelectAtividade={setSelectedAtividade}
                    classRoomId={id as string}
                  />
                )
              )}
              {tab === 'pessoas' && (
                <>
                {/* Pessoas */}
                </>
              )}
            </Box>

            <Leaderboard/>
          </Box>
        }
      </Box>
    </Layout>
  )
}
