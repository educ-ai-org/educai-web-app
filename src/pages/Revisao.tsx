import { Box, Radio, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io'
import { useLocation } from 'react-router-dom'
import useClient from '../lib/client/useClient'
import { AuthContext } from '../contexts/AuthContext'
import { ReviewClasswork } from '../lib/types/ReviewClasswork'
import { formatDate } from '../utils/formartDate'

export default function Revisao() {
	const auth= useContext(AuthContext)
	const client = useClient()
	const classworkId = new URLSearchParams(useLocation().search).get('classWorkId') ?? ''
	const [classwork, setClasswork] = useState<ReviewClasswork>()

	useEffect(() => {
		if(auth.role == 'TEACHER' && auth.student) {
			client.getUserAnswers(classworkId).then((res) => setClasswork(res))
		}else{
			client.getUserAnswers(classworkId).then((res) => setClasswork(res))
		}
	}, [classworkId, client, auth])

	const getQuestionColor = (questionId?: string, currentOptionKey?: string): string => {
		const correctKey = classwork?.classwork.questions.find(question => question.id === questionId)?.correctAnswerKey
		const userKey = classwork?.questionAnswers.find(answer => answer.questionId === questionId)?.optionKey

		if(correctKey === currentOptionKey) {
			return '#EAFFEA'
		}

		if(currentOptionKey === userKey && currentOptionKey !== correctKey) {
			return '#FFEAEA'
		}

		return '#FFFFFF'
	}

	const isUserAnswer = (questionId?: string, optionKey?: string) => {
		return !!classwork?.questionAnswers.find(answer => answer.questionId === questionId && answer.optionKey === optionKey)
	}

	const getQuestionType = (questionId?: string, currentOptionKey?: string): string => {
		const correctKey = classwork?.classwork.questions.find(question => question.id === questionId)?.correctAnswerKey
		const userKey = classwork?.questionAnswers.find(answer => answer.questionId === questionId)?.optionKey

		if(correctKey === currentOptionKey) {
			return 'CORRECT'
		}

		if(currentOptionKey === userKey && currentOptionKey !== correctKey) {
			return 'WRONG'
		}

		return ''
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 42px' }}>
			<Typography sx={{ fontSize: 18, fontWeight: 800 }}>{classwork?.classwork.title}</Typography>

			<Box sx={{ border: '1px solid #BEBEBE', borderRadius: '10px', padding: '16px' }}>
				<Box sx={{ display: 'flex', gap: '4px' }}>
					<Typography sx={{ fontSize: 14, fontWeight: 700 }}>Aluno:</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 500, color: '#646363' }}>{classwork?.user.name}</Typography>
				</Box>

				<Box sx={{ display: 'flex', gap: '4px' }}>
					<Typography sx={{ fontSize: 14, fontWeight: 700 }}>Data de Entrega:</Typography>
					<Typography sx={{ fontSize: 14, fontWeight: 500, color: '#646363' }}>{classwork && formatDate(classwork.datePosting)}</Typography>
				</Box>
			</Box>

			{classwork?.classwork.questions.map((question, index) => (
				<Box sx={{ border: '1px solid #BEBEBE', borderRadius: '10px', paddingBlock: '16px' }}>
					<Typography sx={{ fontSize: 16, fontWeight: 800, padding: '8px 26px' }}>Questão {index + 1}</Typography>
					<Typography sx={{ fontSize: 18, fontWeight: 700, padding: '8px 26px' }}>{question.description}</Typography>

					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						{question.options.map(option => (
							<Box sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								backgroundColor: getQuestionColor(question?.id, option.key),
								padding: '4px 26px',
								cursor: 'pointer',
								userSelect: 'none'
							}}>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography sx={{ fontSize: 14, fontWeight: 500, width: 10 }}>{option.key}</Typography>
									<Radio checked={isUserAnswer(question.id, option.key)} disabled />
									<Typography sx={{ fontSize: 14, fontWeight: 500 }}>{option.description}</Typography>
								</Box>

								{getQuestionType(question?.id, option.key) &&
									<Box sx={{ display: 'flex', alignItems: 'center', gap: '46px', marginRight: '24px' }}>
										<Typography sx={{ fontSize: 16, fontWeight: 500, color: getQuestionType(question?.id, option.key) === 'CORRECT' ? '#005600' : '#D30000' }}>
											{getQuestionType(question?.id, option.key) === 'CORRECT' ? 'Correta' : 'Errada'}
										</Typography>

										{
											getQuestionType(question?.id, option.key) === 'CORRECT'
												? <IoIosCheckmarkCircleOutline size={22} color='#005600' />
												: <IoIosCloseCircleOutline size={22} color='#D30000' />
										}
									</Box>
								}
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	)
}
