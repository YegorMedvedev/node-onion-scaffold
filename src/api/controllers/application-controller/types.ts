import {Request, Response} from "express";

export type HttpMethodSync = (req: Request, res: Response) => Response;
