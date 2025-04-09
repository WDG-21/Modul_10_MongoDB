import User from '../models/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getAllUsers = async (req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const book = await User.findById(id).lean();
  if (!book) throw new ErrorResponse('Book not found', 404);
  res.json({ data: book });
};

const createUser = async (req, res) => {
  const book = await User.create(req.body);
  res.status(201).json({ message: 'Book created successfully', data: book });
};

const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!user) throw new ErrorResponse('user not found', 404);
  res.json({ message: 'user updated successfully', data: user });
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse('user not found', 404);
  res.json({ message: 'user deleted successfully', data: user });
};

export { getUserByID, getAllUsers, createUser, updateUserByID, deleteUserByID };
