import { CRSet } from '@sovereignbase/convergent-replicated-set'
import { CRMap } from '@sovereignbase/convergent-replicated-map'
export const crSetSnapshot = new CRSet().toJSON()
export const crMapSnapshot = new CRMap().toJSON()
