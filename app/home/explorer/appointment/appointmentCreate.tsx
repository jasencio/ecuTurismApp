import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import CustomCalendar from "@/components/CustomCalendar";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useSelector } from "react-redux";
import { routeSelector } from "@/selectors/explorerSelector";
import { getDifficultyTranslation, getDifficultyColor } from "@/types/Route";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function AppointmentCreate() {
  const navigation = useNavigation();
  const router = useRouter();
  const [time, setTime] = useState<string | undefined>();
  const [visitors, setVisitors] = useState<string | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<{ label: string; value: string; }[]>([]);
  const route = useSelector(routeSelector);
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({ headerBackTitle: "Atrás", title: route?.name || "-" });
  }, [navigation, route]);

  useEffect(() => {
    setTime(undefined); // Reset time when time slots change
  }, [timeSlots]);

  return (
    <CustomSafeAreaView>
      <Image
        source={{ uri: route?.mainImage?.publicUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.organizationContainer}>
              <Image
                source={{ uri: route?.organization?.image?.publicUrl }}
                style={styles.organizationImage}
                resizeMode="cover"
              />
              <View style={styles.organizationInfo}>
                <Text variant="bodySmall" style={styles.title}>
                  {route?.organization?.name}
                </Text>
                <View style={styles.addressContainer}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    color={theme.colors.primary}
                    style={styles.addressIcon}
                  />
                  <Text variant="bodySmall" style={styles.text}>
                    {route?.organization?.address}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.title}>
              Descripción
            </Text>
            <Text variant="bodySmall" style={styles.text}>
              {route?.description}
            </Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.colors.primary}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                Duración: <Text style={styles.value}>{route?.minutes} minutos</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="run"
                size={20}
                color={getDifficultyColor(route?.hardness)}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                Dificultad: <Text style={styles.value}>{getDifficultyTranslation(route?.hardness)}</Text>
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={{ marginBottom: 10 }}>
              <Text variant="titleSmall" style={styles.titleScheduled}>
                Por favor elige un horario
              </Text>
              <CustomCalendar 
                daysWeekEnabled={route?.organization?.daysWeekEnabled || []}
                timeOpenWeek={route?.organization?.timeOpenWeek}
                timeCloseWeek={route?.organization?.timeCloseWeek}
                timeOpenSaturday={route?.organization?.timeOpenSaturday}
                timeCloseSaturday={route?.organization?.timeCloseSaturday}
                timeOpenSunday={route?.organization?.timeOpenSunday}
                timeCloseSunday={route?.organization?.timeCloseSunday}
                routeMinutes={Number(route?.minutes) || 60}
                onTimeSlotsChange={setTimeSlots}
              />
              <Divider style={styles.divider} />
              <Dropdown
                label="Visitantes"
                placeholder="Elige un numero de visitantes"
                value={visitors}
                onSelect={setVisitors}
                options={[
                  {
                    label: "1",
                    value: "1",
                  },
                  {
                    label: "2",
                    value: "2",
                  },
                  {
                    label: "3",
                    value: "3",
                  },
                  {
                    label: "4",
                    value: "4",
                  },
                  {
                    label: "5",
                    value: "5",
                  },
                ]}
              />
            </View>
            <Dropdown
              label="Horario"
              value={time}
              onSelect={setTime}
              options={timeSlots}
            />
            <Button
              mode="contained"
              onPress={() => {
                router.push("/home/explorer/appointment/appointmentDetail");
              }}
              style={styles.button}
              disabled={!time || !visitors}
            >
              Agendar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: height * 0.2,
    width: "100%",
  },
  content: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    marginTop: 4,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 2,
  },
  button: {
    marginTop: 8,
    borderRadius: 6,
  },
  titleScheduled: {
    marginTop: 2,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  organizationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  organizationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  organizationInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: '#333',
  },
  value: {
    color: '#222',
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressIcon: {
    marginRight: 4,
  },
});
