import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Filter, ShoppingCart, Clock, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import products from '../productData';
import { categories } from '../productData';

export default function ProductsPage() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const navigateToOrder = (productName = null) => {
    if (productName) {
      router.push({
        pathname: '/(tabs)/order',
        params: { product: productName },
      });
    } else {
      router.push('/(tabs)/order');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [expandedProduct, setExpandedProduct] = useState(null);

  const toggleProductDetail = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

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
            backgroundColor: 'white',
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 16,
            }}
          >
            Our Products
          </Text>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Search size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <TextInput
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 16,
                color: '#1F2937',
              }}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  backgroundColor:
                    selectedCategory === category ? '#059669' : 'white',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 12,
                  borderWidth: 1,
                  borderColor:
                    selectedCategory === category ? '#059669' : '#E5E7EB',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: selectedCategory === category ? 'white' : '#6B7280',
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <View key={product.id}>
              <TouchableOpacity
                onPress={() => toggleProductDetail(product.id)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                activeOpacity={0.95}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 8,
                    }}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 12,
                        marginRight: 16,
                        marginTop: -10,
                      }}
                    />
                    {/* Price below image */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'baseline',
                        marginTop: 8,
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
                        {product.price}
                      </Text>
                      {product.originalPrice && (
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#9CA3AF',
                            textDecorationLine: 'line-through',
                          }}
                        >
                          {product.originalPrice}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    {/* Stock Status Badge */}
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        backgroundColor:
                          product.stock === 'Fresh Today'
                            ? '#10B981'
                            : product.inStock
                            ? '#6B7280'
                            : '#EF4444',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <Clock
                        size={12}
                        color="white"
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: 'white',
                        }}
                      >
                        {!product.inStock ? 'Out of Stock' : product.stock}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1F2937',
                        marginBottom: 4,
                      }}
                    >
                      {product.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginBottom: 8,
                      }}
                    >
                      {product.description}
                    </Text>

                    {/* Rating */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1F2937',
                          marginLeft: 4,
                          fontWeight: '500',
                        }}
                      >
                        {product.rating}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'right',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigateToOrder(product.name)}
                        style={{
                          backgroundColor: product.inStock
                            ? '#059669'
                            : '#9CA3AF',
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderRadius: 8,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        activeOpacity={0.9}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart
                          size={14}
                          color="white"
                          style={{ marginRight: 4 }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: 'white',
                          }}
                        >
                          {product.inStock ? 'Quick Order' : 'Unavailable'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Expanded Product Details */}
              {expandedProduct === product.id && (
                <View
                  style={{
                    backgroundColor: '#F8FAFC',
                    marginHorizontal: 0,
                    marginTop: -16,
                    marginBottom: 16,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    padding: 16,
                    borderTopWidth: 1,
                    borderTopColor: '#E5E7EB',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: 12,
                    }}
                  >
                    Product Details
                  </Text>

                  {/* Benefits */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: 4,
                      }}
                    >
                      Benefits:
                    </Text>
                    {product.benefits.map((benefit, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 14,
                          color: '#6B7280',
                          marginLeft: 8,
                        }}
                      >
                        • {benefit}
                      </Text>
                    ))}
                  </View>

                  {/* Ingredients */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: 4,
                      }}
                    >
                      Ingredients:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginLeft: 8,
                      }}
                    >
                      {product.ingredients}
                    </Text>
                  </View>

                  {/* Packaging */}
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: 4,
                      }}
                    >
                      Packaging:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginLeft: 8,
                      }}
                    >
                      {product.packaging}
                    </Text>
                  </View>

                  {/* Order Button */}
                  <TouchableOpacity
                    onPress={() => navigateToOrder(product.name)}
                    style={{
                      backgroundColor: product.inStock ? '#059669' : '#9CA3AF',
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    activeOpacity={0.9}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart
                      size={16}
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
                      {product.inStock ? 'Add to Order' : 'Out of Stock'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#6B7280',
                textAlign: 'center',
              }}
            >
              No products found matching your search
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
