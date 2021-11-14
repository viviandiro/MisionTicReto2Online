/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() 
{
    $.ajax( 
       {
            url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/library/library',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',

           
            complete: function (xhr, status) {
                alert('SOLICITUD REALIZADA, ' + xhr.status);
            },
            
            success: function (json) {
                $("#resultado").empty();
                
                tabla = "<center><table  border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
                "<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>ELIMINAR"
                
                filas = ""
                for (i = 0; i < json.items.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + json.items[i].id + "</td>",
                    filas += "<td>" + json.items[i].target + "</td>",
                    filas += "<td>" + json.items[i].capacity + "</td>",
                    filas += "<td>" + json.items[i].category_id + "</td>",
                    filas += "<td>" + json.items[i].name + "</td>"
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
                url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/library/library/'+id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if(json.items.length == 0){
                        alert("Digito erroneo, vuelve a intentarlo")
                        campoId.val("")
                        
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
                        "<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>NAME"
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr align='center'>"
                            filas += "<td>" + json.items[i].id + "</td>",
                            filas += "<td>" + json.items[i].target + "</td>",
                            filas += "<td>" + json.items[i].capacity + "</td>",
                            filas += "<td>" + json.items[i].category_id + "</td>",
                            filas += "<td>" + json.items[i].name + "</td>"
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
    tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
    "<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
        filas += "<td><input id='target' type='text' placeholder='Digita target'>"  
        filas += "<td><input id='capacity' type='number' placeholder='Digita capacity'>" 
        filas += "<td><input id='categoryId' type='number' placeholder='Digita category_Id'>"
        filas += "<td><input id='name' type='text' placeholder='Digita el name'>"
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
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/library/library',
                        type: 'POST',
                        dataType: 'json',
                        data : {
                                id:  $("#codigo").val(),
                                target:  $("#target").val(),
                                capacity: $("#capacity").val(),
                                category_id: $("#categoryId").val(),
                                name: $("#name").val(),

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
   
    if($("#target").val() == ""){
        alert("TARGET es necesario")
        return false
    }
    if($("#capacity").val() == ""){
        alert("CAPACITY es necesario")
        return false
    }
    if($("#categoryId").val() == ""){
        alert("CATEGORY_ID es necesaria")
        return false
    }
    if($("#name").val() == ""){
        alert("NAME es necesaria")
        return false
    }
    return true
}


/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar(){
    
    tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
    "<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>ACTUALIZAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
        filas += "<td><input id='target' type='text' placeholder='Digita target'>"  
        filas += "<td><input id='capacity' type='number' placeholder='Digita capacity'>" 
        filas += "<td><input id='categoryId' type='number' placeholder='Digita category_Id'>"
        filas += "<td><input id='name' type='text' placeholder='Digita el name'>"
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
    if($("#target").val() == ""){
        alert("TARGET es necesario")
        return false
    }
    if($("#capacity").val() == ""){
        alert("CAPACITY es necesario")
        return false
    }
    if($("#categoryId").val() == ""){
        alert("CATEGORY_ID es necesaria")
        return false
    }
    if($("#name").val() == ""){
        alert("NAME es necesaria")
        return false
    }
    return true
    
}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar(){
    var myData={
        id:  $("#codigo").val(),
        target:  $("#target").val(),
        capacity: $("#capacity").val(),
        category_id: $("#categoryId").val(),
        name: $("#name").val(),
    };
    var dataToSend= JSON.stringify(myData);
    
    if(validarId()) {
        if(confirm("Seguro que deseas Actualizar")){
                $.ajax(
                    {
                        url: 'https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/library/library',
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
                url: "https://gea337391256bc6-bdgastos.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/library/library",
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
