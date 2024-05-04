import { jwtDecode } from 'jwt-decode'
import { ReactNode, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { JwtDecoded } from '../lib/types/JwtDecoded'

interface Props {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const [id, setId] = useState('')
	const [token, setToken] = useState('')
	const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT')

	const updateAuthData = (newToken: string) => {
		const tokenDecoded = getTokenDecoded(newToken)

		setId(tokenDecoded.id)
		setRole(tokenDecoded.role)
		setToken(newToken)
		sessionStorage.setItem('token', newToken)
	}

	const getToken = (): string => {
		if(token) 
			return token

		const sessionToken = sessionStorage.getItem('token')

		if(sessionToken) {
			return sessionToken
		}

		return ''
	}

	const getTokenDecoded = (tokenEncoded: string): JwtDecoded => {
		return jwtDecode(tokenEncoded)
	}

	return (
		<AuthContext.Provider value={{ id, role, updateAuthData, getToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
