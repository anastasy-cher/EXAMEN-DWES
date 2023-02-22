create database fotos;
use fotos;

create table fotos(
    id int auto_increment primary key not null,
    descripcion varchar(250) not null,
    titulo varchar(250) not null,
    fecha timestamp not null default current_timestamp,
    likes int,
    dislikes int
)