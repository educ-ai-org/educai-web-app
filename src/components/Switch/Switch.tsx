import React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: 'url(../../../public/iconsPages/bandeira-brasil.png)',
        backgroundSize: '25px 18px',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#7840d1',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#6dba7b',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#6699ff',
    border: '1px solid #5b21b6',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 'url(../../../public/iconsPages/bandeira-usa.png)',
      backgroundSize: '25px 18px',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#caced1',
    borderRadius: 20 / 2,
  },
}))

export default function TranslateSwitch() {
  const { i18n, t } = useTranslation()

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      i18n.changeLanguage('pt')
      console.log('Switched to Portuguese')
    } else {
      i18n.changeLanguage('en')
      console.log('Switched to English')
    }
  }

  return (
    <Tooltip title={t('switch_language_tooltip')} placement="top" className='pl-8'>
      <FormGroup>
        <FormControlLabel
          label=""
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={handleToggle} />}
        />
      </FormGroup>
    </Tooltip>
  )
}
