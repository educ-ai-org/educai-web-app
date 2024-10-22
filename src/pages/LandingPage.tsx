import NavBar from '../components/LandingPageNavBar/NavBar'
import MainTextLogo from '../components/MainTextHome/MainTextLogo'
import Button from '../components/Button/Button'
import LpCard from '../components/LpCard/LpCard'
import Typography from '../components/Typography/Typography'
import Logo from '../components/Logo/Logo'
import CardTeam from '../components/CardTeam/CardTeam'
import LandingPagePrincing from '../components/LandingPagePricing/LandingPagePrincing'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function LandingPage() {
    const { t } = useTranslation(['landingPage'])
    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/login')
    }

    return (
        <div className='flex flex-col bg-black'>
            {/* Home */}
            <div className='flex flex-col h-screen items-center bg-dark'>
                <div className='flex flex-col w-full h-full max-w-screen-xl'>
                    <div className='flex w-full h-[15%] items-center justify-between px-10'>

                        <div className='flex-1'>
                            <Logo variant='padraoWhite' width='lg' />
                        </div>

                        <div className='flex w-[70%] justify-center h-[40%]'>
                            <NavBar />
                        </div>

                        <div className='flex-1 flex justify-end'>
                            <Button variant='primary' onClick={handleClickLogin}>{t('navbar.login')}</Button>
                        </div>
                    </div>

                    <div className='flex flex-col w-full h-[85%] bg-[url(/Gradientes/gradienteHome.png)] bg-no-repeat bg-center justify-center items-center'>
                        <MainTextLogo />

                        <div className='flex w-full justify-center gap-12 mt-12'>
                            <Button variant='primary'>{t('home.contact_us')}</Button>
                            <Button variant='secondary'>{t('home.try_demo')}</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Solutions */}
            <div className='flex flex-col h-screen items-center justify-center bg-dark'>
                <div className='flex w-[85%] flex-wrap justify-between gap-y-16'>
                    <LpCard figure='/IconCards/iconCard01.svg' iconSide='/IconCards/miniIconCard01.svg'
                        title={<>{t('solutions.exercise_creation')} <span className='text-purple-300'>{t('solutions.exercises')}</span></>} subTitle={t('solutions.with_ai')} />
                    <LpCard figure='/IconCards/iconCard02.svg' iconSide='/IconCards/miniIconCard02.svg'
                        title={<>{t('solutions.student_engagement')} <span className='text-purple-300'>{t('solutions.engaged')}</span></>} subTitle={t('solutions.with_ai')} />
                    <LpCard figure='/IconCards/iconCard03.svg' iconSide='/IconCards/miniIconCard03.svg'
                        title={<>{t('solutions.language_focus')} <span className='text-purple-300'>{t('solutions.practice')}</span></>} subTitle={t('solutions.with_ai')} />
                    <LpCard figure='/IconCards/iconCard04.svg' iconSide='/IconCards/miniIconCard04.svg'
                        title={<>{t('solutions.realtime_feedback')} <span className='text-purple-300'>{t('solutions.feedbacks')}</span></>} subTitle={t('solutions.with_ai')} />
                </div>
            </div>

            {/* Pricing */}
            <div className='flex flex-col h-screen items-center bg-dark justify-center gap-10'>
                <Typography variant='lp-main-sentece'>
                    {t('pricing.choose_plan')}
                </Typography>
                <div className='flex'>
                    <Typography variant='h2' color='white'>
                        {t('pricing.ready_to')} <Typography variant='h2' color='purple-300'>{t('pricing.join')}</Typography> <Typography variant='h2' color='white'>{t('pricing.teaching')}</Typography> <Typography variant='h2' color='purple-300'>{t('pricing.revolution')}</Typography>
                    </Typography>
                </div>

                <div className='flex gap-20'>
                    <LandingPagePrincing variant='plus' />
                    <LandingPagePrincing variant='premium' />
                </div>
            </div>

            {/* About Us */}
            <div className='flex flex-col h-screen items-center bg-dark'>
                <div className='flex w-[80%] h-full justify-center items-center'>
                    <Typography variant='lp-main-sentece'>{t('about_us.mission_statement')}</Typography>
                </div>
            </div>

            {/* Contact */}
            <div className='flex flex-col h-screen items-center bg-dark'>
                <div className='flex flex-col cp w-[80%] h-full justify-center items-center gap-3'>
                    <Typography variant='lp-team-title'>{t('contact.our_team')}</Typography>
                    <img src='./Logos/logoSemIcon.svg' alt='Logo'></img>
                    <CardTeam />
                </div>
            </div>

            <div className='flex flex-col items-center bg-dark'>
                <div className='flex flex-col cp w-[90%] justify-center items-center gap-3'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
