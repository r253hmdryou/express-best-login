/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * ID
 * @format uuid
 * @example d290f1ee-6c54-4b01-90e6-d701748f0851
 */
export type Id = string;

/**
 * Email
 * @format email
 * @example example@example.com
 */
export type Email = string;

export interface User {
  /** ID */
  id: Id;

  /** Email */
  email: Email;
}

export interface ConfirmEmailToCreateUserRequest {
  /**
   * @format email
   * @example example@example.com
   */
  email: string;
}

export interface SignUpRequest {
  /** @example password */
  password: string;
}

export namespace Hello {
  /**
   * @description Get Hello World
   * @name GetHelloWorld
   * @summary Get Hello World
   * @request GET:/hello
   * @secure
   * @response `200` `Id` Successful operation
   */
  export namespace GetHelloWorld {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Id;
  }
}

export namespace V1 {
  /**
   * @description Confirm email to Create User * Api sends an email to the user with a link to confirm the email address. * if already registerd, successful response is returned too.
   * @name ConfirmEmailToCreateUser
   * @summary Confirm email to Create User
   * @request POST:/v1/users
   * @secure
   * @response `201` `void` Always returns success if the format of the emaill address is correct
   * @response `400` `any`
   */
  export namespace ConfirmEmailToCreateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConfirmEmailToCreateUserRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Sign up
   * @name SignUp
   * @summary Sign up
   * @request POST:/v1/users/{userId}/signup
   * @secure
   * @response `201` `User` successful operation
   * @response `400` `any`
   */
  export namespace SignUp {
    export type RequestParams = { userId: Id };
    export type RequestQuery = {};
    export type RequestBody = SignUpRequest;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }
}
