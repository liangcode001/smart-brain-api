const handleProfile = (req, res, db) => {
    const {id} = req.params;
    db('users').select('*').where({id})
    .then(users =>{
        if(users.length){
            res.json(users)
        }else{
            res.status(400).json('not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

export {
    handleProfile,
}