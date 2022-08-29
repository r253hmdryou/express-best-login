import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";

import { routing } from "routes";
import { store } from "common/repository";

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
		}))
		.use(cookieParser())
		.use(session({
			secret: "secret",
			name: "eblaSession",
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 86400 * 1000,
				httpOnly: true,
				secure: false,
			},
			store: store,
		}))

		.use(routing());
}
