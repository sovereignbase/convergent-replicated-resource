import { CRSet } from '@sovereignbase/convergent-replicated-set'
import { CRStruct } from '@sovereignbase/convergent-replicated-struct'
import {
  ConvergentReplicatedResourceSnapshot,
  RawConvergentReplicatedResourceType,
} from '../.types/types.js'
import { crSetSnapshot, crMapSnapshot } from '../.shared/index.js'
import { CipherMessage } from '@sovereignbase/cryptosuite'
import { SchemaCRDTSnapshot } from '@sovereignbase/schema-crdt'

export class CRResource {
  declare private readonly state: CRStruct<RawConvergentReplicatedResourceType>
  declare public readonly host: CRSet<URL>
  constructor(snapshot?: ConvergentReplicatedResourceSnapshot) {
    Object.defineProperties(this, {
      state: {
        value: new CRStruct<RawConvergentReplicatedResourceType>(
          {
            kind: '',
            data: {},
            host: crSetSnapshot,
            clearance: crMapSnapshot,
            authorization: '',
          },
          snapshot
        ),
        configurable: false,
        enumerable: false,
        writable: false,
      },
    })
  }
  merge() {}
}
