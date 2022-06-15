const fs = require('fs');
const cartPath = __dirname + '/../files/carts.json'
const productPath = __dirname + '/../files/products.json'




const fetchData = async (path) => {
    let data = await fs.promises.readFile(path, 'utf-8');
    let carts = JSON.parse(data);
    return carts;
}

class cartManager {



    addNewCart = async () => {
        if (fs.existsSync(cartPath)) {

            const newCart = {
                id: 1,
                timestamp: Date.now(),
                products: [],
            };
            try {
                const carts = await fetchData(cartPath);
                if (carts.length !== 0) {
                    newCart.id = carts[carts.length - 1].id + 1;
                }
                carts.push(newCart);
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                return newCart.id;
            } catch (error) {
                return { status: false, error };
            }
        }
    }

    deleteCart = async (id) => {
        if (fs.existsSync(cartPath)) {
            try {
                const carts = await fetchData(cartPath);
                carts.splice(id - 1, 1)
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                return true;
            } catch (error) {
                throw error;
            }




        }



    }


    getProduct = async (id) => {
        if (fs.existsSync(cartPath) && (fs.existsSync(productPath))) {
            try {
                const carts = await fetchData(cartPath);
                const cartFiltered = carts.filter(cart => cart.id === id);

                return cartFiltered[0].products;

            } catch (error) {
                throw error;
            }
        }
    }

    addProduct = async (id, idProduct) => {
        if (fs.existsSync(cartPath) && (fs.existsSync(productPath))) {
            try {
                const carts = await fetchData(cartPath);
                const products = await fetchData(productPath);


                const productFiltered = products.filter(product => idProduct === product.id)

                carts.map(cart => {
                    if (cart.id === id) {
                        cart.products.push(productFiltered[0])
                    }
                })
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                return true;

            } catch (error) {
                throw error;
            }

        }


    }




    deleteProduct = async (id, idProduct) => {
        if (fs.existsSync(cartPath)) {
            try {
                const carts = await fetchData(cartPath);
                carts.map(cart => {
                    if (cart.id === id) {
                        const index = cart.products.findIndex(product =>
                            product.id === idProduct

                        )
                        cart.products.splice(index, 1)

                    }

                })
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                return true;
            } catch (error) {
                throw error;
            }




        }
    }

}
module.exports = cartManager;