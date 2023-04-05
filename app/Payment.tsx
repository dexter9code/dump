import {useEffect, useState} from 'react';
import {
  CardField,
  useStripe,
  useConfirmPayment,
  useConfirmSetupIntent,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
  TextInput,
} from 'react-native';

const KEY = `sk_test_51LIBpPSB6X3CnjxjCOl3pjiSaomnXNhmgKmcPpapvL9yuXF4uSYXct1Xu858S0lcMSDODUXTLyKmwZ1wjBpJTomD007wL2BUxF`;

const Payment = () => {
  // const { confirmPayment } = useStripe();
  // const { confirmPayment, loading } = useConfirmPayment();
  // const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const [plan, setPlan] = useState('');

  const [cardData, setCardData] = useState<boolean>(false);

  // initPaymentSheet -> initialize our payment sheet[payment]
  // presentPaymentSheet -> present the UI of payment sheet

  const {
    confirmPaymentSheetPayment,
    initPaymentSheet,
    loading,
    presentPaymentSheet,
  } = usePaymentSheet();

  const URL = `http://192.168.1.34:3000/create-payment`;

  // useEffect(() => {
  //   fetch(`http://192.168.1.34:3000/create-payment`)
  //     .then(data => data.json())
  //     .then(res => {
  //       console.log(`ett`, res);
  //       setCardData(res?.clientSecret);
  //     });
  // }, []);

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  const fetchPaymentSheetParams = async (id: string) => {
    const obj = {planId: id};
    const response = await fetch(URL, {
      method: `POST`,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj),
    });

    const {clientSecret, ephemeralKey, customer} = await response.json();
    return {
      clientSecret,
      ephemeralKey,
      customer,
    };
  };

  async function initializePaymentSheet(id: string) {
    const {clientSecret, customer, ephemeralKey} =
      await fetchPaymentSheetParams(id);

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Nike Inc',
      allowsDelayedPaymentMethods: true,
      returnURL: `stripe-example://stripe-redirect`, // testing only
      applePay: {
        merchantCountryCode: `IN`,
      },
      googlePay: {
        merchantCountryCode: 'IN',
        testEnv: true,
        currencyCode: 'inr',
      },
    });

    if (error) {
      Alert.alert(`Error`, `${error.code} , ${error.message}`);
    } else {
      setCardData(true);
    }
  }

  const buy = async (id: string) => {
    await initializePaymentSheet(id);

    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${error.message}`);
    } else {
      Alert.alert(`Success`, `Payment has been made Successfully`);
      setCardData(false);
    }
  };

  // const onPayment = async () => {
  //   // const {error, paymentIntent} = await confirmPayment(cardData, {
  //   //   paymentMethodType: 'Card',
  //   //   paymentMethodData: {
  //   //     billingDetails: {
  //   //       email: `John_doe@hotmail.com`,
  //   //     },
  //   //   },
  //   // });

  //   const response = await fetch(URL, {
  //     method: `POST`,
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       paymentMethodType: 'Card',
  //       currency: 'inr',
  //     }),
  //   });

  //   const {clientSecret} = await response.json();

  //   const {error, setupIntent} = await confirmSetupIntent(clientSecret, {
  //     paymentMethodType: `Card`,
  //     paymentMethodData: {
  //       billingDetails: {
  //         name: `testuser1`,
  //         email: `testuser@hotmail.com`,
  //       },
  //     },
  //   });

  //   if (error) {
  //     Alert.alert(`Error`, `${error.message}`);
  //   } else {
  //     Alert.alert(
  //       `Success`,
  //       `Payment has been made with id ${setupIntent.id} of amount ${setupIntent.status}`,
  //     );
  //   }
  // };

  return (
    <View style={styles.root}>
      <View style={{width: 150, height: 150}}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          source={{
            uri: `https://m.media-amazon.com/images/I/41402xUnyNL._SX425_.jpg`,
          }}
        />
      </View>
      <CardField
        // onCardChange={data => console.log(data)}
        postalCodeEnabled={false}
        style={{
          height: 40,
          width: '100%',
          //   padding: 10,
        }}
        cardStyle={{borderWidth: 1, borderColor: '#ccc', textErrorColor: 'red'}}
      />
      <TextInput
        placeholder="Enter your plan id here"
        onChangeText={e => setPlan(e)}
        value={plan}
        style={{
          backgroundColor: '#ccc',
          width: '70%',
          marginVertical: 10,
          padding: 8,
          borderRadius: 10,
        }}
      />
      <Button title="Pay" onPress={() => buy(plan)} />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
