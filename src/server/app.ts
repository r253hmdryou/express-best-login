import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { routing } from "routes";

export default createApp();

/**
 * createApplication function
 * @returns express application
 */
function createApp(): express.Express {
	return express()
		.set("strict routing", true)
		.set("json spaces", 2)
		.use(helmet({
			contentSecurityPolicy: false,
			hidePoweredBy: true,
			hsts: false,
			referrerPolicy: false,
			xssFilter: true,
		}))
		.use(express.json({strict: true}))
		.use(express.urlencoded({extended: true}))
		.use(cors({
			origin: "*",
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
			exposedHeaders: ["Location"],
			maxAge: 86400,
		}))
		.use(compression({
			threshold: 0,
			level: 9,
			memLevel: 9,
		})) // nginx等のリバースプロキシーで圧縮する場合は不要

		.use(routing());
}
