import { countries } from "./countries";
import { ruRegions } from "./ruRegions";

export function findCountry(iso3166) {
  return countries.find((countryItem) => countryItem.iso3166 === iso3166);
}
export function findRegion(iso3166) {
  return ruRegions.find((regionItem) => regionItem.iso3166 === iso3166);
}
