import React from 'react';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import OrganizationDetailCard from '@/components/OrganizationDetailCard';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadingSelector, organizationSelector } from '@/selectors/adminCompanySelector';
import { sessionDataSelector } from '@/selectors/sessionSelector';
import { getAdminCompanyOrganization } from '@/slices/adminCompanySlice';
import { useFocusEffect } from 'expo-router';
import LoadingScreen from '@/components/LoadingScreen';

const OrganizationProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const organization = useSelector(organizationSelector);
  const sessionData = useSelector(sessionDataSelector);
  const loading = useSelector(loadingSelector);

  const getOrganizationsData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getAdminCompanyOrganization());
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      getOrganizationsData();
    }, [getOrganizationsData])
  );

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <CustomSafeAreaView>
      <OrganizationDetailCard organization={organization} />
    </CustomSafeAreaView>
  );
};

export default OrganizationProfileScreen;