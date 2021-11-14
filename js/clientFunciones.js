/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() 
{
    $.ajax( 
       {
            url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',

           
            complete: function (xhr, status) {
                alert('SOLICITUD REALIZADA, ' + xhr.status);
            },
            
            success: function (json) {
                $("#resultado").empty();
                
                tabla = "<center><table  border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>NOMBRE<th style='color: #0F86C8;'>EMAIL" +
                "<th style='color: #0F86C8;'>EDAD<th style='color: #0F86C8;'>ELIMINAR"
                
                filas = ""
                for (i = 0; i < json.items.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + json.items[i].id + "</td>",
                    filas += "<td>" + json.items[i].name + "</td>",
                    filas += "<td>" + json.items[i].email + "</td>",
                    filas += "<td>" + json.items[i].age + "</td>",
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
                url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client/'+id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if(json.items.length == 0){
                        alert("Digito erroneo, vuelve a intentarlo")
                        campoId.val("")
                        
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>NOMBRE<th style='color: #0F86C8;'>EMAIL" +
                        "<th style='color: #0F86C8;'>EDAD"
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr align='center'>"
                            filas += "<td>" + json.items[i].id
                            filas += "<td>" + json.items[i].name
                            filas += "<td>" + json.items[i].email
                            filas += "<td>" + json.items[i].age
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
    tabla = "<center><table border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>NOMBRE<th style='color: #0F86C8;'>EMAIL" +
            "<th style='color: #0F86C8;'>EDAD<th style='color: #0F86C8;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
        filas += "<td><input id='nombre' type='text' placeholder='Digita el nombre'>"  
        filas += "<td><input id='email' type='text' placeholder='Digita el email'>" 
        filas += "<td><input id='edad' type='number' placeholder='Digita la edad'>"
        filas += "<td><input id='btnGuardar' type=button value='GUARDAR' onclick=guardarUsuario()>"
    
    $("#resultado").append(tabla + filas + "</center>")
    console.log("#id")
    
}


/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN REGISTRO
 */



function guardarUsuario(){
    if(validarFormulario()){
        if(confirm("Seguro que deseas Guardar")){
                $.ajax(
                    {
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
                        type: 'POST',
                        dataType: 'json',
                        data : {
                                id:  $("#codigo").val(),
                                name:  $("#nombre").val(),
                                email: $("#email").val(),
                                age: $("#edad").val(),

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
 * FUNCION PARA VALIDAR CAMPOS GUARDAR
 */
function validarFormulario(){
   
    if($("#nombre").val() == ""){
        alert("El NOMBRE es necesario")
        return false
    }
    if($("#email").val() == ""){
        alert("El EMAIL es necesario")
        return false
    }
    if($("#edad").val() == ""){
        alert("La EDAD es necesaria")
        return false
    }
    return true
}


/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar(){
    
    tabla = "<center><table border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>NOMBRE<th style='color: #0F86C8;'>EMAIL" +
            "<th style='color: #0F86C8;'>EDAD<th style='color: #0F86C8;'>ACTUALIZAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>" 
        filas += "<td><input id='nombre' type='text' placeholder='Digita el nombre'>"  
        filas += "<td><input id='email' type='text' placeholder='Digita el email'>" 
        filas += "<td><input id='edad' type='number' placeholder='Digita la edad'>"
        filas += "<td><input id='btnActualizar' type=button value='ACTUALIZAR' onclick=actualizar()>"
    
    $("#resultado").append(tabla + filas + "</center>")
     console.log("#id")
     
}
/**
 * FUNCION PARA VALIDAR DATOS CON EL ID
 */

function validarId(){
   
    if($("#codigo").val() == ""){
        alert("El Id es necesario")
        return false
    }
    if($("#nombre").val() == ""){
        alert("El NOMBRE es necesario")
        return false
    }
    if($("#email").val() == ""){
        alert("El EMAIL es necesario")
        return false
    }
    if($("#edad").val() == ""){
        alert("La EDAD es necesaria")
        return false
    }
     
    return true
    
}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar(){
    var myData={
        id: $("#codigo").val(),
        name: $("#nombre").val(),
        email: $("#email").val(),
        age: $("#edad").val(),
    };
    var dataToSend= JSON.stringify(myData);
    
    if(validarId()) {
        if(confirm("Seguro que deseas Actualizar")){
                $.ajax(
                    {
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
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
                url: "https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client",
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
