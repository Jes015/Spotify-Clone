'use client'
import { Button, TextField } from '@/components'
import { libraryModalFormSchema, type libraryModalFormSchemaType } from '@/components/LibraryModal/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import styles from './libraryModalForm.module.css'

export const LibraryModalForm = () => {
  const {
    register,
    formState,
    handleSubmit
  } = useForm<libraryModalFormSchemaType>({
    resolver: zodResolver(libraryModalFormSchema)
  })

  const handleOnClickForSubmit: SubmitHandler<libraryModalFormSchemaType> = (data) => {
    console.log(data)
  }

  return (
        <form
            className={styles.libraryModalForm}
            onSubmit={handleSubmit(handleOnClickForSubmit)}
        >
            <TextField
                label='title'
                placeHolder='Dakiti, Verde, Eclipse ...'
                registerData={register('title')}
                error={formState.errors.title}
            />
            <TextField
                label='author'
                placeHolder='Bad bunny, blessed, maluma ...'
                registerData={register('author')}
                error={formState.errors.author}
            />
            <TextField
                label='Cover file'
                type='file'
                accept='image/*'
                registerData={register('image')}
                error={formState.errors.image}
            />
            <TextField
                label='Song file'
                type='file'
                accept='audio/mp3'
                registerData={register('song')}
                error={formState.errors.song}
            />
            <Button
                className={styles.libraryModalForm__button}
                variant='solid'
                rounded='medium'
            >
                Send
            </Button>
        </form>
  )
}
