import type {
  Actions,
  RequestEvent,
  ActionFailure,
  Redirect
} from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { registerFormData } from '../../types/form';
import {
  dbConn,
  returnURLsList,
  registerUser,
  registerFormToUserWithoutId,
  returnEmailsList
} from '../../dbUtils';
import { checkPassword } from '../../passwordCheck';

export const actions: Actions = {
  signup: async ({
    request
  }: RequestEvent): Promise<
    registerFormData | ActionFailure<registerFormData> | Redirect
  > => {
    const signupFormData = await request.formData();
    const urlChoice = signupFormData.get('userUrl') ?? '';
    const firstName = signupFormData.get('firstName') ?? '';
    const lastName = signupFormData.get('lastName') ?? '';
    const email = signupFormData.get('email') ?? '';
    const password = signupFormData.get('password') ?? '';

    let SignUpResponse: registerFormData = {
      emailUsed: false,
      weakPassword: false,
      error: false,
      success: false,
      urlTaken: false,
      message: '',
      firstName,
      lastName,
      email,
      urlChoice,
      password
    };

    const isPassStrong = checkPassword(password.toString());
    if (!isPassStrong) {
      SignUpResponse.weakPassword = true;
      SignUpResponse.error = true;
      SignUpResponse.message = 'Password does not meet requirements.';
      return fail(400, SignUpResponse);
    }

    let URLList: string[] = [];

    const collection = await dbConn();

    try {
      URLList = await returnURLsList(collection);
    } catch (e: any) {
      SignUpResponse.error = true;
      SignUpResponse.message = e.message ?? 'Error Connecting to DB';
      return fail(400, SignUpResponse);
    }

    if (URLList.includes(urlChoice.toString())) {
      SignUpResponse.error = true;
      SignUpResponse.message = 'URL already in use!';
      SignUpResponse.urlTaken = true;
      return fail(400, SignUpResponse);
    }

    let emailList: string[] = [];

    try {
      emailList = await returnEmailsList(collection);
      if (emailList.includes(email.toString())) {
        SignUpResponse.error = true;
        SignUpResponse.message = 'Email already in use!';
        SignUpResponse.emailUsed = true;
        return fail(400, SignUpResponse);
      }
    } catch (e: any) {
      SignUpResponse.error = true;
      SignUpResponse.message = e.message ?? 'Error Connecting to DB';
      return fail(500, SignUpResponse);
    }

    const userToInsert = await registerFormToUserWithoutId(SignUpResponse);
    const resultOfInsert = await registerUser(collection, userToInsert);
    if (resultOfInsert.acknowledged && resultOfInsert.insertedId)
      throw redirect(303, `/${userToInsert.URL}`);
    SignUpResponse.error = true;
    SignUpResponse.message = 'Error registering user';
    return fail(503, SignUpResponse);
  }
};
