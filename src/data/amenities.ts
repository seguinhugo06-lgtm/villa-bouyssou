export interface Amenity {
  id: string;
  iconName: string;
  labelKey: string;
}

export const amenities: Amenity[] = [
  { id: "cityCenter", iconName: "MapPin", labelKey: "amenities.cityCenter" },
  { id: "relaxingSpace", iconName: "Moon", labelKey: "amenities.relaxingSpace" },
  { id: "heatedPool", iconName: "Waves", labelKey: "amenities.heatedPool" },
  { id: "surroundingForest", iconName: "TreePine", labelKey: "amenities.surroundingForest" },
  { id: "floorAC", iconName: "Thermometer", labelKey: "amenities.floorAC" },
  { id: "gamesActivities", iconName: "Gamepad2", labelKey: "amenities.gamesActivities" },
  { id: "masterSuite", iconName: "Bed", labelKey: "amenities.masterSuite" },
  { id: "woodFireplace", iconName: "Flame", labelKey: "amenities.woodFireplace" },
  { id: "highSpeedInternet", iconName: "Wifi", labelKey: "amenities.highSpeedInternet" },
  { id: "laundry", iconName: "WashingMachine", labelKey: "amenities.laundry" },
];
