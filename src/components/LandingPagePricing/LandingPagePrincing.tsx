import Button from '../Button/Button'
import Typography from '../Typography/Typography'

type PrincingProps = {
    variant: 'plus' | 'premium'
}

const mapVariantToPadding = {
    'plus': 'pr-36',
    'premium': 'pr-16'
}

export default function LandingPagePrincing({ variant }: PrincingProps) {
    const borderTop = variant === 'premium' ? 'border-t-8' : ''
    const margin = variant === 'premium' ? 'mt-4 mb-4' : 'mt-6 mb-6'
    return (
        <>
            <div className={`flex flex-col gap-10 p-12 rounded-3xl border-[#BFA5FF] border-2 ${mapVariantToPadding[variant]} shadow-pricing ${borderTop}`}>
                <div className='flex flex-col gap-3'>
                    <Typography variant='body2'>JOIN WITH US</Typography>
                    <div className='flex gap-2'>
                        <Typography variant='h2-light' color='white'>IN</Typography>
                        {variant === 'plus' && (
                            <Typography variant='h2' color='purple-300'>PLUS</Typography>
                        )}
                        {variant === 'premium' && (
                            <Typography variant='h2' color='purple-300'>PREMIUM</Typography>
                        )}
                        <Typography variant='h2-light' color='white'>PLAN</Typography>
                    </div>
                </div>
                <div>
                    {variant === 'plus' && (
                        <Typography variant='h2' color='white'>$30</Typography>
                    )}
                    {variant === 'premium' && (
                        <Typography variant='h2' color='white'>$40</Typography>
                    )}
                    <Typography variant='body1' color='white'>/month</Typography>
                </div>
                <div className={`flex flex-col ${margin}`}>
                    <Typography variant='body1' color='purple-300'>Unlimited Classses</Typography>
                    <Typography variant='body1' color='purple-300'>Unlimited Students</Typography>
                    {variant === 'premium' && (
                        <Typography variant='body1' color='purple-300'>AI chatbot for students</Typography>
                    )}
                </div>
                <div className='w-40'>
                    <Button variant='primary'>
                        <Typography variant='body2-bold'>LEARN MORE</Typography>
                    </Button>
                </div>
            </div>
        </>
    )
}
