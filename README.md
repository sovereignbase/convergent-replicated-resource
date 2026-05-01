```ts
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
  clearance: ConvergentReplicatedResourceClearanceSnapshot
  authorization: Base64URLString
}>

export type ConvergentReplicatedResourceSnapshotPrivate =
  ConvergentReplicatedResourceSnapshotBase<'private', CipherMessage>

export type ConvergentReplicatedResourceSnapshotPublic =
  ConvergentReplicatedResourceSnapshotBase<'public', Array<SchemaCRDT>>

export type ConvergentReplicatedResourceSnapshot =
  | ConvergentReplicatedResourceSnapshotPrivate
  | ConvergentReplicatedResourceSnapshotPublic
```
