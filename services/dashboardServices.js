import { HttpError } from '../helpers/Error/HttpError.js';
import { NewDashBoard } from '../models/dashboard.js';

const createDashboard = async (body, user) => {
  const { _id: owner } = user;

  await NewDashBoard.create({
    ...body,
    owner,
  });

  const boards = await NewDashBoard.find({ owner });

  if (!boards) {
    return [];
  } else {
    const modifiedBoards = boards.map(board => ({
      id: board._id,
      boardTitle: board.boardTitle,
      icon: board.icon,
      bgImage: board.bgImage,
    }));

    return modifiedBoards;
  }
};

const getAllBoards = async userId => {
  const { _id: owner } = userId;

  const boards = await NewDashBoard.find({ owner });

  if (!boards) {
    return [];
  } else {
    const modifiedBoards = boards.map(board => ({
      id: board._id,
      boardTitle: board.boardTitle,
      icon: board.icon,
      bgImage: board.bgImage,
    }));

    return modifiedBoards;
  }
};

const getBoardById = async boardId => {
  const result = await NewDashBoard.findById(
    boardId,
    '-createdAt -updatedAt -owner -__v',
  );

  if (!result) {
    throw HttpError(404, `${boardId} was not found`);
  } else {
    const board = {
      id: result._id,
      boardTitle: result.boardTitle,
      icon: result.icon,
      bgImage: result.bgImage,
    };

    return board;
  }
};

const dashboardServices = {
  createDashboard,
  getAllBoards,
  getBoardById,
};

export default dashboardServices;
