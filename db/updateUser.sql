update users
set username = $1, user_image = $2
where uu_id = $3

returning *