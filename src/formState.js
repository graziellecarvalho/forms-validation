import { create } from 'zustand'

const useFormStore = create((set) => ({
  form: {
    name: '',
    email: '',
    age: 0,
    phoneNumber: '',
    gender: '',
    type: '',
    date: '',
    time: '',
    days: []
  },
  tempType: '',
  handleTypeSelect: (type) => set(() => ({ tempType: type })),
  handleForm: (form) => set(() => ({ form: form }))
}))

export default useFormStore