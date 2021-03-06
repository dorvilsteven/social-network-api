const {User, Thought} =  require('../../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
        .select('-__v')
        .sort({_id:-1})
        .then(userData => res.json(userData))
        .catch(err =>{
            console.log(err);
            res.status(400);
        });
    },
    getUserById({params}, res){
        User.findOne(
            {_id: params.id}
            )
        .populate({
            path:'friends',
            select:'-__v'
        })
        .populate({
            path: 'thoughts'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err =>{
            console.log(err);
            res.status(400);
        });
    },
    createUser({body}, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.json(err));
    },
    addFriend({params}, res){
        User.findByIdAndUpdate(
            {_id:params.userId},
            {$addToSet:{friends:params.friendsId}},
            { new: true }).then(userData =>{
            if (!userData){
                res.status(404).json({message: 'No User Found with this Id'});
                return;
            }
            res.json(userData);
        })
        .catch(err =>res.json(err));
        
     },
     deleteFriend({params}, res){
         User.findByIdAndUpdate(
             {_id:params.userId},
             {$pull:{friends:params.friendsId}},
             {new:true}
         )
         .then(userData =>res.json(userData))
         .catch(err =>res.json(err));
     },
    updateUser({params,body}, res){
        User.findByIdAndUpdate( {_id: params.id}, body,{new: true, runValidators: true})
        .then(userData =>{
            if (!userData){
                res.sendStatus(404).json({ message:'No User Found With This Id.'})
                return;
            }
            res.json(userData);
        })
        .catch(err => res.Status(400).json(err));
    },
    deleteUserThought({ params}, res){
        User.findByIdAndDelete(
            {_id:params.userId}
        ).then(deletedUser =>{
            if(!deletedUser){
                return res.status(404).json({message:'No User found With This Id'});
            }
            return Thought.findByIdAndDelete(
                {_id:params.thoughtId}
                
            );
        })
        .then(userData => {
            if(!userData){
                res.status(404).json({ message:'No Thought Found'});
                return;
            }
            res.json(userData+ {message:'You have deleted an User'});
        })
       .catch(err => res.json(err));   
    },
    deleteUser({params}, res){
       User.findOneAndDelete(
        {_id:params.id})
        .then(userData => {
            if(!userData){
                res.status(404).json({message:'Now User Found'});
                return;
            }
            Thought.deleteMany(
                {username: userData.username } ,
                { userId:userData.userId }
            )
        })
        .then(userData => res.json(userData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;