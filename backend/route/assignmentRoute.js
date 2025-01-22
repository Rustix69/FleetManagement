const express = require('express');
const router = express.Router();

const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignmentStatus,
  deleteAssignment
} = require('../controller/assignmentController');


router.post('/', createAssignment);


router.get('/', getAllAssignments);


router.get('/:id', getAssignmentById);


router.patch('/:id/status', updateAssignmentStatus);


router.delete('/:id', deleteAssignment);

module.exports = router;