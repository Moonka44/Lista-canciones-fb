import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from "reactstrap";
import { addCanciones, getCanciones } from "../Store/cancion/cancionAction";

function AgregarCancion({ modal, toggle, ...args }) {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState("");
    const [artista, setArtista] = useState("");
    const [genero, setGenero] = useState("");
    const [album, setAlbum] = useState("");
    const [link, setLink] = useState("");
    const [anio, setAnio] = useState("");
    return (
            <div>
                <Modal isOpen = {modal} toggle ={toggle} {...args}>
                    <Form onSubmit = {(e) => {
                        e.preventDefault ();
                        dispatch(addCanciones({nombre, artista, genero, album, anio, link}));
                        setNombre();
                        setArtista();
                        setGenero ();
                        setAlbum ();
                        setAnio ();
                        setLink ();
                        getCanciones();
                        toggle();
                    }}>
                        <ModalHeader toggle={toggle}>Agregar Cancion</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <label>
                                    Nombre
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el Nombre de la cancion"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Artista
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el Nombre del Artista"
                                type="text"
                                value={artista}
                                onChange={(e) => setArtista(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Genero
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el Genero"
                                type="text"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Album
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el Nombre del Album"
                                type="text"
                                value={album}
                                onChange={(e) => setAlbum(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Año
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el Año"
                                type="text"
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                                />
                                </FormGroup>
                                <FormGroup>
                                <label>
                                    Link
                                </label>
                                <Input
                                required
                                placeholder="Ingresa el link de Youtube"
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <button color="danger" onClick={toggle}>Cancelar</button>{" "}
                            <button color="success" onClick={toggle}>Enviar</button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
}


export default AgregarCancion;




