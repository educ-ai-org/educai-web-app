export type DictonaryResponse = {
    word: string
    audio: string
    meanings: {
        partOfSpeech: string
        definitions: string[]
    }[]
}