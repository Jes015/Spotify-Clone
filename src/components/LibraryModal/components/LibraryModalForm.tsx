'use client'
import { Button, TextField } from '@/components'
import { globalLoaderStateService } from '@/components/GlobalLoader/services'
import { libraryModalFormSchema, type libraryModalFormSchemaType } from '@/components/LibraryModal/models'
import { useRouting, useSongMethods } from '@/hooks'
import { toastUtils } from '@/utils/others'
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

  const { refresh } = useRouting()
  const { addSong } = useSongMethods()

  const handleOnClickForSubmit: SubmitHandler<libraryModalFormSchemaType> = async (data) => {
    try {
      globalLoaderStateService.sendMessage()
      await addSong(data?.title, data?.author, data.image[0] as File, data.song[0] as File)
      toastUtils.success('Song added')
      refresh()
    } catch (error) {
      toastUtils.error(`Something went wrong : ${error as string}`)
    } finally {
      globalLoaderStateService.sendMessage()
    }
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
                error={formState.errors?.title}
            />
            <TextField
                label='author'
                placeHolder='Bad bunny, blessed, maluma ...'
                registerData={register('author')}
                error={formState.errors?.author}
            />
            <TextField
                label='Cover file'
                type='file'
                accept='image/*'
                registerData={register('image')}
                error={formState.errors.image as unknown as string}
            />
            <TextField
                label='Song file'
                type='file'
                accept='audio/mp3'
                registerData={register('song')}
                error={formState.errors.song as unknown as string}
            />
            <Button
                className={styles.libraryModalForm__button}
                variant='solid'
                rounded='medium'
                color='green'
                disabled={formState.isSubmitting}
            >
                Send
            </Button>
        </form>
  )
}
