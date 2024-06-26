type TypographyProps = {
    variant: 'h1' | 'h2' | 'h2-light' | 'h3' | 'body1' | 'body2' | 'lp-title' | 'lp-card-title' | 'lp-main-sentece' | 'body2-bold' | 'lp-team-title' | 'lp-name-team' | 'title-leaderboard'
    children: React.ReactNode
    color?: string
}

export default function Typography(props: TypographyProps) {
    const { variant, children, color } = props

    const variantsClasnames = {
        'lp-title': 'font-montserrat text-8xl font-thin', // 96px
        'lp-card-title': 'font-manrope text-4xl font-bold',
        'lp-main-sentece': 'text-white text-6xl text-center font-bold' ,// 36px
        'lp-team-title': 'text-purple-300 font-montserrat text-4xl font-medium',
        'lp-name-team': 'text-white font-montserrat text-3xl font-semibold',// 48px
        h1: 'font-montserrat text-5xl font-bold', // 48px
        h2: 'font-montserrat text-4xl font-bold', // 36px
        'h2-light': 'font-montserrat text-4xl font-thin', // 36px
        h3: 'font-montserrat text-2xl font-bold', // 24px
        body1: 'font-montserrat text-base font-normal', // 16px
        body2: 'text-white font-montserrat text-sm font-normal', // 14px
        'body2-bold': 'font-montserrat text-sm font-medium', // 14px
        'title-leaderboard': 'font-montserrat text-lg font-bold',
    }

    const className = variantsClasnames[variant]
    const colorClass = color ? `text-${color}` : ''

    return (
        <>
            <span className={`${className} ${colorClass}`}>{children}</span>
        </>
    )
}
