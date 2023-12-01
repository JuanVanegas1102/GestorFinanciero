-- Introducir tipos de movimientos existentes

insert into tipomovimiento values('0');
insert into tipomovimiento values('Ingreso');
insert into tipomovimiento values('Egreso');

-- Introducir tipos de movimientos existentes

insert into categoria values('0','-----');
insert into categoria values('1','Salario');
insert into categoria values('2','Honorarios');
insert into categoria values('3','Ventas');
insert into categoria values('4','Donaciones');
insert into categoria values('5','Alimentos');
insert into categoria values('6','Entretenimiento');
insert into categoria values('7','Transporte');
insert into categoria values('8','Mercado');

-- Introducir movimiento que inicia la base (0)

insert into historialmovimientos values('0','0','0','0','0','0', to_date('30/06/1001 06:00 PM', 'dd/mm/yyyy HH:MI AM'));


commit;