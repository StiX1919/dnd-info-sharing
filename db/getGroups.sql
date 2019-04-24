select * from group_user 
join groups on group_user.group_id = groups.group_id 
where group_user.player_id = $1