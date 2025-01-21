import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Isloading2} from '../designs'

const ImageTrabed = (props) => {
    const {src,classname,alt,width,height,placeholder,effect} = props;
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [datestamp, setDatestamp] = useState("");
    const handleImageError = (event) => {
        setDatestamp(new Date());
        setError(true);
    };
    const handleImageLoad = () => {
        setError(false);
        setLoading(false);
    };
    return (
        <div>
            {loading &&[
                <Isloading2 title="Loading" key="a"/>
            ]}
            {error ? (
                <LazyLoadImage
                    key="b"
                    src={src}
                    className={classname}
                    alt={alt}
                    width={width}
                    height={height}
                    placeholderSrc={placeholder}
                    effect={effect}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            ) : (
                <LazyLoadImage
                    key="c"
                    src={src}
                    className={classname}
                    alt={alt}
                    width={width}
                    height={height}
                    placeholderSrc={placeholder}
                    effect={effect}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            )}
        </div>
    );
};
export default ImageTrabed;