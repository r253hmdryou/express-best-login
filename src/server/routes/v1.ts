import express from "express";
import {routing as routingUsers} from "./v1/users";

/**
 * routing function
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.use("/users", routingUsers());
}
