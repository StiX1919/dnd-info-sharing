INSERT INTO users (uu_id, username)
values ($1, $2);

select * from users where uu_id = $1