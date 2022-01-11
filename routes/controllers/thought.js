const {Thought, User}= require('../../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err =>{
            console.log(err)
            res.sendStatus(400);
        });
    },

    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .then(thoughtData =>{
            if(!thoughtData){
                res.status(404).json({message:"No Thought Found With This Id"});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.Status(400).json(err)); 
    },

    addReaction({params, body},res){
        Thought.findByIdAndUpdate(
            {_id:params.thoughtId},
            {$push:{reactions:body}},
            {new: true}
            )
            .then(thoughtData =>{
                if(!thoughtData){
                    res.status(404).json({ message:'No Thought Found With This Id'}); return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    createThought({params, body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id:params.userId},
                {$push:{thoughts:_id}},
                {new: true}
            );
        })
        .then(thoughtData =>{
            if (!thoughtData){
                res.status(404).json({message: 'No User Found with this Id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err =>res.json(err));
    },

    updateThought({params,body}, res){
        Thought.findOneAndUpdate( {_id: params.id}, body,{new: true,
        runValidators:true})
        .then(thoughtData =>{
            if(!thoughtData){
                res.sendStatus(404)({ message:'No Thought Found With This Id'})
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.Status(400).json(err));
    },

    deleteThought({params}, res){
        Thought.findOneAndDelete({ _id:params.id})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    },
    removeReaction({params,body}, res){
        Thought.findByIdAndUpdate(
            {_id:params.thoughtId},
            {$pull:{reactions: body}},
            {new:true}
        )
        .then(removeReact => res.json(removeReact))
        .catch(err => res.json(err));
    }

}


module.exports = thoughtController;