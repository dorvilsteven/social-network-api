const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thought');

router
    .route('/')
    .get(getAllThought)
    
    
router
    .route('/:userId')
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;