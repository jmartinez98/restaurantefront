import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledAlert,
} from "reactstrap";
import Blinking from "../../components/animations/blinking";
import { SimpleCard } from "../../components/cards/Cards";
import { PrimaryBtn, SecondaryBtn } from "../../components/Buttons/Buttons";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Api from "../../utils/api";
import { connect, useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions";
import jwt from "jsonwebtoken";
import Loading from "../../components/animations/loading";
import { AiTwotoneHome } from "react-icons/ai";
const Login = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.authReducer.token);
  const [redirectTo, setRedirectTo] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const singIn = () => history.push("/singIn");
  const dispach = useDispatch();
  const formik = useFormik({
    initialValues: InitialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (form) => {
      submit(form);
    },
  });
  const submit = (data) => {
    setLoading(true);
    Api.post("api/usuario/login", data)
      .then((e) => {
        let userData = {
          ...jwt.decode(e.data.token).usuario,
          token: e.data.token,
        };
        dispach({ type: authActions.LOGIN_SUCCESS, payload: userData });
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      setRedirectTo(true);
    }
  }, [isLoggedIn]);
  let { from } = location.state || { from: { pathname: "/dashboard" } };
  if (redirectTo) {
    return <Redirect to={from} />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="button-to-login">
        <SecondaryBtn onClick={() => history.push("/")}>
          <div className="d-flex justify-content-center align-items-center">
            <AiTwotoneHome size={30} style={{ marginRight: 10 }} />
            <p className="no-margin fw-bold"> Página Principal</p>
          </div>
        </SecondaryBtn>
      </div>
      <Row>
        <Col lg={6} className="d-none d-xs-none d-sm-none d-md-none d-lg-block">
          <div
            className="d-flex align-items-center"
            style={{ height: "100vh" }}
          >
            <div>
              <Blinking>
                <h1 className="text-white">Restaurant</h1>
              </Blinking>

              <Blinking>
                <h3 className="text-white">Disfruta tu estadia</h3>
              </Blinking>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          md={12}
          lg={6}
          className="d-flex align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <SimpleCard>
            <Form onSubmit={formik.handleSubmit}>
              <UncontrolledAlert
                color="warning"
                isOpen={error}
                toggle={() => setError(false)}
              >
                Correo o Contraseña Incorrectos
              </UncontrolledAlert>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  invalid={formik.errors.correo ? true : false}
                  onChange={formik.handleChange}
                  name="correo"
                  id="exampleEmail"
                  placeholder="usuario@email.com"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Contraseña</Label>
                <Input
                  type="password"
                  invalid={formik.errors.password ? true : false}
                  onChange={formik.handleChange}
                  name="password"
                  id="examplePassword"
                  placeholder="Contraseña"
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify content-center">
                  <PrimaryBtn disabled={loading} type="submit">
                    Ingresar
                  </PrimaryBtn>
                  <SecondaryBtn
                    disabled={loading}
                    type="button"
                    onClick={singIn}
                  >
                    Registrarse
                  </SecondaryBtn>
                </div>
                <SecondaryBtn
                  disabled={loading}
                  type="button"
                  onClick={() => history.goBack()}
                >
                  Cancelar
                </SecondaryBtn>
              </div>
            </Form>
          </SimpleCard>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { order: state.order };
};

export default connect(mapStateToProps)(Login);

function InitialValues() {
  return {
    correo: "",
    password: "",
  };
}

function validationSchema() {
  return {
    correo: yup.string().email().required(true),
    password: yup.string().required(true),
  };
}
