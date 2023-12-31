'use client'
import { z as zValidator } from 'zod'

export const libraryModalFormSchema = zValidator.object({
  title: zValidator.coerce.string().min(1),
  author: zValidator.coerce.string().min(1),
  song: zValidator
    .unknown()
    .array()
    .refine((files) => files[0] != null, { message: 'Upload your song' }),
  image: zValidator
    .unknown()
    .array()
    .refine((files) => files[0] != null, { message: 'Upload your cover' })
})

export type libraryModalFormSchemaType = zValidator.infer<typeof libraryModalFormSchema>