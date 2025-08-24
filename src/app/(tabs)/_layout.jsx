import { Tabs } from 'expo-router';
import {
  Home,
  Package,
  ShoppingCart,
  Image,
  Star,
  MessageCircle,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Add this import

export default function TabLayout() {
  const insets = useSafeAreaInsets(); // Get insets

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
          paddingTop: 4,
          height: 65 + insets.bottom, // Add safe area to height
          paddingBottom: insets.bottom, // Add safe area to padding
        },
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => <Package color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order Now',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }) => <Image color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: 'Reviews',
          tabBarIcon: ({ color, size }) => <Star color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
