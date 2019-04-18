function getTables(req, res) {
    console.log(req.session)
    req.app.get('db').getTables(req.session.passport.user.user_id).then((response) => {
        console.log(response,'tables')
        res.status(200).send(response)
    }).catch(err => console.log('bad Tables', err))
}

function createTable(req, res) {
    console.log(req.session, req.body)

    req.app.get('db').tables
        .save({created_by: req.session.passport.user.username, table_name:req.body.tableName, table_image:req.body.tableImage, dm_image:req.session.passport.user.user_image})
        .then(response => {
            console.log(response)
        })
}




module.exports = {
    getTables,
    createTable
}