import React from 'react';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import OrganizationDetailCard from '@/components/OrganizationDetailCard';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { sessionDataSelector } from '@/selectors/sessionSelector';
import { loadingOrganizationSelector, organizationSelector } from '@/selectors/organizationSelector';
import { getOrganization } from '@/slices/organizationSlice';
import LoadingScreen from '@/components/LoadingScreen';

const OrganizationDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const organization = useSelector(organizationSelector);
  const isLoadingOrganization = useSelector(loadingOrganizationSelector);

  const fetchOrganizationData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getOrganization(id as string));
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrganizationData();
    }, [fetchOrganizationData])
  );


  if (isLoadingOrganization) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <OrganizationDetailCard
        organization={organization}
        onEdit={() => router.push({ pathname: '/home/admin/organization/organizationEdit', params: { id } })}
      />
    </CustomSafeAreaView>
  );
};

export default OrganizationDetail;