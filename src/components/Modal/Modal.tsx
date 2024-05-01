import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'

type ModalProps = {
  variantButton: 'sm' | 'lg' | 'novaTurma'
  titulo: string
  icone: string
  altIcone: string
  textoBotaoConfirmar: string
  textoBotaoAbrirModal: string
  onClick?: () => void
  children: React.ReactNode
}

export default function BasicModal(props: ModalProps) {
  const {
    variantButton,
    titulo,
    icone,
    textoBotaoConfirmar,
    children,
    altIcone,
    onClick,
    textoBotaoAbrirModal
  } = props

  const isNovaTurmaButton = titulo === 'Nova Turma'

  const variantsButtonStyle = {
    'novaTurma':
    {
      width: '14%'
    },
    'sm': {
      width: '48%'
    },
    'lg': {
      width: '100%'
    }
  }

  const sxButton = variantsButtonStyle[variantButton]

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button sx={{
        display: 'flex',
        borderColor: '#5D1EF4',
        gap: '10px',
        '&:hover': {
          backgroundColor: '#D8D8D8'
        },
        ...sxButton
      }} variant='outlined' onClick={handleOpen}>
        {!isNovaTurmaButton && (
          <img src='/iconsPages/plus-circle.svg' alt='Circulo com um mais dentro' />
        )}
        <Typography variant='body1' color='black'>{textoBotaoAbrirModal}</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'white',
          border: '2px solid #808080',
          borderRadius: 8,
          boxShadow: 24,
          p: 5,
          gap: '10px'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <img src={icone} alt={altIcone} />
            <Typography variant='h6' component='h2'>
              {titulo}
            </Typography>
          </Box>

          <Divider sx={{
            width: '100%',
            border: 0,
            height: '2px',
            background: 'linear-gradient(to right, #E0D5F4 0%, #A578F9 50%, #DBCFF2 100%)',
            marginBottom: '10px'
          }} />

          {children}

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}>

            <Button sx={{
              color: 'black',
              borderColor: '#5D1EF4',
              '&:hover': {
                backgroundColor: '#D8D8D8'
              },
              paddingY: '12px',
              width: '48%'
            }} variant='outlined' onClick={handleClose}>Cancelar</Button>

            <Button sx={{
              backgroundColor: '#6730EC',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4D1EAD'
              },
              paddingY: '12px',
              width: '48%'
            }} variant='contained' onClick={onClick}>{textoBotaoConfirmar}</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
