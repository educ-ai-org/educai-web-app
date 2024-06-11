import { IconButton, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import Radio from '@mui/material/Radio/Radio'
import CloseIcon from '@mui/icons-material/Close'

type OptionProps = {
    description: string
    optionKey: string
    correctAnswerKey: string
    handleSelectAlternative?: () => void
    handleDeleteAlternative?: () => void
    handleChangeName?: (value: string) => void
}

export default function Option(props: OptionProps) {

    const {
        description,
        optionKey,
        correctAnswerKey,
        handleSelectAlternative,
        handleDeleteAlternative,
        handleChangeName
    } = props

    const selected = optionKey === correctAnswerKey

    return (
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }} >
            <Typography variant='body1' sx={{minWidth: '10px'}}>{optionKey}</Typography>
            <Radio checked={selected} sx={{width: '40px'}}  onClick={handleSelectAlternative} />
            <TextField sx={{width: '100%'}} size='small' value={description} onChange={(e) => handleChangeName?.(e.target.value)} />
            <IconButton onClick={handleDeleteAlternative}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}
