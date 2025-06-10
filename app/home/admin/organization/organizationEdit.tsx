import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { getOrganization, updateOrganization } from "@/slices/organizationSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import {
  loadingOrganizationSelector,
  loadingOrganizationUpdateSelector,
  organizationSelector,
  successOrganizationUpdateSelector,
} from "@/selectors/organizationSelector";
import LoadingScreen from "@/components/LoadingScreen";
import OrganizationForm, { OrganizationFormData } from "@/components/OrganizationForm";

const OrganizationEdit = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const organization = useSelector(organizationSelector);
  const isLoadingOrganization = useSelector(loadingOrganizationSelector);
  const isLoadingOrganizationUpdate = useSelector(loadingOrganizationUpdateSelector);
  const successOrganizationUpdate = useSelector(successOrganizationUpdateSelector);

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

  const handleSubmit = (data: OrganizationFormData) => {
    dispatch(updateOrganization({
      organization: {
        ...data,
        id: id as string,
        isActive: data.isActive ?? false
      },
      image: data.image
    }));
  };

  const handleCancel = () => {
    router.back();
  };

  React.useEffect(() => {
    if (successOrganizationUpdate) {
      router.push('/home/admin/organization/organizationList');
    }
  }, [successOrganizationUpdate]);

  if (isLoadingOrganization) {
    return <LoadingScreen />;
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <OrganizationForm
          organization={organization}
          isLoading={isLoadingOrganization}
          isLoadingUpdate={isLoadingOrganizationUpdate}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          showActiveToggle={true}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default OrganizationEdit;
