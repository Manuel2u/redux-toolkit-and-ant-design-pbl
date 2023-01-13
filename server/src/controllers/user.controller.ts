import { Request, Response } from "express";
import User  from "../models/user.model";
import { signUpUser, loginUser,getUser , logout} from "../utils/index";

const SIGN_UP = async (req: Request, res: Response) => {

    const {username ,firstName, lastName, email, password} = req.body;

    if (!username || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    signUpUser(req.body, (error: any, data: any) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(data);
        }
    }
    );
};

const LOGIN = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    loginUser(req.body, (error: any, data: any) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(data);
        }
    }
    );
}

const GET_USER = async (req: Request, res: Response) => {
    getUser(req.params.id, (error: any, data: any) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(data);
        }
    }
    );
}

const LOGOUT = async (req: Request, res: Response) => {
    logout(req.params.id, (error: any, data: any) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(data);
        }
    }
    );
}

export { SIGN_UP, LOGIN, GET_USER, LOGOUT };