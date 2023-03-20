import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  Form,
  FormError,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  Label,
  FieldError,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

type FormValues = {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('thank you for your submission')
    },
  })

  const mySubmitFunction: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form config={{ mode: 'onBlur' }} onSubmit={mySubmitFunction}>
        <FormError error={error} wrapperClassName={'form-error'} />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          errorClassName={'error'}
          name="name"
          validation={{ required: true }}
        ></TextField>
        <FieldError name="name" className="error"></FieldError>

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          errorClassName={'error'}
          name="email"
          validation={{
            required: true,
          }}
        ></TextField>
        <FieldError name="email" className="error"></FieldError>

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          errorClassName={'error'}
          name="message"
          validation={{ required: true }}
        ></TextAreaField>
        <FieldError name="message" className="error"></FieldError>

        <Submit disabled={loading}>Submit</Submit>
      </Form>
    </>
  )
}

export default ContactPage
