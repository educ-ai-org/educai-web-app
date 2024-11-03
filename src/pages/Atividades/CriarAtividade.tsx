import Box from '@mui/material/Box/Box'
import Question from '../../components/Question/Question'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Question as QuestionType } from '../../lib/types/Question'
import FinalizarDialog from '../../components/FinalizarDialog/FinalizarDialog'
import { Classwork } from '../../lib/types/ClassWork'
import useClient from '../../lib/client/useClient'
import { TurmaType } from '../../lib/types/Turma'
import GerarQuestaoModal from '../../components/GerarQuestaoModal/GerarQuestaoModal'
import { LuPlusCircle } from 'react-icons/lu'
import { BsStars } from 'react-icons/bs'
import Modal from '../../components/Modal/Modal'
import { useNavigate } from 'react-router-dom'

type QuestionProps = {
  questions?: QuestionType[]
}

export default function CriarAtividade(props: QuestionProps) {
  const { questions: q } = props

  const client = useClient()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_turma, setTurma] = useState<TurmaType>()
  const datePosting = new Date().toISOString().split('T')[0]
  const [endDate, setEndDate] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const url = new URL(window.location.href)
	const pathSegments = url.pathname.split('/')
	const classroomId = pathSegments[pathSegments.length - 1]
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [finishButtonIsEnabled, setFinishButtonIsEnabled] = useState<boolean>(false)
  const [createInProgress, setCreateInProgress] = useState<boolean>(false)

  const [questions, setQuestions] = useState<QuestionType[]>(
    q || [
      {
        description: '',
        correctAnswerKey: 'a',
        options: [
          { key: 'a', description: '' },
          { key: 'b', description: '' },
          { key: 'c', description: '' },
          { key: 'd', description: '' }
        ]
      }
    ]
  )

  useEffect(() => {
    const allQuestionsAreComplete = questions.every(q => q.description && q.options.every(o => o.description))

    if(allQuestionsAreComplete && questions.length > 0) {
      setFinishButtonIsEnabled(true)
    } else {
      setFinishButtonIsEnabled(false)
    }
  }, [questions])

  const handleCreateClassWork = async () => {
    setCreateInProgress(true)

    if(endDate) {
      const classWork: Classwork = {
        title,
        datePosting,
        endDate,
        description,
        questions
      }

      if (classroomId)
        await client.createClassWork(classWork, classroomId).then(() => {
          navigate('/turma/' + classroomId + '?tab=atividades')
        })
    }

    setCreateInProgress(false)
  }

  const handleChangeQuestionDescription = (value: string, index: number) => {
    const newQuestions = questions.map((q, i) => {
      if (i === index) {
        return { ...q, description: value }
      }
      return q
    })

    setQuestions(newQuestions)
  }

  const handleAddAlternative = (index: number) => {
    const newQuestions = questions.map((q, i) => {
      if (i === index) {
        const nextAlphabetKey = String.fromCharCode('a'.charCodeAt(0) + q.options.length)
        return { ...q, options: [...q.options, { key: nextAlphabetKey, description: '' }] }
      }
      return q
    })

    setQuestions(newQuestions)
  }

  const handleDeleteAlternative = (questionIndex: number, alternativeKey: string) => {
    const newQuestions = questions.map((q, i) => {
      if (i === questionIndex) {
        const newOptions = q.options
          .filter((o) => o.key !== alternativeKey)
          .map((o, index) => {
            const newKey = String.fromCharCode(65 + index).toLowerCase()
            return { ...o, key: newKey }
          })

        return { ...q, options: newOptions }
      }

      return q
    })

    setQuestions(newQuestions)
  }

  const handleChangeAlternativeDescription = (questionIndex: number, alternativeKey: string, value: string) => {
    const newQuestions = questions.map((q, i) => {
      if (i === questionIndex) {
        const newOptions = q.options.map((o) => {
          if (o.key === alternativeKey) {
            return { ...o, description: value }
          }
          return o
        })
        return { ...q, options: newOptions }
      }
      return q
    })

    setQuestions(newQuestions)
  }

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_q, i) => i !== index)
    setQuestions(newQuestions)
  }

  useEffect(() => {
    if (classroomId) {
      client.getClassroomById(classroomId).then((res) => setTurma(res))
    }
  }, [classroomId, client])

  const handleAddQuestion = (question?: QuestionType) => {
    if(question) {
      setOpenModal(false)
      return setQuestions([...questions, question])
    }

    const newQuestion: QuestionType = {
      description: '',
      correctAnswerKey: 'a',
      options: [
        { key: 'a', description: '' },
        { key: 'b', description: '' },
        { key: 'c', description: '' },
        { key: 'd', description: '' }
      ]
    }

    setQuestions([...questions, newQuestion])
  }

  return (
    <>
      <Box sx={{ width: '100%', overflowY: 'auto' }} >
        <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px', flexDirection: 'column' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '16px',
            paddingLeft: '16px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Criar questionário</Typography>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                startIcon={<LuPlusCircle color='#6730EC' size={22}/>}
                endIcon={<BsStars color='#6730EC' size={20}/>}
                sx={{
                  display: 'inline-flex',
                  gap: '8px',
                  backgroundColor: '#FFF',
                  color: '#170050',
                  border: '1px solid #6730EC',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    backgroundColor: '#E6CCFF',
                  }
                }}
              >
                Gerar Questões
              </Button>

              <FinalizarDialog
                createInProgress={createInProgress}
                title={title}
                setTitle={setTitle}
                datePosting={datePosting}
                endDate={endDate}
                setEndDate={setEndDate}
                description={description}
                setDescription={setDescription}
                onClick={handleCreateClassWork}
                enabled={finishButtonIsEnabled}
              />
            </Box>
          </Box>

          <Button
            sx={{ textTransform: 'none', backgroundColor: '#7750DE', borderRadius: '10px', padding: '8px', fontWeight: 600, marginBottom: '12px' }}
            variant='contained'
            onClick={() => handleAddQuestion()}>
              Adicionar nova questão
          </Button>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
            {questions.map((q, i) => (
              <Question
                index={i}
                handleAddAlternative={() => handleAddAlternative(i)}
                handleDeleteAlternative={(j) => handleDeleteAlternative(i, j)}
                handleChangeQuestionDescription={(value) => handleChangeQuestionDescription(value, i)}
                handleChangeAlternativeDescription={(key, value) => handleChangeAlternativeDescription(i, key, value)}
                question={q}
                key={i}
                deleteQuestion={() => deleteQuestion(i)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Modal
        width='50%'
        titulo='Gerar questão com IA'
        textoBotaoAbrirModal='Gerar questão IA'
        altIcone=''
        variantButton='none'
        iconeReact={
          <Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '12px' }}>
            <BsStars color='#341069' size={24} />
          </Box>
        }
        showModal={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
      >
        <GerarQuestaoModal handleAddQuestion={handleAddQuestion} handleCancel={() => setOpenModal(false)}/>
      </Modal>
    </>
  )
}
