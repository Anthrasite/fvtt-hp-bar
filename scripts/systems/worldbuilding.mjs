import HPBarBase from './default.mjs';
import * as utils from "../shared/utils.mjs";


export default class WorldBuildingBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme
    ];
  }

  /** @inheritdoc */
  static shouldDraw(attribute) {
    return attribute === "health";
  }

  /** @inheritdoc */
  prepareData() {
    const _hp = utils.duplicate(this.system.health);
    let data = {
      max: Number(_hp.max),
      value: Number(_hp.value),
      temp: 0
    };

    // There is no temp health attribute by default, but custom attributes can be added, so check if one exists
    if (Object.hasOwn(this.system.attributes, `tempHealth`) && this.system.attributes.tempHealth.dtype === `Number`) {
      const _tmp = utils.duplicate(this.system.attributes.tempHealth);
      data.temp = Number(_tmp.value);
    }

    return data;
  }
}
