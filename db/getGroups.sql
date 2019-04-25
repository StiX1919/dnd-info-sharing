select *,
(select array(select txt_room_name from text_rooms where group_id = gr.group_id order by gr.group_id)) as rooms,
(select array(select txt_room_id from text_rooms where group_id = gr.group_id order by gr.group_id)) as room_ids,
(select array(select created_by from text_rooms where group_id = gr.group_id order by gr.group_id)) as creator

 from group_user gu
 join groups gr on gu.group_id = gr.group_id
 where gu.player_id = 1


-- select 
-- *,
-- 
-- array_agg(tr.txt_room_id, txt_room_name, group_id, created_by) as list_item_id,
-- array_agg(li.list_item_name) as list_text,
-- array_agg(li.description) as description
-- from group_user gu
-- left join groups gr on gu.group_id = gr.group_id
-- join text_rooms tr on tr.group_id = gr.group_id
-- where group_user.player_id = $1