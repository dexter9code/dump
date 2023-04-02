import {Button, Image, Pressable, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {useState} from 'react';

const ImagePickScreen = () => {
  const [currentImage, setCurrentImage] = useState('');
  const [testImage, setTestImage] = useState('');
  const [imageData, setImageData] = useState(false);
  const onPressHandler = async () => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(async result => {
        if (result === 'granted') {
          //   const img = await launchImageLibrary({
          //     mediaType: 'photo',
          //     includeBase64: true,
          //   });
          //   console.log(img);

          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            // includeBase64: true,
          }).then(image => {
            console.log(image);
            // setImageData(image);
            setCurrentImage(image.sourceURL);
            //   setTestImage(image.path);
          });
        }
      })
      .catch(errr => console.log(errr));
    console.log(`test`);
  };

  const updateHandler = async () => {
    const newData = new FormData();
    newData.append('user_img', {
      uri: currentImage,
      name: 'image.png',
      filename: 'image',
      type: 'image/png',
    });
    // Change the url according to the system
    const response = await fetch(`http://192.168.1.34:5050/upload-img`, {
      method: `POST`,
      body: newData,
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
    });
    const result = await response.json();
    if (result.message === 'Success') {
      setImageData(true);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={onPressHandler}>
        <Text>Upload image</Text>
      </Pressable>

      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: currentImage}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Button title="update" onPress={updateHandler} />
      {imageData && <Text>Image upload is success</Text>}
    </View>
  );
};

export default ImagePickScreen;
