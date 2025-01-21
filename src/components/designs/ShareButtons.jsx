import React, {useState, useEffect} from 'react';
  
  const ShareButtons = (props) => {
    const {imageUrl, ready} = props;
    const [file1, setFile] = useState(null);

    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const prepareFile = () => {
      const filename = 'theceo.png'; // You can dynamically set the filename if needed
      const files = dataURLtoFile(imageUrl, filename);
      setFile(files);
    };
    useEffect(() => {
        if (imageUrl) {
          prepareFile();
        }
    }, [imageUrl]);

    const shareImage = async () => {
        if (!navigator.share) {
          alert('Your browser does not support the Web Share API.');
          return;
        }
    
        try {
          await navigator.share({
            files:[file1],
            title: 'Theceo Image',
            text: 'Check out this image!'
          });
          alert('Image shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
          alert('Error sharing the image');
        }
    };      
    return (
        <div>
            <button key="c2" disabled={!ready} 
              className="flex items-center border-[2px] border-red-100 text-red-100 
                rounded-[60px] px-[23.7px] md:px-[32px] py-[14.07px] md:py-[19px] font-bold text-[12px] md:text-[17px]"
              onClick={(e) => { shareImage(); }}
            >Share</button>
        </div>
    );
  }
  
  export default ShareButtons;