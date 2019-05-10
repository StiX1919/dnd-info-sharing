function getGroups(req, res) {
    // console.log(req.session)
    req.app.get('db').getGroups(req.session.passport.user.user_id).then((response) => {
        // console.log(response,'groups')
        let newGroups = response.map(group => {
            let rooms = group.rooms.map((room, i) => {
                return {name: group.rooms[i], id: group.room_ids[i], created_by: group.creator[i]}
            })
            return {
                ...group,
                rooms
            }
        })
        // console.log(newGroups)
        res.status(200).send(newGroups)
    }).catch(err => console.log('bad groups', err))
}

function createGroup(req, res) {
    // console.log('session', req.session)
    const db = req.app.get('db')

    db.groups
        .insert({created_by: req.session.passport.user.user_id, group_name:req.body.groupName, group_image:req.body.groupImage}).then(groupRes => {
            console.log('g res', groupRes)
            db.group_user.save({is_owner: true, group_id: groupRes.group_id, player_id: req.session.passport.user.user_id}).then(gUserRes => {
                // console.log('user res', gUserRes)
                db.text_rooms.save({created_by: req.session.passport.user.user_id, group_id: groupRes.group_id, txt_room_name: 'general'}).then( roomRes => {
                    res.status(200).send(groupRes)
                })
            }).catch(err => console.log('user err', err))
        }).catch(err => console.log('group err', err))
        
}
async function getGroupRooms(req, res) {
    // console.log(req.params)
    const db = req.app.get('db')

    const rooms = await db.query(`select * from text_rooms where group_id = ${req.params.id}`)

    res.status(200).send(rooms)
}


async function postMessage(req, res) {
    const {message, roomID, time} = req.body

    const db = req.app.get('db')

    const messages = await db.messages.insert({created_by: req.session.passport.user.user_id, message: message, room_id: roomID, time_stamp: time})
    // console.log(messages)
}

async function getMessages( req, res) {
    const {id} = req.params
    const db = req.app.get('db')

    const messages = await db.messages.where("room_id = $1", [id])
    res.status(200).send(messages)
    // console.log('all messages', messages)
}


module.exports = {
    getGroups,
    createGroup,
    getGroupRooms,
    postMessage,
    getMessages
}