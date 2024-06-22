/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box/Box'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import Turma from '../components/Turma/Turma'
import Layout from './Layout'
import { useContext, useEffect, useState } from 'react'
import useClient from '../lib/client/useClient'
import { AuthContext } from '../contexts/AuthContext'
import { TurmaType, TurmasType } from '../lib/types/Turma'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Skeleton, Typography } from '@mui/material'

export default function Home() {
  const { role } = useContext(AuthContext)
  const client = useClient()
  const [turmas, setTurmas] = useState<TurmasType>([])
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [turmaSearch, setTurmaSearch] = useState<TurmaType | null>(null)
  const regex = /[^a-zA-Z0-9\s]/g
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

  const handleClick = (classroomId: string) => {
    navigate(`/turma/${classroomId}?tab=posts`)
  }

  useEffect(() => {
    updateClassrooms()
  }, [])

  const searchClassrooms = () => {
    const turmasOrdenadas = mergeSort(turmas)

    setTurmaSearch(binarySearch(turmasOrdenadas, search))
  }

  function binarySearch(turmas: TurmasType, title: string): TurmaType | null {
    if (regex.test(title)) {
      errorToast('Caracteres especiais são invalidos.')
    }

    let left = 0
    let right = turmas.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (turmas[mid].title === title) {
        return turmas[mid]
      }
      if (turmas[mid].title < title) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return null
  }

  function mergeSort(turmas: TurmasType): TurmasType {
    if (turmas.length <= 1) {
      return turmas
    }

    const middle = Math.floor(turmas.length / 2)
    const left = turmas.slice(0, middle)
    const right = turmas.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
  }

  function merge(left: TurmasType, right: TurmasType): TurmasType {
    const resultArray = []
    let leftIndex = 0, rightIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].title < right[rightIndex].title) {
        resultArray.push(left[leftIndex])
        leftIndex++
      } else {
        resultArray.push(right[rightIndex])
        rightIndex++
      }
    }

    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex))
  }

  const createClassroom = async (title: string, course: string): Promise<void> => {
    if (regex.test(title) || regex.test(course)) {
      errorToast('Não foi possivel criar a turma, atente-se aos caracteres especiais.')
      return
    }
    try {
      const result = await client.createClassroom({ title, course }).then(() => updateClassrooms())
      return result
    } catch (error) {
      errorToast('Não foi possivel criar a turma.')
    }

  }

  const updateClassrooms = () => {
    try {
      client.getUserClassrooms().then((data) => {
        setTurmas(data)
        setLoading(false)
      })
    } catch (error) {
      errorToast('Não foi possivel carregar as turmas.')
    }
  }

  return (
    <Layout>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }} >
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <PageHeader
            search={{ searchValue: search, setSearchValue: setSearch, onSearch: searchClassrooms }}
            createClassroom={createClassroom}
            showButton={role === 'TEACHER'}
            title='Turmas'
          />
        </Box>
        <Box sx={{
          width: '95%',
          flexWrap: 'wrap',
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
          height: '85%',
          alignContent: 'start',
        }}>
          {turmas && !turmaSearch && turmas.map((turma, index) => (
            <Turma
              key={index}
              title={turma.title}
              course={turma.course}
              studentsCount={turma.studentsCount}
              onClick={() => handleClick(turma.id)}
              id={turma.id}
              isTeacher={role === 'TEACHER'}
              nextSubmission={turma.nextSubmission}
              updateClassrooms={updateClassrooms}
            />
          ))}
          {loading && (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton variant='rounded' width='95%' height={120} key={index} />
            )
            ))}
          {turmas.length === 0 && !loading && (
            <Typography variant='h6' align='center' sx={{ fontSize: '16px' }}>
              Poxa! Nenhuma turma encontrada.. 😕
            </Typography>
          )}
          {
            turmaSearch &&
            <Turma
              title={turmaSearch.title}
              course={turmaSearch.course}
              studentsCount={turmaSearch.studentsCount}
              onClick={() => handleClick(turmaSearch.id)}
              id={turmaSearch.id}
              isTeacher={role === 'TEACHER'}
              nextSubmission={turmaSearch.nextSubmission}
              updateClassrooms={updateClassrooms}
            />
          }
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
    </Layout>
  )
}
