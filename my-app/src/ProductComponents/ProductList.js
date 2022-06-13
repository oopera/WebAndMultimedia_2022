import '../App.css';
import {Product} from "./Product";
import {ProductFocus} from "./ProductFocus";
import React, {useState} from "react";

export default function ProductList(props) {
    const [searchInput, setSearchInput] = useState('');
    const [openedProduct, setOpenedProduct] = useState('');

    function updateProduct(string){
       if(string === openedProduct){
           setOpenedProduct('null');

       }else{
           setOpenedProduct(string);

       }
    }

    function AproductList(props) {
        return props.products.map((product) => {
            return (
                <div key={product._id}>
                    {openedProduct !== product._id  &&
                        product.Name.toLowerCase().includes(searchInput.toLowerCase()) && (
                        <div onClick={() => updateProduct(product._id)}>
                        <Product img={product.img} className={'Product'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability} key={product._id}/>
                        </div>
                            )}
                    {openedProduct === product._id && (
                        <>
                        <div onClick={() => updateProduct(product._id)} key={product._id}>
                        <Product  onClick={() => updateProduct(product._id)} key={product._id} className={'Focused'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                        </div>
                        <ProductFocus setOpenedProduct={setOpenedProduct}
                                      isLoggedIn={props.isLoggedIn}
                                      basket={props.basket}
                                      setBasket={props.setBasket}
                                      product={product}
                                      img={product.img}
                                      id={product._id}
                                      name={product.Name}
                                      description={product.Description}
                                      price={product.Price}
                                      availability={product.Availability}
                                      comments={props.comments}
                                      setComments={props.setComments}
                                      rerender={props.rerender}
                                      setRerender={props.setRerender}
                        />
                        </>
                        )}
                </div>
            )});
    }
        return (
            <div className={'ProductContainerOO'}>
                <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}} className={'searchField'} placeholder={'search...'}/>
                <div className={'ProductContainer'}>

                    {AproductList(props)}

                </div>
            </div>
        );
    }

