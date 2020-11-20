import React, {useState} from 'react'
import { Form, Input, Button, Select } from 'antd'
import FileUpload from '../../utils/FileUpload.js'
import axios from 'axios'

function UploadProductPage(props) {
    
    //css setting
    const { TextArea } = Input;
    const { Option } = Select;

    //initialize state
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState("")
    const [Images, setImages] = useState([])

    const Continents = [
        {key: 1, value: "매탄동"},
        {key: 2, value: "원천동"},
        {key: 3, value: "우만동"},
        {key: 4, value: "광교동"}
    ]

    const NameHandler = (event) =>{
        setName(event.currentTarget.value)
    }

    const DescriptionHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const PriceHandler = (event) =>{
        setPrice(event.currentTarget.value)
    }

    const ContinentHandler = (event) =>{
        setContinent(event)
    }

    const updateImages = (images) =>{
        setImages(images)
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        if(!Name||!Description||!Price||!Continent||!Images){
            return alert('please type in all contents!')
        }

        let body = {
            writer: props.user.userData,
            name: Name, 
            description: Description,
            price: Price,
            images: Images,
            continent : Continent,
        }

        axios.post('/api/product', body)
        .then(response =>{
            if(response.data.success){
                alert('upload success!')
                props.history.push('/')
            }else{
                alert('upload failed!')
            }
        })
    }
    return (
        <div style={{ maxWidth: "70%", margin: "2rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>Upload your product!</h2>
            </div>
            <Form> 
                <FileUpload refreshFunction = {updateImages}/>
                <label>Name</label>
                <Input value = {Name} onChange = {NameHandler}/>
                <br />
                <br />
                <label>Description</label>
                <TextArea value = {Description} onChange = {DescriptionHandler}/>
                <br /><br />
                <label>Price</label>
                <Input type = "number" value = {Price} onChange = {PriceHandler}/>
                <br /><br />
                <label>Continent</label><br />
                <Select style={{ width: 100 }} onChange = {ContinentHandler}>
                    {Continents.map(item=>(<option key = {item.key} value = {item.value}>{item.value}</option>))} 
                </Select>
                <br />
                <br />
                <Button onClick = {submitHandler}>submit</Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
