import { Controler } from './../protocols/controller'
import { httpResponse, httpRequest } from './../protocols/http'
import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/helper-http'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamsError } from '../errors/invalidParamsError'

export class SignUpController implements Controler {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamsError('email'))
    }
  }
}
