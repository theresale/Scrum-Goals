DROP TABLE IF EXISTS todo_list;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS team_members

CREATE TABLE team (
	id 			serial PRIMARY KEY,
	username 	text,
	password	text
);

ALTER TABLE team OWNER TO team_members;

CREATE TABLE team_members (
	id 			serial PRIMARY KEY,
	team_member text[],
	team_id		integer

		CONTRAINT fk_team_members_to_team
		FOREIGN KEY (team_id)
		REFERENCES team (id)
);

CREATE TABLE todo_list (
	id 			serial PRIMARY KEY,
	item		text[],
	team_id     integer,

		CONSTRAINT fk_grocery_list_to_profile
		FOREIGN KEY (profile_id)
		REFERENCES profile (id)  
);

ALTER TABLE grocery_list OWNER TO shopping_server;