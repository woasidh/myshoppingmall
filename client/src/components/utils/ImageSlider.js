import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {
    
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((path, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '145px' }}
                            src={`http://localhost:5000/${path}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider