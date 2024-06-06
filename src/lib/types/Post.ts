export type PostType = {
    id: string
    title: string
    description: string
    file: string
    datePosting: string
    originalFileName: string
  }
  
export interface PostsType extends Array<PostType> {}
  