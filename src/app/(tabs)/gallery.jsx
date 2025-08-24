import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function GalleryPage() {
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const galleryImages = [
    {
      id: 1,
      title: 'Premium Feed Production',
      category: 'Production',
      image:
        'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop',
      description: 'High-quality feed being produced in our facility',
    },
    {
      id: 2,
      title: 'Healthy Chickens',
      category: 'Animals',
      image:
        'https://images.unsplash.com/photo-1548479652-d3b1e92b4a2d?w=600&h=400&fit=crop',
      description: 'Happy, healthy chickens raised with our premium feeds',
    },
    {
      id: 3,
      title: 'Farm Fresh Eggs',
      category: 'Products',
      image:
        'https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?w=600&h=400&fit=crop',
      description: 'Fresh eggs from our free-range chickens',
    },
    {
      id: 4,
      title: 'Feed Storage Facility',
      category: 'Facility',
      image:
        'https://images.unsplash.com/photo-1571414329451-9cb3d7b77880?w=600&h=400&fit=crop',
      description: 'Our modern storage facility keeping feeds fresh',
    },
    {
      id: 5,
      title: 'Local Farm Partnership',
      category: 'Community',
      image:
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop',
      description: 'Working with local farmers in Jorethang',
    },
    {
      id: 6,
      title: 'Quality Control',
      category: 'Production',
      image:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      description: 'Rigorous quality testing of all our feeds',
    },
    {
      id: 7,
      title: 'Duck Farm',
      category: 'Animals',
      image:
        'https://images.unsplash.com/photo-1518281361980-b26bfd8c7f88?w=600&h=400&fit=crop',
      description: 'Healthy ducks thriving on our specialized feed',
    },
    {
      id: 8,
      title: 'Pig Nutrition',
      category: 'Animals',
      image:
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop',
      description: 'Well-nourished pigs with balanced nutrition',
    },
    {
      id: 9,
      title: 'Feed Delivery',
      category: 'Service',
      image:
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop',
      description: 'Timely delivery across South Sikkim',
    },
  ];

  const categories = [
    'All',
    'Production',
    'Animals',
    'Products',
    'Facility',
    'Community',
    'Service',
  ];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = galleryImages.filter(
    (image) => selectedCategory === 'All' || image.category === selectedCategory
  );

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === 'next') {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
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
              marginBottom: 8,
            }}
          >
            Photo Gallery
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#6B7280',
              marginBottom: 16,
            }}
          >
            Discover our farm, products, and community
          </Text>

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

        {/* Image Grid */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {filteredImages.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={{
                  width: (width - 60) / 2, // Account for padding and gap
                  marginBottom: 20,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                onPress={() => openModal(image)}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: image.image }}
                  style={{
                    width: '100%',
                    height: 140,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                {/* Category Badge */}
                <View
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#059669',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    {image.category}
                  </Text>
                </View>

                <View style={{ padding: 12 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: 4,
                    }}
                  >
                    {image.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#6B7280',
                      lineHeight: 16,
                    }}
                  >
                    {image.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {filteredImages.length === 0 && (
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
              No images found in this category
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Lightbox Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: insets.top + 20,
              right: 20,
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
            onPress={closeModal}
          >
            <X size={24} color="white" />
          </TouchableOpacity>

          {/* Navigation Buttons */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
            onPress={() => navigateImage('prev')}
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
            onPress={() => navigateImage('next')}
          >
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>

          {selectedImage && (
            <View
              style={{
                width: width - 40,
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: selectedImage.image }}
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 12,
                  marginBottom: 20,
                }}
                resizeMode="cover"
              />

              {/* Image Info */}
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: 20,
                  borderRadius: 12,
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#1F2937',
                      flex: 1,
                      marginRight: 12,
                    }}
                  >
                    {selectedImage.title}
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#059669',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: 'white',
                      }}
                    >
                      {selectedImage.category}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6B7280',
                    lineHeight: 24,
                  }}
                >
                  {selectedImage.description}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
