import react, { useState, useEffect } from "react";
import { Button, FormGroup, Table, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Store/auth/authAction";
import { getCanciones, deleteCancion } from "../Store/cancion/cancionAction";
import EditCancion from "../Components/EditCancion";
import AgregarCancion from "../Components/AgregarCancion";
import useDebounce from "../Hooks/useDebounce";
import { useNavigate } from "react-router-dom";



const Listings = () => {
    const [query, setQuery] = useState('');
    const debouncedValue = useDebounce(query, 500);
    const dispatch = useDispatch();
    const { canciones } = useSelector((state) => state.canciones);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [editModal, setEditModal] = useState(false);
    const [currentCancion, setCurrentCancion] = useState(null);
    const navigate = useNavigate();
    const toggleEdit = () => setEditModal(!editModal);
    const openEdit = (cancion) => {
        setCurrentCancion(cancion);
        setEditModal(true);
    };

    useEffect(() => {
        dispatch(getCanciones(debouncedValue));
    }, [debouncedValue, dispatch]);

    const goToPlayer = (id) => {
        if (!id) return;
        navigate(`/player/${id}`);
    }

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center px-4">
                <h3 className="py-3"> Listings </h3>
                <Button color="danger" onClick={() => dispatch(signout())}>Salir</Button>
            </div>
            <div className="d-flex justify-content-end p-4">
                <Button color="success" onClick={toggle}>
                    Agregar una canción

                </Button>

            </div>
            <FormGroup>
                <Input onChange={(e) =>
                    setQuery(e.target.value)
                }></Input>
            </FormGroup>
            <Table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Artista</th>
                        <th>Album</th>
                        <th>Género</th>
                        <th>Fecha de salida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {canciones.map((cancion, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={cancion.imagen}
                                    width="70px"
                                    height="70px"
                                    objectFit="cover"
                                    borderRadius="8px"

                                />

                            </td>

                            <td>
                                <span
                                    className="text-primary"
                                    role="button"
                                    onClick={() => goToPlayer(cancion.id)}
                                >
                                    {cancion.nombre}
                                </span>
                            </td>

                            <td>{cancion.artista}</td>
                            <td>{cancion.album}</td>
                            <td>{cancion.genero}</td>
                            <td>{cancion.anio}</td>

                            <td>
                                <span role="img" aria-label="edit" onClick={() => openEdit(cancion)}> ✏️ </span>
                                <span role="img" aria-label="delete" onClick={() => dispatch(deleteCancion(cancion.id))}> 🗑️ </span>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>
            <AgregarCancion modal={modal} toggle={toggle} />
            <EditCancion modal={editModal} toggle={toggleEdit} cancion={currentCancion} />
        </div>

    );
};

export default Listings;