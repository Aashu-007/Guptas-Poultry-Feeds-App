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
import { Star, Send, User } from 'lucide-react-native';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function ReviewsPage() {
  const insets = useSafeAreaInsets();
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
    product: '',
  });

  const reviews = [
    {
      id: 1,
      name: 'Karma Lepcha',
      rating: 5,
      date: '2 days ago',
      product: 'Premium Broiler Feed',
      comment:
        "Excellent quality feed! My chickens have grown much healthier and bigger since I started using Gupta's feeds. Highly recommended for all poultry farmers in Sikkim.",
      location: 'Namchi, South Sikkim',
    },
    {
      id: 2,
      name: 'Pemba Sherpa',
      rating: 5,
      date: '1 week ago',
      product: 'Layer Feed Special',
      comment:
        'Amazing results with egg production! My hens are laying more eggs than ever before. The calcium content is perfect. Thank you Gupta ji!',
      location: 'Ravangla, South Sikkim',
    },
    {
      id: 3,
      name: 'Tashi Bhutia',
      rating: 4,
      date: '2 weeks ago',
      product: 'Day-Old Chicks',
      comment:
        'Good quality chicks with high survival rate. Very healthy and active. Quick delivery service. Will order again soon.',
      location: 'Jorethang, South Sikkim',
    },
    {
      id: 4,
      name: 'Mingma Tamang',
      rating: 5,
      date: '3 weeks ago',
      product: 'Pig Grower Feed',
      comment:
        'Best pig feed in the market! My pigs have gained good weight in just 2 months. Very satisfied with the quality and service.',
      location: 'Melli, South Sikkim',
    },
    {
      id: 5,
      name: 'Dawa Lama',
      rating: 4,
      date: '1 month ago',
      product: 'Farm Fresh Eggs',
      comment:
        'Fresh and tasty eggs! Perfect for my family breakfast. Regular supply is maintained. Good packaging and delivery.',
      location: 'Jorethang, South Sikkim',
    },
    {
      id: 6,
      name: 'Phurba Lepcha',
      rating: 5,
      date: '1 month ago',
      product: 'Duckling Starter Feed',
      comment:
        'Excellent feed for ducklings! All my ducklings are growing healthy and strong. Will definitely recommend to other duck farmers.',
      location: 'Singtam, East Sikkim',
    },
  ];

  const handleRatingPress = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Review Submitted!',
      'Thank you for your feedback! Your review has been submitted and will be visible after approval.',
      [
        {
          text: 'OK',
          onPress: () => {
            setNewReview({
              name: '',
              rating: 0,
              comment: '',
              product: '',
            });
            setShowAddReview(false);
          },
        },
      ]
    );
  };

  const renderStars = (rating, size = 16, onPress = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => onPress && onPress(i)}
          disabled={!onPress}
          style={{ marginRight: 2 }}
        >
          <Star
            size={size}
            color="#F59E0B"
            fill={i <= rating ? '#F59E0B' : 'transparent'}
          />
        </TouchableOpacity>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((review) => review.rating === rating).length
  );

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
              Customer Reviews
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#6B7280',
                marginBottom: 20,
              }}
            >
              What our customers say about us
            </Text>

            {/* Rating Summary */}
            <View
              style={{
                backgroundColor: '#F8FAFC',
                padding: 16,
                borderRadius: 12,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: '700',
                    color: '#1F2937',
                    marginRight: 12,
                  }}
                >
                  {averageRating.toFixed(1)}
                </Text>
                <View>
                  {renderStars(Math.round(averageRating), 20)}
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                      marginTop: 4,
                    }}
                  >
                    Based on {reviews.length} reviews
                  </Text>
                </View>
              </View>

              {/* Rating Breakdown */}
              {ratingCounts.map((count, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                      width: 20,
                    }}
                  >
                    {5 - index}
                  </Text>
                  <Star
                    size={14}
                    color="#F59E0B"
                    fill="#F59E0B"
                    style={{ marginRight: 8 }}
                  />
                  <View
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: '#E5E7EB',
                      borderRadius: 3,
                      marginRight: 8,
                    }}
                  >
                    <View
                      style={{
                        width: `${(count / reviews.length) * 100}%`,
                        height: '100%',
                        backgroundColor: '#F59E0B',
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#6B7280',
                      width: 20,
                    }}
                  >
                    {count}
                  </Text>
                </View>
              ))}
            </View>

            {/* Add Review Button */}
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
              onPress={() => setShowAddReview(!showAddReview)}
              activeOpacity={0.9}
            >
              <Send size={16} color="white" style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Write a Review
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add Review Form */}
          {showAddReview && (
            <View
              style={{
                backgroundColor: 'white',
                margin: 20,
                padding: 20,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
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
                Share Your Experience
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
                  Your Name *
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
                  placeholder="Enter your name"
                  value={newReview.name}
                  onChangeText={(value) =>
                    setNewReview((prev) => ({ ...prev, name: value }))
                  }
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Product (Optional)
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
                  placeholder="Which product did you purchase?"
                  value={newReview.product}
                  onChangeText={(value) =>
                    setNewReview((prev) => ({ ...prev, product: value }))
                  }
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Rating *
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {renderStars(newReview.rating, 24, handleRatingPress)}
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                      marginLeft: 12,
                    }}
                  >
                    {newReview.rating > 0
                      ? `${newReview.rating} star${
                          newReview.rating > 1 ? 's' : ''
                        }`
                      : 'Tap to rate'}
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Your Review *
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
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                  placeholder="Tell us about your experience with our products..."
                  value={newReview.comment}
                  onChangeText={(value) =>
                    setNewReview((prev) => ({ ...prev, comment: value }))
                  }
                  multiline
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#F3F4F6',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => setShowAddReview(false)}
                  activeOpacity={0.9}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#6B7280',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#059669',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}
                  onPress={handleSubmitReview}
                  activeOpacity={0.9}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    Submit Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Reviews List */}
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            {reviews.map((review) => (
              <View
                key={review.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                {/* Review Header */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 4,
                      }}
                    >
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: '#059669',
                          borderRadius: 16,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                        }}
                      >
                        <User size={16} color="white" />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#1F2937',
                          }}
                        >
                          {review.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#9CA3AF',
                          }}
                        >
                          {review.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#9CA3AF',
                    }}
                  >
                    {review.date}
                  </Text>
                </View>

                {/* Rating */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  {renderStars(review.rating)}
                  {review.product && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#059669',
                        marginLeft: 12,
                        fontWeight: '500',
                      }}
                    >
                      {review.product}
                    </Text>
                  )}
                </View>

                {/* Review Comment */}
                <Text
                  style={{
                    fontSize: 15,
                    color: '#374151',
                    lineHeight: 22,
                  }}
                >
                  {review.comment}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
