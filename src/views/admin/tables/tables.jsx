import React,{useState, useEffect} from 'react';
import {
    Card, Table, CardText, CardBody,Badge,
    CardTitle
  } from 'reactstrap';
import { PrimaryBtn} from '../../../components/Buttons/Buttons'
import Api from '../../../utils/ClientApi';
import {useHistory} from 'react-router-dom';
export default function Tables() {
    const [tables, setTables] = useState([]);
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const createTables=()=>{
        history.push('/dashboard/tablesForm')
    }
    const goToTable=(data)=>{
        history.push('/dashboard/table',data)
    }
    // const deleteMenu = (id)=>{
    //     Api.delete(`/api/menu/${id}`).then(e=>{
    //         setLoading(true)
    //     })
    // }
    
    useEffect(() => {
        Api.get('/api/mesa').then(data=>{
            setTables(data.data.data)
            console.log(data.data.data)
            setLoading(false)
        })
        
    }, [loading])
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Menu</CardTitle>
                    <CardText>Agrega o elimina</CardText>
                    <PrimaryBtn onClick={createTables}>
                        Agregar nuevo 
                    </PrimaryBtn>
                </CardBody>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Numero de mesa</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((table, index)=>(
                                <tr key={table._id}>
                                    <th scope="row">{index +1}</th>
                                    <td> Mesa {table.numero}</td>
                                    <td>{table.estado?(
                                        <Badge color="success">Disponible</Badge>
                                        
                                    ):(
                                        <Badge color="danger">Ocupado</Badge>
                                    )}</td>
                                    <td>
                                        <PrimaryBtn onClick={()=>goToTable(table)}>
                                            ver
                                        </PrimaryBtn>
                                        -
                                        {/* <WaringBtn onClick={()=>deleteMenu(menu._id)}>
                                            Eliminar mesa
                                        </WaringBtn> */}
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
