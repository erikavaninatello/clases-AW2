// ======API======

//funcion que se encarga solo de traer datos desde la api externa
export async function getUsers() {
    
    //se hace la peticion http a la api 
    const res = await fetch('https://api.escuelajs.co/api/v1/users')
   
    //se transforma la respuesta a JSON
     const data = await res.json()

     //se devuelve la data

    return data
   
}
