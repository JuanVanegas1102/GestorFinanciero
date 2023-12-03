from datetime import datetime
import oracledb
import random
import sqlite3
import json

class ConexionBD:

    user = "AdminGestor"
    password = "AdminGestor"
    port = 1521
    seleccionCategoria = str
    seleccionCategoriaEliminar = str
    seleccionCategoriaTransferir = str
    
      
    def consultarCategoria():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("select idcategoria, nombrecategoria from categoria where idcategoria NOT LIKE '0'")
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result
    
    def guardarCategoriaSeleccionada(seleccionCategoria):
        seleccionCategoria = seleccionCategoria[-1:]
        ConexionBD.seleccionCategoria = seleccionCategoria
        print(seleccionCategoria)
        return seleccionCategoria
    
    def EliminarCategoriaSeleccionada(seleccionCategoria):
        seleccionCategoria = seleccionCategoria[-1:]
        ConexionBD.seleccionCategoriaEliminar = seleccionCategoria
        print(seleccionCategoria)
        return seleccionCategoria
    
    def guardarCategoriaTransferir(seleccionCategoria):
        seleccionCategoria = seleccionCategoria[-1:]
        ConexionBD.seleccionCategoriaTransferir = seleccionCategoria
        print(seleccionCategoria)
        return seleccionCategoria

    def consultarHistorialCategoria():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("select m.idmovimientocategoria, t.tipomovimiento, m.valormovimiento, m.valorfinal, TO_CHAR(m.fechamovimiento, 'yyyy-MM-dd') from historialmovimientos m, tipomovimiento t where t.tipomovimiento = m.tipomovimiento and m.idcategoria="+str(ConexionBD.seleccionCategoria)+" ORDER BY idmovimientocategoria")
        result = cursor.fetchall()
        connection.close()
        print(result)
        return result
    
    def maximoMovimiento():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("SELECT MAX(idmovimiento)+1 FROM historialmovimientos")
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result[0][0]
    
    def maximaCategoria():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("SELECT MAX(idcategoria)+1 FROM categoria")
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result[0][0]
    
    def maximoMovimientoCategoria():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(idmovimientocategoria)+1 FROM historialmovimientos where idcategoria = "+str(ConexionBD.seleccionCategoria))
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result[0][0]
    
    def maximoMovimientoCategoriaTransferir():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(idmovimientocategoria)+1 FROM historialmovimientos where idcategoria = "+str(ConexionBD.seleccionCategoriaTransferir))
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result[0][0]
    
    def maximoMovimientoCategoriaEliminar():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(idmovimientocategoria)+1 FROM historialmovimientos where idcategoria = "+str(ConexionBD.seleccionCategoriaEliminar))
        result = cursor.fetchall()
        print(result)
        connection.close()
        return result[0][0]
    
    def consultarValorFinal():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("Select valorfinal from (select valorfinal from historialmovimientos where idcategoria="+str(ConexionBD.seleccionCategoria)+"order by idmovimiento desc ) where rownum = 1")
        result = cursor.fetchall()
        connection.close()
        return result[0][0]
    
    def consultarValorFinalTransferir():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("Select valorfinal from (select valorfinal from historialmovimientos where idcategoria="+str(ConexionBD.seleccionCategoriaTransferir)+"order by idmovimiento desc ) where rownum = 1")
        result = cursor.fetchall()
        connection.close()
        return result[0][0]
    
    def consultarUltimaFecha():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("Select TO_CHAR(fechamovimiento, 'yyyy-MM-dd') from (select fechamovimiento from historialmovimientos where idcategoria="+str(ConexionBD.seleccionCategoria)+"order by idmovimiento desc ) where rownum = 1")
        result = cursor.fetchall()
        connection.close()
        print(result)
        if result == []:
            return 0
        else:
            return result[0][0]
    
    def ingresarDinero(valor,fecha):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        ConexionBD.maximoMovimientoCategoria()
        if str(ConexionBD.consultarUltimaFecha()) > fecha:
            return False
        else:
            if ConexionBD.maximoMovimientoCategoria()== 1:
                query = "INSERT INTO historialmovimientos values('"+str(ConexionBD.maximoMovimiento())+"','"+str(ConexionBD.seleccionCategoria)+"','Ingreso','"+str(ConexionBD.maximoMovimientoCategoria())+"','"+str(valor)+"','"+str(valor)+"',to_date('"+fecha+"','yyyy/mm/dd'))"
                result = cursor.execute(query)
            else:
                valorfinal = ConexionBD.consultarValorFinal() + valor
                query = "INSERT INTO historialmovimientos values('"+str(ConexionBD.maximoMovimiento())+"','"+str(ConexionBD.seleccionCategoria)+"','Ingreso','"+str(ConexionBD.maximoMovimientoCategoria())+"','"+str(valor)+"','"+str(valorfinal)+"',to_date('"+fecha+"','yyyy/mm/dd'))"
                result = cursor.execute(query)
        connection.commit()
        connection.close()
        return True
    
    def ingresarDineroTransferido(valor,fecha):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        ConexionBD.maximoMovimientoCategoria()
        if ConexionBD.retirarDinero(valor,fecha) == False:
            return False
        else:
            if str(ConexionBD.consultarUltimaFecha()) > fecha:
                return False
            else:
                if ConexionBD.maximoMovimientoCategoriaTransferir()== 1:
                    query = "INSERT INTO historialmovimientos values('"+str(ConexionBD.maximoMovimiento())+"','"+str(ConexionBD.seleccionCategoriaTransferir)+"','Ingreso','"+str(ConexionBD.maximoMovimientoCategoriaTransferir())+"','"+str(valor)+"','"+str(valor)+"',to_date('"+fecha+"','yyyy/mm/dd'))"
                    result = cursor.execute(query)
                else:
                    valorfinal = ConexionBD.consultarValorFinalTransferir() + valor
                    query = "INSERT INTO historialmovimientos values('"+str(ConexionBD.maximoMovimiento())+"','"+str(ConexionBD.seleccionCategoriaTransferir)+"','Ingreso','"+str(ConexionBD.maximoMovimientoCategoriaTransferir())+"','"+str(valor)+"','"+str(valorfinal)+"',to_date('"+fecha+"','yyyy/mm/dd'))"
                    result = cursor.execute(query)
            connection.commit()
            connection.close()
            return True
    
    def retirarDinero(valor,fecha):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        ConexionBD.maximoMovimientoCategoria()
        if str(ConexionBD.consultarUltimaFecha()) > fecha:
            return False
        else:
            if ConexionBD.consultarValorFinal()-valor < 0:
                return False
            else:
                valorfinal = ConexionBD.consultarValorFinal() - valor
                query = "INSERT INTO historialmovimientos values('"+str(ConexionBD.maximoMovimiento())+"','"+str(ConexionBD.seleccionCategoria)+"','Egreso','"+str(ConexionBD.maximoMovimientoCategoria())+"','"+str(valor)+"','"+str(valorfinal)+"',to_date('"+fecha+"','yyyy/mm/dd'))"
                result = cursor.execute(query)
        connection.commit()
        connection.close()
        return True
    
    def limpiarHistorial(dato):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        query = "DELETE FROM historialmovimientos WHERE idcategoria ="+ConexionBD.seleccionCategoria
        result = cursor.execute(query)
        connection.commit()
        connection.close()
        return result
    
    def agregarCategoria(nombreCategoria):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        query = "INSERT INTO categoria values('"+str(ConexionBD.maximaCategoria())+"','"+nombreCategoria+"')"
        result = cursor.execute(query)
        connection.commit()
        connection.close()
        return result
    
    def consultarDatosGraficas():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("select TO_CHAR(m.fechamovimiento, 'yyyy-MM-dd'), m.valorfinal from historialmovimientos m, tipomovimiento t where t.tipomovimiento = m.tipomovimiento and m.idcategoria="+str(ConexionBD.seleccionCategoria)+" ORDER BY idmovimientocategoria")
        result = cursor.fetchall()
        connection.close()
        print(result)
        return result
    
    def eliminarCategoria(dato):
        oracledb.init_oracle_client()
        connection = oracledb.connect(user=ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        if ConexionBD.maximoMovimientoCategoriaEliminar() > 1:
            return False
        else:
            query = "DELETE FROM categoria WHERE idcategoria ="+str(ConexionBD.seleccionCategoriaEliminar)
            result = cursor.execute(query)
        connection.commit()
        connection.close()
        return True
    
    def consultarDatosPastel():
        oracledb.init_oracle_client()
        connection = oracledb.connect(user= ConexionBD.user, password=ConexionBD.password,host="localhost", port = ConexionBD.port, service_name="xepdb1")
        cursor = connection.cursor()
        cursor.execute("select c.nombrecategoria, MAX(m.idmovimientocategoria) from historialmovimientos m, categoria c where c.idcategoria = m.idcategoria GROUP BY c.nombrecategoria")
        result = cursor.fetchall()
        connection.close()
        print(result)
        return result