function getTables(req, res) {
    console.log(req.session)
    req.app.get('db').getTables(req.session.passport.user.user_id).then((response) => {
        console.log(response,'tables')
        res.status(200).send(response)
    }).catch(err => console.log('bad Tables', err))
}




module.exports = {
    getTables
}