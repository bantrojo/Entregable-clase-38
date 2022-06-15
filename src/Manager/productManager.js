const { createSecretKey } = require('crypto');
const fs = require('fs');
const productPath = __dirname + '/../files/products.json';

const fetch = async () => {
    let data = await fs.promises.readFile(productPath, 'utf-8');
    let products = JSON.parse(data);
    return products;
}
//declaro una clase para trabajar con los productos, para ver e ingresar
class productManager {
    //declaro la funcion get para obtener los productos, como asincronica
    get = async () => {
        //si existe el el archivo o ruta de lso productos, seguimos
        if (fs.existsSync(productPath)) {
            try {
                //productos va a ser fetch, que a la vez es leer el archivo de productos como JSON y luego
                //Osea products= el contenido del archivo JSON
                let products = await fetch();
                return { status: true, products: products }
            } catch (error) {
                return { status: 'error', error: error }
            }
        }
    }//aca finaliza el metodo get




    //ahora declaramos el metodo add para agregar productos
    add = async (product) => {
        //si exsite el archivo con la info
        if (fs.existsSync(productPath)) {
            try {
                //products= el contenido del archivo JSON
                let products = await fetch();
                //si el lago de productos es 0, osea si esta vacio
                if (products.length === 0) {
                    //declaro producto
                    let product;
                    //la id del primer producto sera 1
                    product.id = 1;
                    //se escribe en el archivo como un array|| null,2 son parametros que se usan asi por defecto
                    await fs.promises.writeFile(productPath, JSON.stringify([product], null, 2));
                    //regresa el mensaje si se cumple la escritura
                    return { status: "succes", message: "product added" }

                }
                product.id = products[products.length - 1].id + 1;
                product.timestamp = Date.now();
                products.push(product);
                await fs.promises.writeFile(productPath, JSON.stringify(products, null, 2));
                return { status: "Success", message: "Product added" }

            } catch (error) {
                return { status: "error", error: error }
            }

        }
        product.id=1;
        await fs.promises.writeFile(productPath,JSON.stringify([product],null,2));
        return {status:"Success",message:"Product added"}
    }//aca finaliza el add

    //declaramos el metodo delet y le pasamos la 
delete=async(id)=>{
    if(fs.existsSync(cartPath)){
        try{
            const products=await fetchData(productPath);
            createSecretKey.map(cart=>{
                if(product.ed==id){
                    products.splice(id-1,1)
                }
            })
            await fs.promises.writeFile(cartPath,JSON.stringify(carts,null,2));
            return true;

        }catch(error){
            throw error; 
        }
    }



}



}
module.exports=productManager;