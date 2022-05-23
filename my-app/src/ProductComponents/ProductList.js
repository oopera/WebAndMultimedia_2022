import '../App.css';
import {Product, ProductFocus} from "./Product";
import React, {useEffect, useState} from "react";
import Select from "react-select";

export default function ProductList(props) {
    const [rerender, setRerender] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    console.log(searchInput)
    function softRerender(){
        setRerender(!rerender);
    }

    function updateProduct(string){
       if(string === props.openedItem){
           props.setOpenedItem('null');
           softRerender();
       }else{
           props.setOpenedItem(string);
           softRerender();
       }
    }
    const colors =
        ['#52FF00', '#00FFE0', '#3300FF', "#0057FF", "#AD00FF", "#FF0000", "#FFA800", '#CCFF00', '#52FF00']
    let counter = -1;
    function AproductList(props) {
        return props.products.map((product) => {
            counter = counter + 1
            if(counter === colors.length){
                counter = 0
            }
            return (
                <div key={product._id}>
                    {props.openedItem !== product._id  &&
                        product.Name.toLowerCase().includes(searchInput.toLowerCase()) && (
                        <div onClick={() => updateProduct(product._id)}>
                        <Product style={{}} img={product.img} className={'Product'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability} key={product._id}/>
                        </div>
                            )}
                    {props.openedItem === product._id && (
                        <div>
                    <div onClick={() => updateProduct(product._id)} key={product._id}>
                        <Product style={{borderColor: colors[counter]}} className={'Focused'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                        </div>
                        <ProductFocus style={{borderColor: colors[counter]}} comments={product.Comments} img={product.img} id={product._id} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                    </div>
                        )}
                    {props.openedItem === 'admin' && (
                            <div className={'ProductFocus'}>
                                <div className={'focusContent'}>
                                    <p> Add user </p>
                                    <p> Add product </p>
                                    <p> delete product </p>

                                    <label htmlFor="products">Choose a product:</label>

                                </div>
                            </div>
                        )}
                    {props.openedItem === 'account' && (
                        <div className={'ProductFocus'}>
                            <div className={'focusContent'}>
                                <p>{props.accComments.toString()}</p>


                            </div>
                        </div>
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

