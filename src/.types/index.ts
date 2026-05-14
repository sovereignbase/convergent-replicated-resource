import { CRMapSnapshot } from '@sovereignbase/convergent-replicated-map'
import { CRSetSnapshot } from '@sovereignbase/convergent-replicated-set'
import { CRStructSnapshot } from '@sovereignbase/convergent-replicated-struct'
import {
  CipherMessage,
  OpaqueIdentifier,
  VerifyKey,
} from '@sovereignbase/cryptosuite'
import type { SchemaCRDTSnapshot } from '@sovereignbase/schema-crdt'

type ConvergentReplicatedResourceClearanceSnapshot = CRStructSnapshot<{
  owner: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
  manager: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
  editor: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
  viewer: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
}>

type ConvergentReplicatedResourceSnapshotBase<
  Kind extends 'private' | 'public',
  Data,
> = CRStructSnapshot<{
  kind: Kind
  data: Data
  host: CRSetSnapshot<string>
  clearance: ConvergentReplicatedResourceClearanceSnapshot
  authorization: Base64URLString
}>

export type ConvergentReplicatedResourceSnapshotPrivate =
  ConvergentReplicatedResourceSnapshotBase<'private', CipherMessage>

export type ConvergentReplicatedResourceSnapshotPublic =
  ConvergentReplicatedResourceSnapshotBase<'public', Array<SchemaCRDTSnapshot>>

export type ConvergentReplicatedResourceSnapshot =
  | ConvergentReplicatedResourceSnapshotPrivate
  | ConvergentReplicatedResourceSnapshotPublic
