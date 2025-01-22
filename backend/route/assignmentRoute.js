const express = require('express');
const router = express.Router();


const {
  createAssignment,
} = require('../controller/assignmentController');


router.post('/', createAssignment);

module.exports = router;
