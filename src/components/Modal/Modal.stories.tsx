import 'tailwindcss/tailwind.css'
import Modal from './Modal'
import TextField from '@mui/material/TextField'

export default {
  title: 'Components/Modal'
}

export const Example = () => {
  return (
    <Modal variantButton='lg' titulo='Novo Post' icone='./IconsPages/turma.svg' altIcone='Pessoas agrupadas' textoBotaoAbrirModal='Novo Post' textoBotaoConfirmar='Postar'>
      <TextField variant='outlined' label='Título*' />
      <TextField variant='outlined' label='Descrição*' />
      <TextField variant='outlined' label='Upload de arquivo' />
    </Modal>
  )
}
