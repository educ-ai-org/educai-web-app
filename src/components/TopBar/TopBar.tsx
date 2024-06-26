import Stack from '@mui/material/Stack'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export default function TopBar() {
  const { username, profilePicture } = useContext(AuthContext)

  return (
    <Stack width='100%' height='80px' sx={{
      borderBottom: '1px solid transparent',
      zIndex: 10000,
      position: 'absolute',
      backgroundImage: 'linear-gradient(90deg, #1E0132, #6730EC)',
      borderRadius: '0 0 24px 24px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 48px'
    }}>
      <img src='/logos/padraoWhite.svg' alt='Logo' style={{width: '140px'}}/>
      <ProfileHeader name={username} imageUrl={profilePicture || '/iconsPages/iconUser.png'} />
    </Stack>
  )
}
