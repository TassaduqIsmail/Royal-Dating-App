import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './checkoutpage';
function stripeProvider({payData}) {
  return (
    <StripeProvider
      publishableKey="pk_test_51NtU3JELcPupjCJqr7aGfK8l8CfGB9ISYMLjobATvK2tJ9wO6oQGstcn12LweV9RzZtgCcwvPU0GkfMnWyUuyXot009GNIYQfV"
      urlScheme="@string/fb_login_protocol_scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{com.royal}}" // required for Apple Pay
    >
      <CheckoutScreen payData ={payData} />
    </StripeProvider>
  );
}

export default stripeProvider;  