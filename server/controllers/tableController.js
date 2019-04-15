function getTables(req, res) {
    console.log(req.session)
    req.app.get('db').getTables(req.session.passport.user.uu_id).then((response) => {
        console.log(response)
        res.status(200).send(response[0])
    })
}




module.exports = {
    getTables
}