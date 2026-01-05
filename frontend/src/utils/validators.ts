import { helpers, required as req, email as em, maxLength as mx } from '@vuelidate/validators'

export const required = helpers.withMessage('Pole je povinné', req)
export const email = helpers.withMessage('Zadejte platný email', em)
export const maxLength = (n: number) => helpers.withMessage(`Maximálně ${n} znaků`, mx(n))
