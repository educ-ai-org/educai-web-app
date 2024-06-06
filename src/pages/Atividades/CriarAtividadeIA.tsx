import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip, Typography, styled } from '@mui/material'
import { useState } from 'react'
import { CiMusicNote1 } from 'react-icons/ci'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { LuFile } from 'react-icons/lu'
import { RiLink, RiQuestionLine } from 'react-icons/ri'
import { TbSchool } from 'react-icons/tb'
import Modal from '../../components/Modal/Modal'
import FileInput from '../../components/FileInput/FileInput'
import { IoIosArrowDown } from 'react-icons/io'
import useClient from '../../lib/client/useAIClient'
import { GenerateQuestionPayload } from '../../lib/types/GenerateQuestionPayload'
import { useNavigate } from 'react-router-dom'

export default function CriarAtividadeIA() {
	const StyledButton = styled(Button)({
		display: 'inline-flex',
		gap: '8px',
		backgroundColor: '#FFF',
		color: '#170050',
		border: '1px solid #6730EC', 
		borderRadius: '10px', 
		fontSize: '18px',
		fontWeight: 'bold',
		textTransform: 'none',
		transition: 'background-color 0.3s, box-shadow 0.3s', 
		padding: '12px',
		width: '48%',
		'&:hover': {
			backgroundColor: '#E6CCFF', 
		}
	})

    const client = useClient()
	const navigate = useNavigate()
	const url = new URL(window.location.href)
	const pathSegments = url.pathname.split('/')
	const classroomId = pathSegments[pathSegments.length - 1]

	const [open, setOpen] = useState<boolean>(false)
	const [resourceType, setResourceType] = useState<string>('')

	const handleClose = () => {
		setOpen(false)
		setResourceType('')
	}

	const handleOpen = (resourceType: string) => {
		setResourceType(resourceType)
		setOpen(true)
	}

	const [document, setDocument] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)
    const [instrucoes, setInstrucoes] = useState<string>('')
    const [linkYoutube, setLinkYoutube] = useState<string>('')
	
	const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0)
	const [difficulty, setDifficulty] = useState<string>('')
	const [theme, setTheme] = useState<string>('')
    const [relatedTheme, setRelatedTheme] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<File | null>>) => {
        set(event.target.files ? event.target.files[0] : null)
    }

    const handleValueChange = (event: string, set: React.Dispatch<React.SetStateAction<string>>) => {
        set(event)
    }

	const handleClick = async () => {
        if (!instrucoes && !linkYoutube && !audio && !document || (!theme || !relatedTheme || !difficulty || !numberOfQuestions)) {
            setErrorMessage('As entradas acima devem ser preenchidas!')
            return
        }

        setIsLoading(true)

        let payload = {} as GenerateQuestionPayload

        resourceType === 'linkYoutube' && (payload = { ...payload, youtubeLink: linkYoutube })
        resourceType === 'mp3' && (payload = { ...payload, audio })
        resourceType === 'documento' && (payload = { ...payload, document })
        resourceType === 'instrucao' && (payload = { ...payload, instructions: instrucoes })

        payload = {
            ...payload,
            theme,
            relatedTheme,
            difficulty,
            numberOfQuestions
        } as GenerateQuestionPayload

        const response = await client.generateQuestion(payload)

		navigate(`/turma/${classroomId}?tab=criar-atividade`, { state: { questions: response } })
        
        setErrorMessage('')
        setIsLoading(false)
    }

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px', gap: '40px', width: '100%' }}>
				<img src="../Illustration/Edu-Robot.svg" alt="Robo do Educ.AI" width="12%" />

				<Typography sx={{ fontSize: 26, fontWeight: 600, textAlign: 'center' }}>
					<>
						Qual tipo de entrada você fornecerá para <br/> a criação do questionário?
					</>
				</Typography>

				<Divider sx={{width: '60%'}} />

				<Box sx={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
					<StyledButton
						variant="contained"
						startIcon={<IoChatbubblesOutline color='#6730EC' size={28}/>}
						onClick={() => handleOpen('instrucao')}
					>
						Instruções
					</StyledButton>

					<StyledButton
						variant="contained"
						startIcon={<CiMusicNote1 color='#6730EC' size={28}/>}
						onClick={() => handleOpen('mp3')}
					>
						MP3
					</StyledButton>
				</Box>

				<Box sx={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
					<StyledButton
						variant="contained"
						startIcon={<RiLink color='#6730EC' size={28}/>}
						onClick={() => handleOpen('linkYoutube')}
					>
						Link do Youtube
					</StyledButton>

					<StyledButton
						variant="contained"
						startIcon={<LuFile color='#6730EC' size={28}/>}
						onClick={() => handleOpen('documento')}
					>
						Documento
					</StyledButton>
				</Box>

				<Modal
					titulo='Nova Atividade'
					textoBotaoAbrirModal='Nova Atividade'
					altIcone='Nova Atividade'
					variantButton='none'
					width='40%'
					iconeReact={
						<Box sx={{ backgroundColor: '#F1EBFF', borderRadius: '4px', padding: '8px' }}>
							<TbSchool color='#341069' size={30} />
						</Box>      
					}
					showModal={open}
					onClose={handleClose}
				>
					<Box>
						{resourceType === 'instrucao' && <TextField
							onChange={(event) => handleValueChange(event.target.value, setInstrucoes)}
							multiline
							rows={3}
							InputProps={{
								startAdornment:
									<InputAdornment position="start" sx={{ marginBottom: 'auto', marginTop: '10px' }}>
										<IoChatbubblesOutline size={22} color='#7750DE' />
									</InputAdornment>,
								sx: { borderRadius: 2 }
							}}
							placeholder='Escreva instruções'
							sx={{ fontSize: '16px', width: '100%' }}
						/>}

						{resourceType === 'linkYoutube' && <TextField
							onChange={(event) => handleValueChange(event.target.value, setLinkYoutube)}
							InputProps={{
								startAdornment:
									<InputAdornment position="start">
										<RiLink size={22} color='#7750DE' />
									</InputAdornment>,
								sx: { borderRadius: 2 }
							}}
							placeholder='Link do Youtube'
							sx={{ fontSize: '16px', width: '100%' }}
						/>}

						{resourceType === 'mp3' &&
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
								<FileInput
									id='audio'
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, setAudio)}
									value={audio}
									description='Carregar arquivo de áudio MP3'
									icon={<CiMusicNote1 size={22} color='#7750DE' />}
								/>
							</Box>
						}

						{resourceType === 'documento' &&
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
								<FileInput
									id='document'
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, setDocument)}
									value={document}
									description='Carregar um documento'
									icon={<LuFile size={22} color='#7750DE' />}
								/>
							</Box>
						}
					</Box>

					<Box sx={{display: 'flex', gap: '32px', width: '100%'}}>
						<Box sx={{width: '100%'}}>
							<Box sx={{display: 'flex'}}>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: '#000'}}>Dificuldade:</Typography>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: 'red'}}>*</Typography>
							</Box>

							<Select
								IconComponent={props => <IoIosArrowDown {...props} color='#7750DE' size={25} />}
								sx={{width: '100%'}}
								displayEmpty
								value={difficulty}
								onChange={(event) => handleValueChange(event.target.value as string, setDifficulty)}
							>   
								<MenuItem disabled value=''>
									<em>Dificuldade</em>
								</MenuItem>
								<MenuItem value={'easy'}>Fácil</MenuItem>
								<MenuItem value={'medium'}>Médio</MenuItem>
								<MenuItem value={'hard'}>Difícil</MenuItem>
							</Select>
						</Box>

						<Box sx={{width: '100%'}}>
							<Box sx={{display: 'flex'}}>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: '#000'}}>Dificuldade:</Typography>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: 'red'}}>*</Typography>
							</Box>
							
							<Select
								IconComponent={props => <IoIosArrowDown {...props} color='#7750DE' size={25} />}
								native={false}
								sx={{width: '100%'}}
								displayEmpty
								value={numberOfQuestions}
								onChange={(event) => setNumberOfQuestions(event.target.value as number)}
							>   
								<MenuItem disabled value={0}>
									<em>Quantidade</em>
								</MenuItem>
								{
									[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
										<MenuItem key={value} value={value}>{value}</MenuItem>
									))
								}
							</Select>
						</Box>
					</Box>

					<Box sx={{display: 'flex', gap: '32px', width: '100%'}}>
						<Box sx={{width: '100%'}}>
							<Box sx={{display: 'flex', alignItems: 'center'}}>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: '#000'}}>Tema das questões:</Typography>
								
								<Tooltip title="Qual o tema didático da questão?" arrow>
									<IconButton disableRipple size='small'>
										<RiQuestionLine color='#7750DE' />
									</IconButton>
								</Tooltip>
							</Box>

							<TextField
								onChange={(event) => handleValueChange(event.target.value, setTheme)}
								placeholder='Ex: To be verb'
								sx={{ fontSize: '16px', width: '100%' }}
							/>
						</Box>

						<Box sx={{width: '100%', alignItems: 'center'}}>
							<Box sx={{display: 'flex'}}>
								<Typography sx={{fontSize: '16px', fontWeight: 400, color: '#000'}}>Relacionar a:</Typography>
								<Tooltip title="Essa questão deve ser relacionada a qual tema?" arrow>
									<IconButton disableRipple size='small'>
										<RiQuestionLine color='#7750DE' />
									</IconButton>
								</Tooltip>
							</Box>
							
							<TextField
								onChange={(event) => handleValueChange(event.target.value, setRelatedTheme)}
								placeholder='Ex: Tecnologia'
								sx={{ fontSize: '16px', width: '100%' }}
							/>
						</Box>
					</Box>

					{errorMessage && 
						<Typography sx={{ color: '#FF0000', fontWeight: 400, fontSize: 14, marginTop: '10px' }}>
							{errorMessage}
						</Typography>
					}

					<Box sx={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: '10px'
					}}>
						<Button sx={{
							borderColor: '#5D1EF4',
							'&:hover': {
								backgroundColor: '#D8D8D8'
							},
							paddingY: '12px',
							width: '48%',
							textTransform: 'none',
							borderRadius: '10px',
							fontWeight: 700,
							color: '#170050'
						}} variant='outlined' onClick={handleClose}>Cancelar</Button>

						<LoadingButton sx={{
							backgroundColor: '#6730EC',
							color: 'white',
							'&:hover': {
								backgroundColor: '#4D1EAD'
							},
							paddingY: '12px',
							width: '48%',
							textTransform: 'none',
							borderRadius: '10px',
							fontWeight: 700
						}} variant='contained' loading={isLoading} onClick={handleClick}>Gerar questionário</LoadingButton>
					</Box>
				</Modal>
			</Box>
		</>
	)
}
