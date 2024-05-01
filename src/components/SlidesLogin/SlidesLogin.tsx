import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../../App.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Typography from '../Typography/Typography'

export default function SlideLogin() {
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
          <img src='../../../public/Illustration/IlustracaoLogin.svg' alt='Mulher tendo ideias junto com a IA' />
          <Typography variant='h3' color='white'>Revolucionando a Educacão</Typography>
          <Typography variant='body2' color='white'>A IA que transforma seu jeito de aprender idiomas. Tornando-o mais interativo, adaptável, eficaz.</Typography>
        </SwiperSlide>

        <SwiperSlide className='swiper-slide-login'>
          <img src='./Illustration/illustrationSlide2.svg' alt='Mulher aprendendo um novo idioma através do computador' />
          <Typography variant='h3' color='white'>Idiomas ao Seu Alcance</Typography>
          <Typography variant='body2' color='white'>
            Explore novos idiomas com suporte de IA. Personalizado para o seu aprendizado fluir naturalmente.</Typography>
        </SwiperSlide>

        <SwiperSlide className='swiper-slide-login'>
          <img src='./Illustration/illustrationSlide3.svg' alt='Mulher realizando testes online' />
          <Typography variant='h3' color='white'>Fluência Inteligente</Typography>
          <Typography variant='body2' color='white'>
            IA que entende seu ritmo. Aprenda idiomas com atividades que se adaptam a você.</Typography>
        </SwiperSlide>

      </Swiper>
  )
}
