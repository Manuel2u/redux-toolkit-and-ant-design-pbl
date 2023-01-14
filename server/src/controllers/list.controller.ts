import { Request, Response } from "express";
import { createList, deleteList, getList, getLists } from "../utils/index";

const CREATE_LIST = async (req: Request, res: Response) => {
  const { name, lists } = req.body;

  if (!name || !lists) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  createList(req.body, (error: any, data: any) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(data);
    }
  });
};

const GET_LISTS = async (req: Request, res: Response) => {
  getLists(req.params.id, (error: any, data: any) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(data);
    }
  });
};

const GET_LIST = async (req: Request, res: Response) => {
  getList(req.params.id, (error: any, data: any) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(data);
    }
  });
};

const DELETE_LIST = async (req: Request, res: Response) => {
  deleteList(req.params.id, (error: any, data: any) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(data);
    }
  });
};

export { CREATE_LIST, GET_LISTS, GET_LIST, DELETE_LIST };
