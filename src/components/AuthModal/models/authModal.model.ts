export const ModalTypes = {
  sign_in: 'sign_in',
  sign_up: 'sign_up'
} as const

export type ModalType = typeof ModalTypes[keyof typeof ModalTypes]