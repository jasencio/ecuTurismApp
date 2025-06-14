import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Text, Surface } from 'react-native-paper';
import { useFocusEffect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { guidesListSelector, loadingGuidesSelector } from '@/selectors/adminCompanyGuideSelectors';
import { sessionDataSelector } from '@/selectors/sessionSelector';
import LoadingScreen from '@/components/LoadingScreen';
import { getGuides } from '@/slices/adminCompanyGuideSlice';
import { AppDispatch } from '@/store';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponible':
      return '#4CAF50'; // Green
    case 'En ruta':
      return '#FF9800'; // Orange
    case 'No disponible':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey
  }
};

const GuideList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const guides = useSelector(guidesListSelector);
  const isLoadingGuides = useSelector(loadingGuidesSelector);
  const sessionData = useSelector(sessionDataSelector);

  const handleGuidePress = (guideId: string) => {
    router.push(`/home/admin_organization/guideDetail?guideId=${guideId}`);
  };

  const getGuidesData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getGuides());
    }
  }, [sessionData, dispatch]);

  // Fetch when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getGuidesData();
    }, [getGuidesData])
  );

  if (isLoadingGuides) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <List.Section>
          {guides.map((guide) => (
            <Surface
              key={guide.id}
              style={styles.listItemContainer}
              elevation={0}
            >
              <List.Item
                title={
                  <View style={styles.titleContainer}>
                    <Text style={styles.nameText}>{guide.name}</Text>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor((guide as any).status || 'No disponible') }]} />
                  </View>
                }
                description={
                  <View style={styles.descriptionContainer}>
                    <View style={styles.contactContainer}>
                      <Text style={styles.contactText}>{guide.email}</Text>
                      <Text style={styles.contactText}>{guide.phone}</Text>
                    </View>
                  </View>
                }
                right={props => (
                  <List.Icon {...props} icon="chevron-right" color="#666" />
                )}
                style={styles.listItem}
                onPress={() => handleGuidePress(guide.id)}
              />
            </Surface>
          ))}
        </List.Section>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  listItem: {
    paddingVertical: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  contactContainer: {
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  contactText: {
    fontSize: 13,
    color: '#666',
  },
});

export default GuideList;