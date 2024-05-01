import  TextField  from '@mui/material/TextField'
import Modal from '../components/Modal/Modal'

export default function Teste() {
  return (
    <div style={{
      width: '500px'
    }}>
      <Modal variantButton='sm' titulo='Nova turma' icone='../../public/IconsPages/turma.svg' altIcone='Pessoas agrupadas' textoBotaoAbrirModal='Nova Turma' textoBotaoConfirmar='Criar'>
        <TextField variant='outlined' label='Nome*'/>
        <TextField variant='outlined' label='Disciplina*'/>
      </Modal>
    </div>
  )
}
