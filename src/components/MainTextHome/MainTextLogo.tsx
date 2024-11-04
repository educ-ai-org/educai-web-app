import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'

export default function MainTextLogo() {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col items-center text-white text-center gap-y-8'>
            <Typography variant='lp-title'>
                {t('home.changing_way')} <br />
                <span className=' bg-gradient-to-b from-violet-900 to-violet-500 text-transparent bg-clip-text'>{t('home.learn')}</span>
            </Typography>

            <Typography variant="body1">
                {t('home.power_ai')}
            </Typography>
        </div>
    )
}
