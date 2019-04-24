function getGroups(req, res) {
    console.log(req.session)
    req.app.get('db').getGroups(req.session.passport.user.user_id).then((response) => {
        console.log(response,'groups')
        res.status(200).send(response)
    }).catch(err => console.log('bad groups', err))
}

function createGroup(req, res) {
    console.log('session', req.session)
    const db = req.app.get('db')

    db.groups
        .insert({created_by: req.session.passport.user.user_id, group_name:req.body.groupName, group_image:req.body.groupImage}).then(groupRes => {
            console.log('g res', groupRes)
            db.group_user.save({is_owner: true, group_id: groupRes.group_id, player_id: req.session.passport.user.user_id}).then(gUserRes => {
                console.log('user res', gUserRes)
            }).catch(err => console.log('user err', err))
            res.status(200).send(groupRes)
        }).catch(err => console.log('group err', err))
        
}




module.exports = {
    getGroups,
    createGroup
}