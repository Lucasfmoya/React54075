import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";

export const MyForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const comprar = (data) => {
    if (data.email === data.emailRepeat) {
      alert(`Gracias por su compra ${data.nombre}`);
      setError("");
      reset();
    } else {
      setError("Los emails no coinciden, intente de nuevo.");
    }
  };
  return (
    <div className="form-buy">
      <Form onSubmit={handleSubmit(comprar)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre y apellido"
            size="sm"
            required
            {...register("nombre")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Control
            type="tel"
            placeholder="Ingrese su teléfono"
            size="sm"
            required
            {...register("telefono")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            size="sm"
            required
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="repeatEmail">
          <Form.Control
            type="email"
            placeholder="Repita su email"
            size="sm"
            required
            {...register("emailRepeat")}
          />
        </Form.Group>
        <div>
          <span className="error">{error}</span>
        </div>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese aquí sus comentarios"
            size="sm"
            {...register("comentarios")}
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary">
          Comprar
        </Button>
      </Form>
    </div>
  );
};

export default MyForm;
