import { Anchor } from '../Anchor'
import { useTranslation } from 'react-i18next'

export default function NavBar() {
    const { t } = useTranslation()

    return (
        <div className='flex rounded-2xl h-full border items-center px-14 gap-x-16'>
            <Anchor path="/">{t('navbar.home')}</Anchor>
            <Anchor path="/">{t('navbar.solutions')}</Anchor>
            <Anchor path="/">{t('navbar.pricing')}</Anchor>
            <Anchor path="/">{t('navbar.about_us')}</Anchor>
            <Anchor path="/">{t('navbar.contact')}</Anchor>
        </div>
    )
}
