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
 * @example 12b73ca6-972d-456c-925a-a6288b1f54ba
 */
export type Id = string;

/**
 * URL
 * @example https://example.com
 */
export type Url = string;

/**
 * Email address
 * @example example@example.com
 */
export type Email = string | null;

export type UserCore = object;

export type User = UserCore & { id: Id; email: Email };

export type RequestCreateUser = UserCore & { loginId: string; password: string };

export type RequestUpdateUser = UserCore & { email: Email };

export namespace V1 {
  /**
   * @description Get all users
   * @tags user
   * @name GetUsers
   * @summary Get all users
   * @request GET:/v1/users
   * @secure
   * @response `200` `{ count: number, users: (User)[] }` Successful operation
   */
  export namespace GetUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count: number; users: User[] };
  }
  /**
   * @description Create a user
   * @tags user
   * @name CreateUser
   * @summary Create a user
   * @request POST:/v1/users
   * @secure
   * @response `201` `User` Successful operation
   * @response `400` `any`
   * @response `409` `any`
   */
  export namespace CreateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RequestCreateUser;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }
  /**
   * @description Get user
   * @tags user
   * @name GetUser
   * @summary Get user
   * @request GET:/v1/users/:userId
   * @secure
   * @response `200` `User` Successful operation
   * @response `404` `any`
   */
  export namespace GetUser {
    export type RequestParams = { userId: Id };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }
  /**
   * @description Update user
   * @tags user
   * @name UpdateUser
   * @summary Update user
   * @request PUT:/v1/users/:userId
   * @secure
   * @response `200` `User` Successful operation
   * @response `400` `any`
   * @response `404` `any`
   * @response `409` `any`
   */
  export namespace UpdateUser {
    export type RequestParams = { userId: Id };
    export type RequestQuery = {};
    export type RequestBody = RequestUpdateUser;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }
}
