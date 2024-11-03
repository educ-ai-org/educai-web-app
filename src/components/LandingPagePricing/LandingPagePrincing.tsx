import Button from '../Button/Button'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'

type PrincingProps = {
    variant: 'plus' | 'premium'
}

const mapVariantToPadding = {
    'plus': 'pr-36',
    'premium': 'pr-16'
}

export default function LandingPagePrincing({ variant }: PrincingProps) {
    const { t } = useTranslation('landingPage')
    const borderTop = variant === 'premium' ? 'border-t-8' : ''
    const margin = variant === 'premium' ? 'mt-4 mb-4' : 'mt-6 mb-6'

    return (
        <>
            <div className={`flex flex-col gap-10 p-12 rounded-3xl border-[#BFA5FF] border-2 ${mapVariantToPadding[variant]} shadow-pricing ${borderTop}`}>
                <div className='flex flex-col gap-3'>
                    <Typography variant='body2'>{t('pricing.join_with_us')}</Typography>
                    <div className='flex gap-2'>
                        <Typography variant='h2-light' color='white'>IN</Typography>
                        {variant === 'plus' && (
                            <Typography variant='h2' color='purple-300'>{t('pricing.plus')}</Typography>
                        )}
                        {variant === 'premium' && (
                            <Typography variant='h2' color='purple-300'>{t('pricing.premium')}</Typography>
                        )}
                        <Typography variant='h2-light' color='white'>{t('pricing.plan')}</Typography>
                    </div>
                </div>
                <div>
                    {variant === 'plus' && (
                        <Typography variant='h2' color='white'>$30</Typography>
                    )}
                    {variant === 'premium' && (
                        <Typography variant='h2' color='white'>$40</Typography>
                    )}
                    <Typography variant='body1' color='white'>{t('pricing.month')}</Typography>
                </div>
                <div className={`flex flex-col ${margin}`}>
                    <Typography variant='body1' color='purple-300'>{t('pricing.unlimited_classes')}</Typography>
                    <Typography variant='body1' color='purple-300'>{t('pricing.unlimited_students')}</Typography>
                    {variant === 'premium' && (
                        <Typography variant='body1' color='purple-300'>{t('pricing.ai_chatbot')}</Typography>
                    )}
                </div>
                <div className='w-40'>
                    <Button variant='primary'>
                        <Typography variant='body2-bold'>{t('pricing.learn_more')}</Typography>
                    </Button>
                </div>
            </div>
        </>
    )
}
