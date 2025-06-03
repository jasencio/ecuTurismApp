import React from 'react';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import OrganizationDetailCard from '@/components/OrganizationDetailCard';

// Mock data or fetch from API
const supervisorOrganization = {
  name: 'Explora Sierra Nevada',
  description: 'Organización dedicada a la exploración y conservación de la Sierra Nevada.',
  adminName: 'Juan Pérez',
  adminEmail: 'juan.perez@explorasierranevada.com',
  phone: '+34 123 456 789',
  address: 'Calle Principal 123, Granada',
  status: 'active' as const,
  createdAt: '2024-01-15',
  updatedAt: '2024-03-20',
};

const OrganizationProfileScreen = () => (
  <CustomSafeAreaView>
    <OrganizationDetailCard {...supervisorOrganization} />
  </CustomSafeAreaView>
);

export default OrganizationProfileScreen;