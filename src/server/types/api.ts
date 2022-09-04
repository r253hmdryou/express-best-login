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

/**
 * * Must be at least 8 characters long
 * Must be at most 200 characters long
 * @example password
 */
export type Password = string;

export interface UserForMe {
  /** ID */
  id: Id;

  /** Email */
  email: Email;
}

export interface LoginRequest {
  /** Email */
  email: Email;

  /**
   * * Must be at least 8 characters long
   * * Must be at most 200 characters long
   *
   */
  password: Password;
}

export interface ConfirmEmailToCreateUserRequest {
  /** Email */
  email: Email;
}

export interface SignUpRequest {
  /**
   * * Must be at least 8 characters long
   * * Must be at most 200 characters long
   *
   */
  password: Password;
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
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = Id;
  }
}

export namespace Login {
  /**
   * @description Login
   * @tags authentication
   * @name Login
   * @summary Login
   * @request POST:/login
   * @secure
   * @response `201` `UserForMe` Successful operation
   * @response `400` `any`
   * @response `401` `any`
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequest;
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = UserForMe;
  }
}

export namespace Logout {
  /**
   * @description disable cookie to logout
   * @tags authentication
   * @name Logout
   * @summary Logout
   * @request POST:/logout
   * @secure
   * @response `201` `void` Successful operation
   * @response `401` `any`
   */
  export namespace Logout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = void;
  }
}

export namespace Users {
  /**
   * @description Confirm email to Create User * Api sends an email to the user with a link to confirm the email address. * if already registerd, successful response is returned too.
   * @tags users
   * @name ConfirmEmailToCreateUser
   * @summary Confirm email to Create User
   * @request POST:/users
   * @secure
   * @response `201` `void` Always returns success if the format of the emaill address is correct
   * @response `400` `any`
   */
  export namespace ConfirmEmailToCreateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConfirmEmailToCreateUserRequest;
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = void;
  }
  /**
   * @description Get my user
   * @tags users
   * @name GetMyUser
   * @summary Get my user
   * @request GET:/users/me
   * @secure
   * @response `200` `UserForMe` Successful operation
   * @response `401` `any`
   */
  export namespace GetMyUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = UserForMe;
  }
  /**
   * @description Sign up
   * @tags users
   * @name SignUp
   * @summary Sign up
   * @request POST:/users/{userId}
   * @secure
   * @response `201` `UserForMe` successful operation
   * @response `400` `any`
   */
  export namespace SignUp {
    export type RequestParams = { userId: Id };
    export type RequestQuery = {};
    export type RequestBody = SignUpRequest;
    export type RequestHeaders = { "X-Requested-With": string };
    export type ResponseBody = UserForMe;
  }
}
