const express = require('express');
const router = express.Router();

const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignmentStatus,
  deleteAssignment
} = require('../controller/assignmentController');
const authenticateToken = require('../authMiddleware');


router.post('/',authenticateToken ,createAssignment);


router.get('/', getAllAssignments);


router.get('/:id', getAssignmentById);


router.patch('/:id/status',authenticateToken, updateAssignmentStatus);


router.delete('/:id',authenticateToken, deleteAssignment);

module.exports = router;