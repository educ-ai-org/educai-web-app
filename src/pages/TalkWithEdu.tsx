/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box'
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
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Messages } from '../lib/types/Messages'

export default function TalkWithEdu() {
  const { recording, audioBlobUrl, startRecording, stopRecording } = useAudioRecorder()
  const { username } = useContext(AuthContext)
  const [transcription, setTranscription] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<string>()
  const client = useAiClient()
  const [messages, setMessages] = useState<Messages>([])
  const [pdfLink, setPdfLink] = useState<string>('')
  const [isFeedbackLoading, setFeedbackLoading] = useState<boolean>(false)

  const errorToast = (message: string) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 2600,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

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
      try {
        const audioBuffer = await fetch(audioBlobUrl).then(response => response.arrayBuffer())
        const fileName = uuidv4() + '.mp3'
        const transcribeResponse = await client.transcribe(audioBuffer, fileName)
        setTranscription(transcribeResponse.data.text)
        const eduResponse = await client.getResponse([...messages, { role: 'user', content: transcribeResponse.data.text }])
        setResponse(eduResponse)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        errorToast('Erro ao enviar áudio para o Edu')
      }
    }
  }

  useEffect(() => {
    if (audioBlobUrl) {
      handleSendAudioToEdu()
    }
  }, [audioBlobUrl])

  useEffect(() => {
    if (transcription && !messages.some(msg => msg.content === transcription && msg.role === 'user')) {
      setMessages(prev => [...prev, { role: 'user', content: transcription }])
    }
    if (response) {
      setMessages(prev => [...prev, { content: response, role: 'assistant' }])
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
      <Box
        sx={{
          width: '100%',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #f6f7f8 0%, #e6e9f0 100%)',
          overflow: 'hidden'
        }}
      >
        <PageHeader title='Falando com o Edu' />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: 2
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              borderRadius: 3,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              padding: 2,
              background: 'white'
            }}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '12px'
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: message.role === 'user' ? '#7750DE' : '#F0F0F0',
                      color: message.role === 'user' ? 'white' : 'black',
                      boxShadow: message.role === 'user'
                        ? '0 4px 6px rgba(119, 80, 222, 0.2)'
                        : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography variant='body1' sx={{ lineHeight: 1.5 }}>
                      {message.content}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <TalkButton
              loading={isLoading}
              recording={recording || false}
              audioBlobUrl={audioBlobUrl}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />

            <LoadingButton
              sx={{ width: '24vw', padding: '16px', borderRadius: '10px', marginTop: '24px' }}
              variant='text'
              loading={isFeedbackLoading}
              onClick={handleGetFeedback}
            >
              Terminar conversa
            </LoadingButton>

            {pdfLink && (
              <motion.a
                href={pdfLink}
                download={`feedback-${username}-${new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-')}.pdf`}
                style={{
                  color: '#7750DE',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Clique aqui para ver o seu feedback
              </motion.a>
            )}
          </Box>
        </Box>

        <ToastContainer
          position='bottom-right'
          autoClose={2600}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Box>
    </Layout>
  )
}
