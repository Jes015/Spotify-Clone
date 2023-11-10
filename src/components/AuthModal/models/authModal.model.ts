export const AuthModalTypes = {
  sign_in: 'sign_in',
  sign_up: 'sign_up'
} as const

export type ModalType = typeof AuthModalTypes[keyof typeof AuthModalTypes]