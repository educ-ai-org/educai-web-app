import { Anchor } from "../Anchor"

export default function NavBar() {
    return (
        <div className='flex rounded-2xl h-full border items-center px-14 gap-x-16'>
            <Anchor path="/">HOME</Anchor>
            <Anchor path="/">SOLUTIONS</Anchor>
            <Anchor path="/">PRICING</Anchor>
            <Anchor path="/">ABOUT US</Anchor>
            <Anchor path="/">CONTACT</Anchor>
        </div>
    )
}