import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Navigation,
} from 'lucide-react-native';

export default function ContactPage() {
  const insets = useSafeAreaInsets();

  const openWhatsApp = () => {
    const phoneNumber = '+919382295684';
    const message = 'Hello! I would like to inquire about your poultry feeds.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url);
  };

  const makePhoneCall = () => {
    const phoneNumber = '+919382295684';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = () => {
    const email = 'guptapoultryfeeds@gmail.com';
    const subject = 'Inquiry about Poultry Feeds';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
  };

  const openMaps = () => {
    const address = "Gupta's Poultry Feeds, Nayabazar, West Sikkim - 737121";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: '+919382295684',
      description: 'Quick response via WhatsApp',
      action: openWhatsApp,
      color: '#25D366',
    },
    {
      icon: Phone,
      title: 'Phone Call',
      subtitle: '+919382295684',
      description: 'Direct call for urgent queries',
      action: makePhoneCall,
      color: '#059669',
    },
    {
      icon: Mail,
      title: 'Email',
      subtitle: 'guptapoultryfeeds@gmail.com',
      description: 'Send detailed inquiries',
      action: sendEmail,
      color: '#3B82F6',
    },
    {
      icon: Navigation,
      title: 'Directions',
      subtitle: 'Get directions to our store',
      description: 'Navigate using Google Maps',
      action: openMaps,
      color: '#EF4444',
    },
  ];

  const businessHours = [
    { day: 'Mon - Wed', time: '7:00 AM - 8:00 PM' },
    { day: 'Thu', time: 'Closed' },
    { day: 'Fri - Sun', time: '7:00 AM - 8:00 PM' },
  ];

  const services = [
    'Premium Quality Feeds',
    'Day-Old Chicks & Ducklings',
    'Farm Fresh Eggs',
    'Home Delivery Service',
    'Bulk Order Discounts',
    'Expert Consultation',
    'Quality Assurance',
    'After-Sales Support',
  ];

  return (
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
            Get In Touch
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#E6FFFA',
              textAlign: 'center',
            }}
          >
            We're here to help with all your poultry needs
          </Text>
        </View>

        {/* Contact Methods */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 16,
            }}
          >
            Contact Us
          </Text>

          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
              onPress={method.action}
              activeOpacity={0.9}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: method.color,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <method.icon size={24} color="white" />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 4,
                  }}
                >
                  {method.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: method.color,
                    fontWeight: '500',
                    marginBottom: 2,
                  }}
                >
                  {method.subtitle}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6B7280',
                  }}
                >
                  {method.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Store Information */}
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
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
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 16,
            }}
          >
            Store Information
          </Text>

          {/* Address */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#ECFDF5',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <MapPin size={20} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 4,
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6B7280',
                  lineHeight: 20,
                }}
              >
                Gupta's Poultry Feeds{'\n'}
                Main Bazaar, Nayabazar{'\n'}
                West Sikkim{'\n'}
                India - 737121
              </Text>
            </View>
          </View>

          {/* Business Hours */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#ECFDF5',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Clock size={20} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 8,
                }}
              >
                Business Hours
              </Text>
              {businessHours.map((hour, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                    }}
                  >
                    {hour.day}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1F2937',
                      fontWeight: '500',
                    }}
                  >
                    {hour.time}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Services */}
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
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
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 16,
            }}
          >
            Our Services
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {services.map((service, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#F0FDF4',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#BBF7D0',
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: '#166534',
                    fontWeight: '500',
                  }}
                >
                  {service}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Map Section */}
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
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
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 16,
            }}
          >
            Find Us
          </Text>

          {/* Map Placeholder */}
          <TouchableOpacity
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
            onPress={openMaps}
            activeOpacity={0.9}
          >
            <MapPin size={48} color="#6B7280" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F2937',
                marginTop: 8,
                marginBottom: 4,
              }}
            >
              Tap to Open in Maps
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
              }}
            >
              Get directions to our store location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#059669',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={openMaps}
            activeOpacity={0.9}
          >
            <Navigation size={16} color="white" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
              }}
            >
              Get Directions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View
          style={{
            backgroundColor: '#F0FDF4',
            marginHorizontal: 20,
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
              textAlign: 'center',
            }}
          >
            💚 Thank you for choosing Gupta's Poultry Feeds! We're committed to
            providing the best quality feeds and service to farmers across South
            Sikkim.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
