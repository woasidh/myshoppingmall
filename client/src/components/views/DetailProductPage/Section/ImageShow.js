import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';


function ImageShow(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images) {
            let images = []
            props.detail.images.map((path, index) => {
                images.push({
                    original: `http://localhost:5000/${path}`,
                    thumbnail: `http://localhost:5000/${path}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ImageShow
