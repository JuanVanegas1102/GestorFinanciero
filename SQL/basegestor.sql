/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     30/11/2023 11:52:23 p. m.                    */
/*==============================================================*/


alter table HISTORIALMOVIMIENTOS
   drop constraint FK_HISTORIA_CATEGORIZ_CATEGORI;

alter table HISTORIALMOVIMIENTOS
   drop constraint FK_HISTORIA_ESPECIFIC_TIPOMOVI;

drop table CATEGORIA cascade constraints;

drop index ESPECIFICA_FK;

drop index CATEGORIZA_FK;

drop table HISTORIALMOVIMIENTOS cascade constraints;

drop table TIPOMOVIMIENTO cascade constraints;

/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA 
(
   IDCATEGORIA          NUMBER(5)            not null,
   NOMBRECATEGORIA      VARCHAR2(100)        not null,
   constraint PK_CATEGORIA primary key (IDCATEGORIA)
);

/*==============================================================*/
/* Table: HISTORIALMOVIMIENTOS                                  */
/*==============================================================*/
create table HISTORIALMOVIMIENTOS 
(
   IDMOVIMIENTO         NUMBER(5)            not null,
   IDCATEGORIA          NUMBER(5)            not null,
   TIPOMOVIMIENTO       VARCHAR2(30)         not null,
   IDMOVIMIENTOCATEGORIA NUMBER(5)            not null,
   VALORMOVIMIENTO      NUMBER(10)           not null,
   VALORFINAL           NUMBER(10)           not null,
   FECHAMOVIMIENTO      DATE                 not null,
   constraint PK_HISTORIALMOVIMIENTOS primary key (IDMOVIMIENTO)
);

/*==============================================================*/
/* Index: CATEGORIZA_FK                                         */
/*==============================================================*/
create index CATEGORIZA_FK on HISTORIALMOVIMIENTOS (
   IDCATEGORIA ASC
);

/*==============================================================*/
/* Index: ESPECIFICA_FK                                         */
/*==============================================================*/
create index ESPECIFICA_FK on HISTORIALMOVIMIENTOS (
   TIPOMOVIMIENTO ASC
);

/*==============================================================*/
/* Table: TIPOMOVIMIENTO                                        */
/*==============================================================*/
create table TIPOMOVIMIENTO 
(
   TIPOMOVIMIENTO       VARCHAR2(30)         not null,
   constraint PK_TIPOMOVIMIENTO primary key (TIPOMOVIMIENTO)
);

alter table HISTORIALMOVIMIENTOS
   add constraint FK_HISTORIA_CATEGORIZ_CATEGORI foreign key (IDCATEGORIA)
      references CATEGORIA (IDCATEGORIA);

alter table HISTORIALMOVIMIENTOS
   add constraint FK_HISTORIA_ESPECIFIC_TIPOMOVI foreign key (TIPOMOVIMIENTO)
      references TIPOMOVIMIENTO (TIPOMOVIMIENTO);

