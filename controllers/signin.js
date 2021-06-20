const handleSignin = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        console.log(data);
        let isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(isValid);
        if(isValid){
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user =>{

                res.json(user[0]);
            })
            .catch(err=>res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong credentials');
        }
        
        console.log(data);

    }).catch(err=>res.status(400).json('unable to signin'))
}

export {
    handleSignin,
}