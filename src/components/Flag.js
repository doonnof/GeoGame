import flags from "country-flag-icons/react/3x2";
function Flag({ iso3166, style, className }) {
  const FlagIn = flags[iso3166];

  if (!FlagIn) return null;
  return <FlagIn style={style} className={className} />;
}
export default Flag;
