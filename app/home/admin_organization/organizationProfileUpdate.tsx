import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  getOrganization,
  updateOrganization,
} from "@/slices/organizationSlice";
import { sessionDataSelector } from "@/selectors/sessionSelector";
import {
  loadingSelector,
  loadingOrganizationUpdateSelector,
  successOrganizationUpdateSelector,
  organizationSelector,
} from "@/selectors/adminCompanySelector";
import LoadingScreen from "@/components/LoadingScreen";
import OrganizationForm, {
  OrganizationFormData,
} from "@/components/OrganizationForm";
import { getAdminCompanyOrganization, updateAdminCompanyOrganization } from "@/slices/adminCompanySlice";

const OrganizationProfileUpdate = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const sessionData = useSelector(sessionDataSelector);
  const organization = useSelector(organizationSelector);
  const isLoadingOrganization = useSelector(loadingSelector);
  const isLoadingOrganizationUpdate = useSelector(
    loadingOrganizationUpdateSelector
  );
  const successOrganizationUpdate = useSelector(
    successOrganizationUpdateSelector
  );

  const fetchOrganizationData = React.useCallback(() => {
    if (sessionData) {
      dispatch(getAdminCompanyOrganization());
    }
  }, [sessionData, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrganizationData();
    }, [fetchOrganizationData])
  );

  const handleSubmit = (data: OrganizationFormData) => {
    if (sessionData) {
      dispatch(
        updateAdminCompanyOrganization({
          organization: {
            ...data,
          },
          image: data.image,
        })
      );
    }
  };

  const handleCancel = () => {
    router.back();
  };

  React.useEffect(() => {
    if (successOrganizationUpdate) {
      router.back();
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

export default OrganizationProfileUpdate;
