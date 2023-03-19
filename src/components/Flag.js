import flags from "country-flag-icons/react/3x2";
function Flag({ iso3166, style }) {
  const FlagIn = flags[iso3166];

  return <FlagIn style={style}></FlagIn>;
}
export default Flag;
