import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import data from "../data/product.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ItemCount } from "./ItemCount";
import { CartContext } from "../context/CartContext";

export const ItemDetailContainer = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  console.log(carrito);

  const [item, setItem] = useState(null);

  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);

  const handleSumar = () => {
    item.stock > cantidad && setCantidad(cantidad + 1);
  };





  const handleAgregar = () => {
    const itemAgregado = { ...item, cantidad };
    const nuevoCarrito = [...carrito];
    const enCarrito = nuevoCarrito.find((item) => item.id === itemAgregado.id);

    if (enCarrito) {
      enCarrito.cantidad= enCarrito.cantidad + cantidad;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, itemAgregado]);
    }
  };





  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };
  useEffect(() => {
    const get = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });
    get.then((data) => {
      const dataFound = data.find((d) => d.id === Number(id));
      setItem(dataFound);
    });
  }, [id]);

  if (!item) return null;
  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ width: "52rem" }}>
        <div className="d-flex">
          <div>
            <Card.Img
              className="div-img img-fluid"
              variant="top"
              src={item.pictureUrl}
            />
          </div>
          <Card.Body className="">
            <Card.Text>{item.category}</Card.Text>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>
              <b>{item.price}</b>
            </Card.Text>
            <Card.Text>
              <span>
                Disponible: <b>{item.stock}</b>
              </span>
            </Card.Text>
            <ItemCount
              cantidad={cantidad}
              handleRestar={handleRestar}
              handleSumar={handleSumar}
            />
            <Button variant="primary" onClick={handleAgregar}>
              Agregar al carrito
            </Button>
          </Card.Body>
        </div>
      </Card>
    </Container>
  );
};
