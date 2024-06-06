import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { UserLogin } from '../types/Login'
import { EduResponse } from '../types/EduResponse'
import { TurmaType } from '../types/Turma'
import { LeaderboardType } from '../types/Leaderboard'
import { PostType } from '../types/Post'
import { classWork } from '../types/ClassWork'
import { Question } from '../types/Question'
import { GenerateQuestionPayload } from '../types/GenerateQuestionPayload'
import { DictonaryResponse } from '../types/DictonaryResponse'

type ClientProps = {
  clientType: 'ia-api' | 'api',
  clientToken: string
}

export default class Client {
  private axios: AxiosInstance
  private clientProps: ClientProps

  constructor(clientProps: ClientProps) {
    this.clientProps = clientProps
    this.axios = axios.create({
      baseURL: this.clientProps.clientType === 'ia-api' ? import.meta.env.VITE_API_URL_IA : import.meta.env.VITE_API_URL,
      withCredentials: true
    })

    this.axios.interceptors.request.use((config) => {
      if(!config.url?.includes('user/auth') && !config.url?.includes('user/refreshToken')) {
        config.headers.Authorization = this.clientProps.clientToken
      }
      return config
    })

    this.axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        const originalRequest = error.config

        console.log(error)
        if(error.response.status === 500 && !originalRequest._retry && error.response.data.message.includes('Token has expired')) {
          originalRequest._retry = true

          return this.refreshToken().then(response => {
            this.clientProps.clientToken = response.data.token
            sessionStorage.setItem('token', response.data.token)

            return this.axios(originalRequest)
          }).catch(errorToken => {
            console.error('Erro ao atualizar token:', errorToken)
            throw errorToken
          })
        }

        return Promise.reject(error)
      }
    )
  }

  async login(
    body: UserLogin
  ): Promise<{token: string}> {
    return (await this.axios.post('user/auth', body)).data
  }

  async getUserClassrooms() {
    return (await this.axios.get('/user/classrooms')).data
  }

  async createClassroom(body: {title: string, course: string}): Promise<void> {
    return (await this.axios.post('/classroom', body))
  }

  async getClassroomById(classroomId: string): Promise<TurmaType> {
    return (await this.axios.get(`/classroom/${classroomId}`)).data
  }

  async deleteClassroom(classroomId: string): Promise<void> {
    return (await this.axios.delete(`/classroom/${classroomId}`))
  }

  async updateClassroom(classroomId: string, body: {title?: string, course?: string}): Promise<void> {
    return (await this.axios.patch(`/classroom/${classroomId}`, body))
  }

  async getLeaderboard(classroomId: string): Promise<LeaderboardType> {
    return (await this.axios.get(`/classroom/${classroomId}/leaderboard`)).data
  }

  async createPost(body: { title: string, description: string, datePosting: string, classroomId: string }, file: File): Promise<{ post: PostType, url: string }> {
    const formData = new FormData()
    formData.append('title', body.title)
    formData.append('description', body.description)
    formData.append('datePosting', body.datePosting)
    formData.append('classroomId', body.classroomId)
    formData.append('file', file)
    
    const response = await this.axios.post('/posts', formData)
    const post: PostType = response.data
    const url = await this.getUrlArquivoPost(post.id)
    return { post, url }
}

  async getUrlArquivoPost(postId: string): Promise<string> {
    return (await this.axios.get(`/posts/${postId}/download`)).data
  }

  async deletePost(postId: string): Promise<void> {
    return (await this.axios.delete(`/posts/${postId}`))
  }

  async updatePost(postId: string, body: {title?: string, description?: string}): Promise<void> {
    return (await this.axios.patch(`/posts/${postId}`, body))
  }

  async getPostsByClassroom(classroomId: string): Promise<PostType[]> {
    return (await this.axios.get(`/classroom/${classroomId}/posts`)).data
  }

  async refreshToken() {
    return (await this.axios.post('/user/refreshToken'))
  }

  async transcribe(
    audioBuffer: ArrayBuffer,
    fileName: string
  ) {
    const formData = new FormData()
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' })
    formData.append('file', audioBlob, fileName)
    return (await this.axios.post('transcription', formData))
  }

  async getResponse(
    question: string
  ): Promise<EduResponse>{
    const request = await this.axios.post('edu-response', { question } )
    console.log(request)
    return request.data
  }

  async uploadFile(formData: FormData): Promise<{ url: string }> {
    const response = await this.axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  // outros métodos vcs devem criar um tipo na pasta types, copiem o UserLogin e alterem conforme a necessidade
  async createClassWork(
    classWork: classWork,
    classroomId: string
  ): Promise<void> {
    const headers = {
      'classroomId': classroomId
    }
    return (await this.axios.post('/classwork', classWork, { headers }))

  }
  
  async generateEducationalMaterial(payload: {instructions?: string; youtubeLink?: string, audio?: File | null, document?: File | null}): Promise<AxiosResponse<ArrayBuffer>> {
    const formData = new FormData()

    payload.instructions && formData.append('instructions', payload.instructions)
    payload.youtubeLink && formData.append('youtubeLink', payload.youtubeLink)
    payload.audio && formData.append('audio', payload.audio)
    payload.document && formData.append('document', payload.document)
  
    return (await this.axios.post('/generate-educational-resource', formData, { responseType: 'arraybuffer' }))
  }

  async generateQuestion(payload: GenerateQuestionPayload): Promise<Question[]> {
    const formData = new FormData()

    payload.instructions && formData.append('instructions', payload.instructions)
    payload.youtubeLink && formData.append('youtubeLink', payload.youtubeLink)
    payload.audio && formData.append('audio', payload.audio)
    payload.document && formData.append('document', payload.document)

    payload.difficulty && formData.append('level', payload.difficulty)
    payload.theme && formData.append('theme', payload.theme)
    payload.relatedTheme && formData.append('relatedTheme', payload.relatedTheme)
    payload.numberOfQuestions && formData.append('numberOfQuestions', payload.numberOfQuestions.toString())

    return (await this.axios.post('/generate-questions', formData)).data
  }

  // outros métodos vcs devem criar um tipo na pasta types, copiem o UserLogin e alterem conforme a necessidade
  async getWordDefinition(word: string): Promise<DictonaryResponse> {
    return (await this.axios.get(`/dictionary/${word}/definition`)).data
  }

}
