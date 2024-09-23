import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../../App.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'

export default function SlideLogin() {
  const { t } = useTranslation()

  return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper swiper-login'
      >
        <SwiperSlide className='swiper-slide-login'>
          <img src='./Illustration/IlustracaoLogin.svg' alt={t('slide_login.revolutionizing_education')} />
          <Typography variant='h3' color='white'>{t('slide_login.revolutionizing_education')}</Typography>
          <Typography variant='body2' color='white'>{t('slide_login.education_description')}</Typography>
        </SwiperSlide>

        <SwiperSlide className='swiper-slide-login'>
          <img src='./Illustration/illustrationSlide2.svg' alt={t('slide_login.languages_at_your_reach')} />
          <Typography variant='h3' color='white'>{t('slide_login.languages_at_your_reach')}</Typography>
          <Typography variant='body2' color='white'>{t('slide_login.languages_description')}</Typography>
        </SwiperSlide>

        <SwiperSlide className='swiper-slide-login'>
          <img src='./Illustration/illustrationSlide3.svg' alt={t('slide_login.smart_fluency')} />
          <Typography variant='h3' color='white'>{t('slide_login.smart_fluency')}</Typography>
          <Typography variant='body2' color='white'>{t('slide_login.fluency_description')}</Typography>
        </SwiperSlide>
      </Swiper>
  )
}
