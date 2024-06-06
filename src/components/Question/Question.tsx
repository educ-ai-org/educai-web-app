import { Button, IconButton, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import Option from './components/Option'
import { useEffect, useState } from 'react'
import { Question as QuestionType } from '../../lib/types/Question'
import { IoMdClose } from 'react-icons/io'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { FaRegCheckCircle, FaRegTrashAlt } from 'react-icons/fa'

interface QuestionProps {
    question: QuestionType
    index: number
    handleChangeAlternativeDescription: (key: string, value: string) => void
    handleChangeQuestionDescription: (value: string) => void
    handleDeleteAlternative: (key: string) => void
    handleAddAlternative: () => void
    deleteQuestion?: () => void
}

export default function Question(props: QuestionProps) {
    const { question, index, handleChangeQuestionDescription, handleChangeAlternativeDescription, deleteQuestion, handleAddAlternative, handleDeleteAlternative } = props
    
    const [questionIsComplete, setQuestionIsComplete] = useState<boolean>(false)
    const [correctAnswerKey, setCorrectAnswerKey] = useState(question.correctAnswerKey)

    useEffect(() => {
        const isComplete = question.options.every(option => option.description !== '') && question.description !== ''
        setQuestionIsComplete(isComplete)
    }, [question])

    const handleSetCorretAnswerKey = (correctAnswerKey: string) => {
        setCorrectAnswerKey(correctAnswerKey)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', padding: '24px', border: '1px solid #BEBEBE', borderRadius: '8px', flexDirection: 'column', gap: '8px' }} >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }} >
                <Typography variant='h6'>
                    Questão {index + 1}
                </Typography>
                <Typography variant='body2' color={questionIsComplete ? 'green' : 'red'}>
                    {questionIsComplete ? 'Completa' : 'Incompleta'}
                </Typography>

                {questionIsComplete ? <IoCheckmarkSharp color='green'/> : <IoMdClose color='red'/>}
            </Box>
            <TextField size='small' spellCheck={false} multiline value={question.description} onChange={(e) => handleChangeQuestionDescription?.(e.target.value)} />
            <Box sx={{ borderBottom: '1px solid #BEBEBE', marginTop: '12px' }}>
                {question.options.map((option, index) => (
                    <Option
                        optionKey={option.key}
                        key={index}
                        description={option.description}
                        correctAnswerKey={correctAnswerKey}
                        handleChangeName={(value) => handleChangeAlternativeDescription(option.key, value)}
                        handleSelectAlternative={() => handleSetCorretAnswerKey(option.key)}
                        handleDeleteAlternative={() => handleDeleteAlternative(option.key)}
                    />
                ))}
                <Box sx={{ width: '100%', paddingLeft: '16px', marginBottom: '12px' }}>
                    <Button sx={{ marginTop: '12px' }} onClick={handleAddAlternative}>
                        Adicionar alternativa
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingInline: '8px' }} >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: '8px' }}>
                    <FaRegCheckCircle size={20} color='#7750DE'/>
                    <Typography variant='body2' color='#7750DE'>Selecione uma das opções acima para ser a correta</Typography>
                </Box>
                <IconButton onClick={deleteQuestion}>
                    <FaRegTrashAlt size={20} color='#7750DE'/>
                </IconButton>
            </Box>
        </Box>
    )
}
