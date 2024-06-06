export type GenerateQuestionPayload = { 
	instructions?: string, 
	youtubeLink?: string, 
	audio?: File | null, 
	document?: File | null, 
	theme: string, 
	relatedTheme: string, 
	difficulty: 'easy' | 'medium' | 'hard',
	numberOfQuestions: number
}