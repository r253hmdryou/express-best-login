import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";

import { routing } from "routes";
import { store } from "common/repository";
import { config } from "libs/config";

export default createApp();

/**
 * createApplication function
 * @returns express application
 */
function createApp(): express.Express {

	return express()
		.set("strict routing", true)
		.set("json spaces", 2)
		.set("trust proxy", 1)
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
			origin: "http://localhost:4000",
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
			...config.session,
			store: store,
		}))

		.use(routing());
}
