create schema zssncleanarch;

create table zssncleanarch.inventory(
    id serial,
    water integer not null default 0,
    food integer not null default 0,
    medication integer not null default 0,
    ammunition integer not null default 0, 
    primary key (id)
);

create table zssncleanarch.local(
    id serial,
    coordinates point not null,
    primary key (id)
);

create table if not exists zssncleanarch.survivor(
    id serial,
    name varchar(50) not null,
    age integer not null check(age > 0),
    sex char(1) not null check(sex = 'M' or sex = 'F'),
    infected boolean not null default false,
    inventory_id integer unique,
    local_id integer unique,
    foreign key (inventory_id) references zssncleanarch.inventory(id) on delete cascade,
    foreign key (local_id) references zssncleanarch.local(id) on delete cascade,
    primary key(id)
);
