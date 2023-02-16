import {Constructor} from "../util/mixin"
import {NotImplementedError} from "../errors/not-implemented-error"

export function BitOpsProcessor<TBase extends Constructor>(Base: TBase) {
  return class BitOpsProcessor extends Base {
    processXorOne(data: Uint8Array, key: number) {
      return data.map(it => it ^ key)
    }

    processXorMany(data: Uint8Array, key: Uint8Array) {
      return data.map((it, i) => it ^ key[i % key.length])
    }

    processRotateLeft(data: Uint8Array, amount: number, groupSize: number) {
      if (groupSize !== 1) throw new NotImplementedError(`Group size != 1`)

      const mask = groupSize * 8 - 1
      const antiAmount = -amount & mask

      return data.map(it => ((it << amount) & 0xff) | (it >> antiAmount))
    }
  }
}
