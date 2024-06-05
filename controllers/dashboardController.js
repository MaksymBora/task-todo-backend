import { ctrlWrapper } from '../decorators/ctrlWrapper.js';
import dashboardServices from '../services/dashboardServices.js';

const createBoard = async (req, res) => {
  const newBoard = await dashboardServices.createDashboard(req.body, req.user);

  res.status(201).json(newBoard);
};

const fetchAllBoards = async (req, res) => {
  const allBoards = await dashboardServices.getAllBoards(req.user);

  res.status(200).json(allBoards);
};

const getBoardById = async (req, res) => {
  const board = await dashboardServices.getBoardById(req.params.boardId);

  res.status(200).json(board);
};

export default {
  createBoard: ctrlWrapper(createBoard),
  fetchAllBoards: ctrlWrapper(fetchAllBoards),
  getBoardById: ctrlWrapper(getBoardById),
};
