function getGroups(req, res) {
    console.log(req.session)
    req.app.get('db').getGroups(req.session.passport.user.user_id).then((response) => {
        console.log(response,'groups')
        res.status(200).send(response)
    }).catch(err => console.log('bad groups', err))
}

function createGroup(req, res) {
    console.log(req.session, req.body)

    req.app.get('db').groups
        .save({created_by: req.session.passport.user.user_id, group_name:req.body.groupName, group_image:req.body.groupImage, dm_image:req.session.passport.user.user_image})
        .then(response => {
            res.status(200).send(response)
        })
}




module.exports = {
    getGroups,
    createGroup
}