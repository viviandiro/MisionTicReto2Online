/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() 
{
    $.ajax( 
       {
            url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',

           
            complete: function (xhr, status) {
                alert('SOLICITUD REALIZADA, ' + xhr.status);
            },
            
            success: function (json) {
                $("#resultado").empty();
                
                tabla = "<center><table  border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE<th style='color: #00bbbb;'>ELIMINAR"
                
                filas = ""
                for (i = 0; i < json.items.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + json.items[i].id + "</td>",
                    filas += "<td><textarea>" + json.items[i].messagetext + "</textarea></td>",
                    filas += "<td><button  onclick='Eliminar("+ json.items[i].id +")'>ELIMINAR</button>"
                }
                $("#resultado").append(tabla + filas  + "</center>")
                console.log(json)
                
            }
        }
    );
}

/**
 * FUNCION PARA CONSULTAR POR ID
 */

function consultarPorId(campoId){
    if(campoId.val() == ""){
        alert("INGRESE EL ID")
    }
    else{
        var id = campoId.val()
        $.ajax(
            {
                url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message/'+id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if(json.items.length == 0){
                        alert("Digito erroneo, vuelve a intentarlo")
                        campoId.val("")
                        
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE"
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr align='center'>"
                            filas += "<td>" + json.items[i].id
                            filas += "<td><textarea>" + json.items[i].messagetext + "</textarea></td>"
                            
                        }
                        $("#resultado").append(tabla + filas  + "</center>")
                        console.log(json)
                    }
                   
                },
                complete: function (xhr, status) {
                    alert('SOLICITUD REALIZADA, ' + xhr.status);
                },
                error: function (xhr, status) {
                    alert('ERROR, ' + xhr.status);
                }

            }

        )
    }
}

/**
 * FUNCION PARA LIMPIAR FORMULARIO
 */
function limpiarFormulario(){
    if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
        var campo =  document.getElementById("id")
        var resultado =  document.getElementById("resultado")
        campo.value = "";
        resultado.innerHTML = ""
    }
}

/**
 * FUNCION PARA CREAR TABLA DE GUARDAR
 */
 function crearTablaGuardar(){
    $("#resultado").empty();
    tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE<th style='color: #00bbbb;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codi' type='number' placeholder='Digita el id'>"
        filas += "<td><textarea id='mensaje' rows='5' cols=' 25' placeholder='Escribe un mensaje'></textarea>"  
        filas += "<td><input id='btnGuardar' type=button value='GUARDAR' onclick=guardarMensaje()>"
    
    $("#resultado").append(tabla + filas + "</center>")
    console.log("#id")
    
}
/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN REGISTRO
 */

function guardarMensaje(){
    if(validarFormulario()){
        if(confirm("Seguro que deseas Guardar")){
                $.ajax(
                    {
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
                        type: 'POST',
                        dataType: 'json',
                        data : {
                                id:  $("#codi").val(),
                                messagetext:  $("#mensaje").val(),
                                

                        },
                        
                        complete: function (xhr, status) {
                             $("#resultado").empty();
                             alert('REGISTRO GUARDADO, ' + xhr.status);
                        },
                        
                    }
                )
        }
    }
}

/**
 * FUNCION PARA VALIDAR CAMPOS
 */
function validarFormulario(){
   
        if($("#mensaje").val() == ""){
        alert("El MENSAJE es necesario")
        return false
    }
   
    return true
}



/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar(){
    
    tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE<th style='color: #00bbbb;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codi' type='number' placeholder='Digita el id'>"
        filas += "<td><textarea id='mensaje' rows='5' cols=' 25' placeholder='Escribe un mensaje'></textarea>"
        filas += "<td><input id='btnActualizar' type=button value='ACTUALIZAR' onclick=actualizar()>"
    
    $("#resultado").append(tabla + filas + "</center>")
     console.log("#id")
     
}
function validarId(){
   
    if($("#codi").val() == ""){
        alert("El Id es necesario")
        return false
    } 
    if($("#mensaje").val() == ""){
        alert("El MENSAJE es necesario")
        return false
    }
     
    return true
    
}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar(){
    var myData={
        id: $("#codi").val(),
        messagetext: $("#mensaje").val(),
        
    };
    var dataToSend= JSON.stringify(myData);
    
    if(validarId()) {
        if(confirm("Seguro que deseas Actualizar")){
                $.ajax(
                    {
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
                        type: 'PUT',
                        data:dataToSend,
                        contentType: "application/JSON",
                        dataType: 'JSON',
                    
                            complete: function (xhr, status) {
                            $("#resultado").empty();
                            consultar();
                            alert('REGISTRO ACTUALIZADO ' + xhr.status);
                             
                        },
                    }  
                  );
               }
             
        }
    
    
}


/**
 * FUNCION PARA ELIMINAR
 */
function Eliminar(idElement){
    var myData={
        id:idElement
    };
    var dataToSend=JSON.stringify(myData);
        $.ajax(
            {
                url: "https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message",
                type: "DELETE",
                data:dataToSend,
                contentType:"application/JSON",
                dataType: "JSON",
                
                
                    complete: function (xhr, status) {
                    $("#resultado").empty();
                    consultar();
                    alert('REGISTRO ELIMINADO ' + xhr.status)
                       
                    },
            }
        );
 }   
