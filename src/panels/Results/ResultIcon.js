import { Icon16NeutralFaceOutline, Icon24SadFaceOutline, Icon36SmileOutline } from "@vkontakte/icons";

function ResultIcon({ success }) {
  if (success > 3) {
    return <Icon36SmileOutline fill="var(--vkui--color_background_positive--active)" width={52} height={52} />;
  }

  if (success > 0) {
    return <Icon16NeutralFaceOutline fill="var(--vkui--color_accent_orange--hover)" width={52} height={52}  />;
  }

  return <Icon24SadFaceOutline fill="var(--vkui--color_stroke_negative--hover)" width={52} height={52}  />;
}

export default ResultIcon