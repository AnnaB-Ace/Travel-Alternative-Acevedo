import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./CategoriesList.css";
// import { useCartContext } from "../../context/cartContext";

export const CategoriesList = () => {
  const { categoriaid } = useParams();
  // const cartC = useCartContext();
  // console.log("card=>", cartC);

  // console.log(cartC.id);
  const [productscategory, setproductscategory] = useState([]);
  const [categoriaWithDiscount, setcategoriaWithDiscount] = useState([
    "Sweater",
    "Vestido",
  ]);
  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        `https://run.mocky.io/v3/0f139187-be0b-4d67-8f4c-dd461bd8519e`
      );
      let productsC = await response.json();

      let productosFiltrados = productsC.filter(
        (f) => f.categoria.toLowerCase() === categoriaid.toLowerCase()
      );

      setproductscategory(productosFiltrados);
    };
    getItems();
  }, [categoriaid]);

  const hasDiscount = (categoriaid) =>
    categoriaWithDiscount.some((category) => category === categoriaid);
  return (
    <div>
      <>
        {hasDiscount(categoriaid) && (
          <p>Toda esta categoria esta con descuento del 30%</p>
        )}
      </>
      <div className="CategoriesList">
        {productscategory.map((product, id) => {
          return (
            <div
              key={product.id}
              className="tarjeta "
              style={{ maxWidth: 200 }}
            >
              <div>
                <Link to={`/item/${product.id}`}>
                  <img
                    src={require(`../../img/jpg/${product.imagen}.jpg`).default}
                    alt="coleccion2021"
                    className="card-img img-fluid"
                  />
                </Link>
              </div>
              <div className="Box">
                <h5>{product.title}</h5>

                {hasDiscount(categoriaid) ? (
                  <p className="price_withDiscount">
                    <small>${product.precio}</small>
                  </p>
                ) : (
                  <p className="price">
                    <small>${product.precio}</small>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
