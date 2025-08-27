import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShoppingCart,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import Logo from '../../../assets/images/logo1.png';
import todaysDeals from '../constants/todaysDeals';

export default function HomePage() {
  const insets = useSafeAreaInsets();

  const openWhatsApp = () => {
    const phoneNumber = '+919382295684'; // Example number
    const message = 'Hello! I would like to inquire about your poultry feeds.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url);
  };

  const navigateToOrder = () => {
    router.push('/(tabs)/order');
  };

  const quickOrder = (productTitle) => {
    // Navigate to order page with product pre-selected
    router.push('/(tabs)/order');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header/Hero Section */}
        <View
          style={{
            backgroundColor: '#059669',
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            paddingBottom: 40,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {/* Logo and Brand */}
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Image
              source={Logo}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 12,
                backgroundColor: '#fff',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Gupta's Poultry Feeds
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#E6FFFA',
                textAlign: 'center',
                fontWeight: '500',
                letterSpacing: 1,
              }}
            >
              Quality Feeds, Healthy Growth
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#B2F5EA',
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              Nayabazar, West Sikkim - 737121
            </Text>
          </View>

          {/* Main Action Buttons */}
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={navigateToOrder}
              style={{
                backgroundColor: 'white',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              activeOpacity={0.9}
            >
              <ShoppingCart
                size={20}
                color="#059669"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#059669',
                }}
              >
                Order Fresh Feeds Today
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openWhatsApp}
              style={{
                backgroundColor: '#25D366',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
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
                Chat on WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Best Deals Section */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Sparkles size={24} color="#F59E0B" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#1F2937',
              }}
            >
              Today's Best Deals
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            style={{ marginHorizontal: -20 }}
          >
            {todaysDeals.map((deal, index) => (
              <View
                key={deal.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginLeft: 20,
                  marginBottom: 5,
                  width: 280,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Image
                  source={{ uri: deal.image }}
                  style={{
                    width: '100%',
                    height: 140,
                    borderRadius: 12,
                    marginBottom: 12,
                  }}
                />

                {/* Stock Status Badge */}
                <View
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    backgroundColor:
                      deal.stock === 'Fresh Today' ? '#10B981' : '#6B7280',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Clock size={12} color="white" style={{ marginRight: 4 }} />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    {deal.stock}
                  </Text>
                </View>

                {/* Discount Badge */}
                <View
                  style={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    backgroundColor: '#EF4444',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: 'white',
                    }}
                  >
                    {deal.discount}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 8,
                  }}
                >
                  {deal.title}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#059669',
                      marginRight: 8,
                    }}
                  >
                    {deal.salePrice}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#9CA3AF',
                      textDecorationLine: 'line-through',
                    }}
                  >
                    {deal.originalPrice}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => quickOrder(deal.title)}
                  style={{
                    backgroundColor: '#059669',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  activeOpacity={0.9}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    Quick Order
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Features Section */}
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 30,
            marginHorizontal: 20,
            borderRadius: 16,
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
              fontWeight: '700',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Why Choose Gupta's Poultry Feeds? 🐥
          </Text>

          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                <Text style={{ fontSize: 20 }}>🌱</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 2,
                  }}
                >
                  Premium Quality Feeds
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Nutritionally balanced for optimal growth
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                <Text style={{ fontSize: 20 }}>🚚</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 2,
                  }}
                >
                  Fast Delivery
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Same-day delivery across Jorethang
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                <Text style={{ fontSize: 20 }}>💰</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 2,
                  }}
                >
                  Best Prices
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Competitive rates with bulk discounts
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
