```ts
import {
  CRMapAck,
  CRMapSnapshot,
} from '@sovereignbase/convergent-replicated-map'
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
}>

type ConvergentReplicatedResourceSnapshotBase<
  Kind extends 'private' | 'public',
  Data,
> = CRStructSnapshot<{
  kind: Kind
  data: Data
  host: CRSetSnapshot<string>
  frontiers: CRMapSnapshot<OpaqueIdentifier, object>
  clearance: ConvergentReplicatedResourceClearanceSnapshot
  authorization: Base64URLString
}>

export type ConvergentReplicatedResourceSnapshotPrivate =
  ConvergentReplicatedResourceSnapshotBase<'private', CipherMessage>

export type ConvergentReplicatedResourceSnapshotPublic =
  ConvergentReplicatedResourceSnapshotBase<'public', SchemaCRDTSnapshot>

export type ConvergentReplicatedResourceSnapshot =
  | ConvergentReplicatedResourceSnapshotPrivate
  | ConvergentReplicatedResourceSnapshotPublic

export type RawConvergentReplicatedResourceType = {
  kind: string
  data: object
  host: object
  clearance: object
  authorization: string
}
```

```mermaid
flowchart TD
  hosts["HOSTS"]
  authorized{"AUTHORIZED?"}
  discard["DISCARD"]

  kind{"KIND == public?"}
  encrypted["EMIT ENCRYPTED EVENT"]
  decrypt["DECRYPT"]
  hydrate["HYDRATE BY SCHEMA CRDT TYPE"]

  state["STATE"]
  listeners["LISTENERS"]
  changes["CHANGES"]
  encrypt{"ENCRYPT?"}

  hosts --> authorized

  authorized -- no --> discard
  authorized -- yes --> kind
  authorized -- yes --> hosts

  kind -- public --> hydrate
  kind -- private --> encrypted

  encrypted --> decrypt
  decrypt --> hydrate

  hydrate --> state
  state --> listeners
  listeners --> changes
  changes --> encrypt
  encrypt --> authorized
```
