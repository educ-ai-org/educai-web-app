/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box'
import AnswerQuestion from '../AnswerQuestion/AnswerQuestion'
import { Classwork } from '../../lib/types/ClassWork'
import { useState, useEffect, useContext } from 'react'
import useClient from '../../lib/client/useClient'
import { QuestionAnswers } from '../../lib/types/SendAnswerData'
import { SendAnswerData } from '../../lib/types/SendAnswerData'
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { RiUploadCloudLine } from 'react-icons/ri'
import Typography from '../Typography/Typography'

export default function AnswerQuestionPage() {
  const url = new URL(window.location.href)
	const pathSegments = url.pathname.split('/')
	const classroomId = pathSegments[pathSegments.length - 1]

  const [classwork, setClasswork] = useState<Classwork>()
  const [answers, setAnswers] = useState<QuestionAnswers[]>([])
  const navigate = useNavigate()
  const [completedQuestion, setCompletedQuestion] = useState<SendAnswerData>()
  const [questionaryIsCompleted, setQuestionaryIsCompleted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const client = useClient()
  const { id } = useContext(AuthContext)

  const classworkId = new URLSearchParams(useLocation().search).get('classWorkId') ?? ''

  const handleSelectAlternative = (questionId: string, answerKey: string) => {
    setAnswers(prevAnswers => {
      const index = prevAnswers.findIndex(answer => answer.questionId === questionId)
      const newAnswer = { questionId, optionKey: answerKey }

      if (index === -1) {
        return [...prevAnswers, newAnswer]
      } else {
        return prevAnswers.map((answer, i) => i === index ? newAnswer : answer)
      }
    })
  }

  useEffect(() => {
    if(answers.length === classwork?.questions.length) {
      setQuestionaryIsCompleted(true)
    }
  }, [answers])

  useEffect(() => {
    if (completedQuestion) {
      setIsLoading(true)
      const headers = { classworkId, userId: id }
      client.addAnswers(completedQuestion, headers).then(() => {
        setIsLoading(false)
        navigate(`/turma/${classroomId}?tab=atividades`)
      })
    }
  }, [completedQuestion])

  const handleSendAnswers = () => {
    const datePosting = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T')
    setCompletedQuestion({ datePosting, questionAnswers: answers })
  }

  useEffect(() => {
    client.getClassworkById(classworkId).then((res) => setClasswork(res))
  }, [classworkId])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingInline: '32px', width: '100%' }}>
        <Typography variant='h3'>
          {classwork?.title}
        </Typography>

        <LoadingButton
          sx={{ paddingInline: '80px', borderRadius: '10px', textTransform: 'none', fontWeight: 600, backgroundColor: '#7750DE'}}
          variant='contained'
          endIcon={questionaryIsCompleted && <RiUploadCloudLine color='#FFF' />}
          onClick={handleSendAnswers}
          disabled={!questionaryIsCompleted}
          loading={isLoading}>
            Finalizar
        </LoadingButton>
      </Box>

      <Box sx={{ alignSelf: 'flex-start', paddingInline: '42px', marginTop: '12px' }}>
        <Typography color='#666' variant='body1'>{classwork?.description}</Typography>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', padding: '24px' }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {classwork?.questions.map((question, index) => (
            <AnswerQuestion 
              index={index}
              key={index}
              description={question.description}
              options={question.options}
              id={question.id as string}
              handleSelectAlternative={handleSelectAlternative}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
