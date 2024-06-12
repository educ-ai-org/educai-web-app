/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box/Box'
import Layout from './Layout'
import PageHeader from '../components/PageHeader/PageHeader'
import TalkButton from '../components/TalkButton/TalkButton'
import { useAudioRecorder } from '../lib/useAudioRecorder'
import useAiClient from '../lib/client/useAIClient'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../contexts/AuthContext'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

export type Messages = {
  message: string
  isUser: boolean
}

export default function TalkWithEdu() {
  const { recording, audioBlobUrl, startRecording, stopRecording } = useAudioRecorder()
  const { username } = useContext(AuthContext)
  const [transcription, setTranscription] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<string>()
  const client = useAiClient()
  const [messages, setMessages] = useState<Messages[]>([])
  const [pdfLink, setPdfLink] = useState<string>('')
  const [isFeedbackLoading, setFeedbackLoading] = useState<boolean>(false)

  const fetchTTS = async (text: string) => {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      {
        model: 'tts-1',
        input: text,
        voice: 'onyx'
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }
    )

    if (response.status !== 200) {
      throw new Error('Erro ao obter áudio da API')
    }

    const url = URL.createObjectURL(response.data)
    return url
  }

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl)
    audio.play()
  }

  const handleSendAudioToEdu = async () => {
    setResponse('')
    setIsLoading(true)
    if (audioBlobUrl) {
      console.log('Sending audio to Edu')
      const audioBuffer = await fetch(audioBlobUrl).then(response => response.arrayBuffer())
      const fileName = uuidv4() + '.mp3'
      const transcribeResponse = await client.transcribe(audioBuffer, fileName)
      setTranscription(transcribeResponse.data.text)
      const eduResponse = await client.getResponse(transcribeResponse.data.text)
      setResponse(eduResponse.response)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (audioBlobUrl) {
      handleSendAudioToEdu()
    }
  }, [audioBlobUrl])

  useEffect(() => {
    if (transcription && !messages.some(msg => msg.message === transcription && msg.isUser)) {
      setMessages([...messages, { message: transcription, isUser: true }])
    }
    if (response) {
      setMessages([...messages, { message: response, isUser: false }])
      fetchTTS(response).then(playAudio).catch(console.error)
    }
  }, [transcription, response])

  const handleGetFeedback = async () => {
    setFeedbackLoading(true)
    const response = await client.getFeedback(messages, username)
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
    const pdfUrl = URL.createObjectURL(pdfBlob)
    setPdfLink(pdfUrl)
    setFeedbackLoading(false)
  }

  return (
    <Layout>
      <Box sx={{ width: '100%' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader title='Falando com o Edu' />
        </Box>
        <Box sx={{ width: '100%', height: '89%', display: 'flex', padding: '24px', flexDirection: 'column' }}>
          <Box sx={{ width: '100%', height: '80%', overflowY: 'scroll' }}>
            {messages.map((message, index) => (
              <Box key={index}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  marginBottom: '8px'
                }}>
                <Box
                  sx={{
                    width: '50%',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: message.isUser ? '#DED1FF' : '#6730EC',
                    color: message.isUser ? 'black' : 'white'
                  }}>
                  <Typography variant='body1'>
                    {message.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '24px' }}>
            <TalkButton
              loading={isLoading}
              recording={recording || false}
              audioBlobUrl={audioBlobUrl}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
            <LoadingButton
              sx={{ width: '24vw', padding: '8px', borderRadius: '10px' }}
              color='primary'
              variant='text'
              loading={isFeedbackLoading}
              onClick={handleGetFeedback}
            >Terminar conversa</LoadingButton>
            {pdfLink && (
              <a
                style={{ color: '#7750DE', fontWeight: 400, fontSize: 14, textDecoration: 'underline' }}
                href={pdfLink}
                download={`feedback-${username}-${new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-')}.pdf`}>
                Clique aqui para ver o seu feedback
              </a>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

