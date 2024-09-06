import { create } from 'zustand'
import { FormProps } from '../states/form'

interface FormPropsState {
  form: FormProps,
  tempType: string,
  handleTypeSelect: (type: string) => void,
  handleForm: (updatedForm: FormProps) => void
}

const defaultFormValues: FormProps = {
  name: '',
  email: '',
  age: '',
  phone: '',
  gender: '',
  type: '',
  date: '',
  time: '',
}

export const useFormStore = create<FormPropsState>((set) => ({
  form: defaultFormValues,
  tempType: '',
  handleTypeSelect: (type) => set(() => ({ tempType: type })),
  handleForm: (updatedForm) => set(() => ({ form: updatedForm }))
}))