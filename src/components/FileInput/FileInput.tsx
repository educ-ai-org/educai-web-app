import { Box } from '@mui/material'

interface FileInputProps {
    id: string
    description?: string
    icon?: React.ReactNode
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: File | null
    error?: boolean
}

export default function FileInput(props: FileInputProps) {
    const { error } = props
    const borderColor = error ? '#FF0000' : '#BEBEBE'
    const color = error ? '#FF0000' : '#545454'
    const border = `1px solid ${borderColor}`

    return (
        <label htmlFor={`fileInput-${props.id}`} style={{width: '100%'}}>
            <Box
                component="span"
                sx={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: props.value ? '#7750DE' : color,
                    border: border,
                    borderRadius: '6px',
                    padding: '24px 16px',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                {props.icon}
                {!props.value ? props.description : props.value.name}
            </Box>
            <input onChange={(event) => props.onChange(event)} type="file" id={`fileInput-${props.id}`} style={{ display: 'none' }} />
        </label>
    )
}