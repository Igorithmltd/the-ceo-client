import React, { useState } from 'react';

const DesignImageTrabed = (props) => {
    const {src,className,alt,style,onClick} = props;
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [datestamp, setDatestamp] = useState("");

    const handleImageError = () => {
        setError(true);
        setDatestamp(new Date());
    };
    const handleImageLoad = () => {
        setError(false);
        setLoading(false);
    };

    return (
        <div>
            {error ? (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    style={style}
                    onClick={onClick}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    style={style}
                    onClick={onClick}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    id={datestamp}
                />
            )}
        </div>
    );
};
export default DesignImageTrabed;