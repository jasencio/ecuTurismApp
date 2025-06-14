import { Organization } from '@/types/Organization';
import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Surface, useTheme, IconButton, Chip } from 'react-native-paper';

export interface OrganizationDetailCardProps {
  organization?: Organization;
  onEdit?: () => void;
}

const DAYS_OF_WEEK = [
  { label: 'Lunes', value: 'Monday' },
  { label: 'Martes', value: 'Tuesday' },
  { label: 'Miércoles', value: 'Wednesday' },
  { label: 'Jueves', value: 'Thursday' },
  { label: 'Viernes', value: 'Friday' },
  { label: 'Sábado', value: 'Saturday' },
  { label: 'Domingo', value: 'Sunday' },
];

const OrganizationDetailCard: React.FC<OrganizationDetailCardProps> = ({
  organization,
  onEdit,
}) => {
  const theme = useTheme();
  const { 
    name, 
    description, 
    phone, 
    address, 
    isActive, 
    createdAt, 
    updatedAt, 
    image,
    timeOpenWeek,
    timeCloseWeek,
    timeOpenSaturday,
    timeCloseSaturday,
    timeOpenSunday,
    timeCloseSunday,
    daysWeekEnabled
  } = organization ?? {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}> 
            {name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: isActive ? '#4CAF50' : '#9E9E9E' }]}> 
            <Text style={styles.statusText}>
              {isActive ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        </View>
        {onEdit && (
          <IconButton
            icon="pencil"
            size={24}
            onPress={onEdit}
          />
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {image?.publicUrl && (
          <Surface style={[styles.imageContainer, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <Image
              source={{ uri: image.publicUrl }}
              style={styles.organizationImage}
              resizeMode="cover"
            />
          </Surface>
        )}

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}> 
            Información General
          </Text>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Descripción:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {description}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Dirección:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {address}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Teléfono:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {phone}
            </Text>
          </View>
        </Surface>

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}> 
            Horario de Atención
          </Text>

          <View style={styles.daysContainer}>
            {DAYS_OF_WEEK.map((day) => (
              <Chip
                key={day.value}
                selected={daysWeekEnabled?.includes(day.value)}
                style={daysWeekEnabled?.includes(day.value) ? styles.dayChipSelected : styles.dayChipNotSelected}
                showSelectedCheck={false}
                textStyle={{ color: theme.colors.onPrimary }}
              >
                {day.label}
              </Chip>
            ))}
          </View>

          <View style={styles.timeSection}>
            <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
              Días de Semana (Lunes - Viernes)
            </Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Apertura:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeOpenWeek}
                </Text>
              </View>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Cierre:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeCloseWeek}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.timeSection}>
            <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
              Sábado
            </Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Apertura:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeOpenSaturday}
                </Text>
              </View>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Cierre:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeCloseSaturday}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.timeSection}>
            <Text variant="titleSmall" style={[styles.timeSectionTitle, { color: theme.colors.onSurface }]}>
              Domingo
            </Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Apertura:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeOpenSunday}
                </Text>
              </View>
              <View style={styles.timeInfo}>
                <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                  Cierre:
                </Text>
                <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}>
                  {timeCloseSunday}
                </Text>
              </View>
            </View>
          </View>
        </Surface>

        <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}> 
            Información del Sistema
          </Text>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Creado:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {createdAt}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}> 
              Última actualización:
            </Text>
            <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.onSurface }]}> 
              {updatedAt}
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  organizationImage: {
    width: '100%',
    height: 200,
  },
  section: {
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayChipSelected: {
    marginBottom: 8,
    backgroundColor: 'green',
  },
  dayChipNotSelected: {
    marginBottom: 8,
    backgroundColor: 'red',
  },
  timeSection: {
    marginBottom: 16,
  },
  timeSectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeInfo: {
    flex: 1,
  },
});

export default OrganizationDetailCard; 