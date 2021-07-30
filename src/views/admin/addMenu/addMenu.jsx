import React,{useState, useEffect} from 'react';
import {
    Card, Table, CardText, CardBody,
    CardTitle
  } from 'reactstrap';
import { WaringBtn, PrimaryBtn} from '../../../components/Buttons/Buttons'
import Api from '../../../utils/ClientApi';
import {useHistory} from 'react-router-dom';
export default function AddMenu() {
    const [menus, setMenus] = useState([]);
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const createDishes=()=>{
        history.push('/dashboard/menuForm')
    }
    const deleteMenu = (id)=>{
        Api.delete(`/api/menu/${id}`).then(e=>{
            setLoading(true)
        })
    }
    
    useEffect(() => {
        Api.get('/api/menu').then(data=>{
            setMenus(data.data.data)
            setLoading(false)
        })
        
    }, [loading])


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Menu</CardTitle>
                    <CardText>Agrega o elimina</CardText>
                    <PrimaryBtn onClick={createDishes}>
                        Agregar nuevo 
                    </PrimaryBtn>
                </CardBody>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Número de platos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, index)=>(
                                <tr key={menu._id}>
                                    <th scope="row">{index +1}</th>
                                    <td>{menu.nombre}</td>
                                    <td>{menu.platos.length}</td>
                                    <td>
                                        {/* <SecondaryBtn>
                                            Editar platos
                                        </SecondaryBtn> */}
                                        -
                                        <WaringBtn onClick={()=>deleteMenu(menu._id)}>
                                            Eliminar Menu
                                        </WaringBtn>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            
        </div>
    )
}
