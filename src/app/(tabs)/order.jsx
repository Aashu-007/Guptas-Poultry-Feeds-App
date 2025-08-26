import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  ChevronDown,
  ShoppingCart,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react-native';
import * as Linking from 'expo-linking';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';
import products from '../productData';

export default function OrderPage() {
  const insets = useSafeAreaInsets();
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: '1',
    deliveryType: 'delivery',
    address: '',
    date: '',
    time: '',
    notes: '',
  });

  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  const handleInputChange = (field, value) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    // Validate form
    if (!orderForm.name || !orderForm.phone || !orderForm.product) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Format order details for WhatsApp
    const orderDetails = `
🛒 *New Order from Gupta's Poultry Feeds*

👤 *Customer Details:*
Name: ${orderForm.name}
Phone: ${orderForm.phone}

📦 *Order Details:*
Product: ${orderForm.product}
Quantity: ${orderForm.quantity}

🚚 *Delivery:*
Type: ${
      orderForm.deliveryType === 'delivery' ? 'Home Delivery' : 'Store Pickup'
    }
${
  orderForm.deliveryType === 'delivery' && orderForm.address
    ? `Address: ${orderForm.address}`
    : ''
}
${orderForm.date ? `Date: ${orderForm.date}` : ''}
${orderForm.time ? `Time: ${orderForm.time}` : ''}

${orderForm.notes ? `📝 *Notes:* ${orderForm.notes}` : ''}

Please confirm this order. Thank you! 🐥
    `.trim();

    const phoneNumber = '+919382295684';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      orderDetails
    )}`;

    Linking.openURL(url)
      .then(() => {
        Alert.alert(
          'Order Sent!',
          'Your order has been sent via WhatsApp. We will contact you shortly to confirm.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setOrderForm({
                  name: '',
                  phone: '',
                  product: '',
                  quantity: '1',
                  deliveryType: 'delivery',
                  address: '',
                  date: '',
                  time: '',
                  notes: '',
                });
              },
            },
          ]
        );
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Could not open WhatsApp. Please make sure WhatsApp is installed.'
        );
      });
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <StatusBar style="dark" />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View
            style={{
              backgroundColor: '#059669',
              paddingTop: insets.top + 20,
              paddingHorizontal: 20,
              paddingBottom: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Order Fresh Feeds
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#E6FFFA',
                textAlign: 'center',
              }}
            >
              Fill in your details and we'll get back to you
            </Text>
          </View>

          {/* Order Form */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 30,
            }}
          >
            {/* Customer Information */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 16,
                }}
              >
                Customer Information
              </Text>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Full Name *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: '#1F2937',
                  }}
                  placeholder="Enter your full name"
                  value={orderForm.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Phone Number *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: '#1F2937',
                  }}
                  placeholder="Enter your phone number"
                  value={orderForm.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Product Selection */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 16,
                }}
              >
                Product Details
              </Text>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Select Product *
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => setShowProductDropdown(!showProductDropdown)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: orderForm.product ? '#1F2937' : '#9CA3AF',
                    }}
                  >
                    {orderForm.product || 'Select a product'}
                  </Text>
                  <ChevronDown size={20} color="#6B7280" />
                </TouchableOpacity>

                {showProductDropdown && (
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 10,
                      marginTop: 8,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    {products.map((product, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderBottomWidth:
                            index < products.length - 1 ? 1 : 0,
                          borderBottomColor: '#F3F4F6',
                        }}
                        onPress={() => {
                          handleInputChange('product', product.name);
                          setShowProductDropdown(false);
                        }}
                      >
                        <Text style={{ fontSize: 16, color: '#1F2937' }}>
                          {product.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Quantity
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: '#1F2937',
                  }}
                  placeholder="Enter quantity"
                  value={orderForm.quantity}
                  onChangeText={(value) => handleInputChange('quantity', value)}
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Delivery Options */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 16,
                }}
              >
                Delivery Options
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 16,
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      orderForm.deliveryType === 'delivery'
                        ? '#059669'
                        : '#F9FAFB',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor:
                      orderForm.deliveryType === 'delivery'
                        ? '#059669'
                        : '#E5E7EB',
                  }}
                  onPress={() => handleInputChange('deliveryType', 'delivery')}
                >
                  <MapPin
                    size={16}
                    color={
                      orderForm.deliveryType === 'delivery'
                        ? 'white'
                        : '#6B7280'
                    }
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color:
                        orderForm.deliveryType === 'delivery'
                          ? 'white'
                          : '#6B7280',
                    }}
                  >
                    Delivery
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      orderForm.deliveryType === 'pickup'
                        ? '#059669'
                        : '#F9FAFB',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor:
                      orderForm.deliveryType === 'pickup'
                        ? '#059669'
                        : '#E5E7EB',
                  }}
                  onPress={() => handleInputChange('deliveryType', 'pickup')}
                >
                  <ShoppingCart
                    size={16}
                    color={
                      orderForm.deliveryType === 'pickup' ? 'white' : '#6B7280'
                    }
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color:
                        orderForm.deliveryType === 'pickup'
                          ? 'white'
                          : '#6B7280',
                    }}
                  >
                    Pickup
                  </Text>
                </TouchableOpacity>
              </View>

              {orderForm.deliveryType === 'delivery' && (
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: 8,
                    }}
                  >
                    Delivery Address
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: '#1F2937',
                      minHeight: 80,
                      textAlignVertical: 'top',
                    }}
                    placeholder="Enter your complete address"
                    value={orderForm.address}
                    onChangeText={(value) =>
                      handleInputChange('address', value)
                    }
                    multiline
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: 8,
                    }}
                  >
                    Preferred Date
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: '#1F2937',
                    }}
                    placeholder="DD/MM/YYYY"
                    value={orderForm.date}
                    onChangeText={(value) => handleInputChange('date', value)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: 8,
                    }}
                  >
                    Time Slot
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: '#1F2937',
                    }}
                    placeholder="e.g. 8AM-10AM"
                    value={orderForm.time}
                    onChangeText={(value) => handleInputChange('time', value)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>

            {/* Additional Notes */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 30,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 16,
                }}
              >
                Additional Notes
              </Text>

              <TextInput
                style={{
                  backgroundColor: '#F9FAFB',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 10,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16,
                  color: '#1F2937',
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
                placeholder="Any special instructions or requirements..."
                value={orderForm.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                multiline
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#059669',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
                marginBottom: 20,
              }}
              onPress={handleSubmitOrder}
              activeOpacity={0.9}
            >
              <MessageCircle
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Send Order via WhatsApp
              </Text>
            </TouchableOpacity>

            {/* Info Text */}
            <View
              style={{
                backgroundColor: '#F0FDF4',
                padding: 16,
                borderRadius: 12,
                borderLeftWidth: 4,
                borderLeftColor: '#059669',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#166534',
                  lineHeight: 20,
                }}
              >
                📱 Your order will be sent via WhatsApp for quick confirmation.
                We'll respond within 10 minutes to confirm availability and
                finalize the details.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
