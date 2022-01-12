const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUserThought,
    deleteUser,
    deleteFriend
} = require('../controllers/user');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);


router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
router
    .route('/:userId/:thoughtId')
    .delete(deleteUserThought)

module.exports = router;