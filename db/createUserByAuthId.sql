INSERT INTO users (uu_id, username, user_image)
values ($1, $2, $3);

select * from users where uu_id = $1