// Import Swiper React components
import Typography from '../Typography/Typography'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '../../App.css'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src='/Team/gustavo.svg' alt='Gustavo' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.gustavo')}</Typography>
            <Typography variant='body2'>{t('team.gustavo_role')}</Typography>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/Team/julia.svg' alt='Julia' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.julia')}</Typography>
            <Typography variant='body2'>{t('team.julia_role')}</Typography>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/Team/luiza.svg' alt='Luiza' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.luiza')}</Typography>
            <Typography variant='body2'>{t('team.luiza_role')}</Typography>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/Team/vitao.svg' alt='Vitor' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.vitor')}</Typography>
            <Typography variant='body2'>{t('team.vitor_role')}</Typography>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/Team/diego.svg' alt='Diego' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.diego')}</Typography>
            <Typography variant='body2'>{t('team.diego_role')}</Typography>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/Team/erick.svg' alt='Erick' />
          <div className='flex flex-col gap-2'>
            <Typography variant='lp-name-team'>{t('team.erick')}</Typography>
            <Typography variant='body2'>{t('team.erick_role')}</Typography>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
