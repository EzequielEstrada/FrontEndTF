
const cv ='https://randomuser.me/api/?format=JSON&results=80&noinfo&exc=login,registered,id'
let datos="";

fechRUG("","",50);
mostrarPerfil(0);

async function fechRUG(gen,nat,cant) {
    const response = await fetch('https://randomuser.me/api/?format=JSON&results='+cant+'&noinfo&exc=login,registered,id'+gen+nat);
    datos = await response.json();

    limpiar("minis");
    
    let largo = datos.results.length;

    for(let i = 0; i < largo;i++){
        
        let newDiv = document.createElement('div');
        Object.assign(newDiv,{
            className:'grid-item',
            id:'g'+i,
        });    
        document.getElementById("minis").append (newDiv);
        
        let newImg = document.createElement('img');
        Object.assign(newImg,{
            src:datos.results[i].picture.medium,
            alt:'',
            className:'imgCover',
            id:'f'+i,
            onclick:function(){mostrarPerfil(i)}
        });
        document.getElementById("g"+i).append(newImg);

    }

    return datos;
}

function limpiar(elemento){
    document.getElementById(elemento).innerHTML = '';
}

function mostrarPerfil(nPerfil){

    
    document.getElementById("fotoPerfil").setAttribute('src',datos.results[nPerfil].picture.large);

    
    /*Datos personales  */
    
    let nomCompleto = datos.results[nPerfil].name.title+' '+datos.results[nPerfil].name.first+' '+datos.results[nPerfil].name.last
    let fecNat = datos.results[nPerfil].dob.date.slice(0,10)
    let sexo = ""
    if(datos.results[nPerfil].gender==="male"){
        sexo = "Masculino";
    }else{
        sexo = "Femenino";
    };

    document.getElementById('nom').innerHTML = 'Nombre: '+ nomCompleto;
    document.getElementById('gen').innerHTML = 'Sexo: '+ sexo;
    document.getElementById('dob').innerHTML = 'Fecha de nacimiento: '+ fecNat;
    document.getElementById('nat').innerHTML = 'Nacionalidad: '+ datos.results[nPerfil].nat;
    document.getElementById('age').innerHTML = 'Edad: '+ datos.results[nPerfil].dob.age;
 
    /* Datos de contacto */

    let calle = datos.results[nPerfil].location.street.number+' '+datos.results[nPerfil].location.street.name
    let estado = datos.results[nPerfil].location.city+', '+datos.results[nPerfil].location.state+', '+datos.results[nPerfil].location.country;

    document.getElementById('email').innerHTML = 'Email: '+datos.results[nPerfil].email;
    document.getElementById('pho').innerHTML = 'Telefono: '+ datos.results[nPerfil].phone;
    document.getElementById('cell').innerHTML = 'Celular: '+ datos.results[nPerfil].cell;
    document.getElementById('locCuidad').innerHTML = 'Cuidad: '+ estado;
    document.getElementById('locCalle').innerHTML = 'Domicilio: '+ calle;

}