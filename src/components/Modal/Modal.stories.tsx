import 'tailwindcss/tailwind.css'
import Modal from './Modal'
import TextField from '@mui/material/TextField'

export default {
  title: 'Components/Modal'
}

export const Example = () => {
  return (
    <Modal 
      variantButton='lg' 
      titulo='Novo Post' 
      icone='\iconsPages\turma.svg' 
      altIcone='Pessoas agrupadas' 
      textoBotaoAbrirModal='Novo Post' 
      showModal={true} 
      onClose={() => console.log('Fechou')} 
      onOpen={() => console.log('Abriu')} 
    >
      <TextField variant='outlined' label='Título*' />
      <TextField variant='outlined' label='Descrição*' />
      <TextField variant='outlined' label='Upload de arquivo' />
    </Modal>
  )
}
