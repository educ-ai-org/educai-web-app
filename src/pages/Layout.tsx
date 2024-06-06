import Box from '@mui/material/Box/Box'
import PlatformLayout from '../components/PlatformLayout/PlatformLayout'
import Dictionary from './Dictionary'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex'
        }}>
        <PlatformLayout />
        <Box
          sx={{
            backgroundColor: 'white',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'end',
          }}>
          <Box
            sx={{
              width: '100%',
              height: 'calc(100% - 80px)',
              display: 'flex'
            }}>
            {children}
          </Box>
        </Box>
      </Box>
      <Dictionary />
    </>
  )
}
