import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const DropHandler = (files) => {
        console.log(files[0])
        let formData = new FormData();
        formData.append("file", files[0]);
        axios.post('/api/product/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data.success) {
                console.log(response.data)
                setImages([...Images, response.data.filePath])
                props.refreshFunction([...Images, response.data.filePath])
            } else {
                console.log("file failed!")
                console.log(response.data.err)
            }
        })
    }

    const deleteHandler = (image) =>{
        
        let currentIndex = Images.indexOf(image)

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={DropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300, height: 240, border: "1px solid gray",
                                alignItems: 'center', display: 'flex', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <PlusOutlined style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div key ={index} onClick={(image)=>deleteHandler(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </div>
            <br />
        </div>
    )
}

export default FileUpload
