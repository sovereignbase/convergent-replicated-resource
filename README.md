```ts
export type ConveregentReplicatedResourceSnapshotPrivate = CRStructSnapshot<{
  kind: 'private'
  data: CipherMessage
  host: CRSetSnapshot<string>
  clearance: CRStructSnapshot<{
    owner: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
    manager: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
    editor: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
  }>
  authorization: Base64URLString
}>

export type ConveregentReplicatedResourceSnapshotPublic = CRStructSnapshot<{
  kind: 'public'
  data: Array<SchemaCRDT>
  host: CRSetSnapshot<string>
  clearance: CRStructSnapshot<{
    owner: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
    manager: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
    editor: CRMapSnapshot<OpaqueIdentifier, VerifyKey>
  }>
  authorization: Base64URLString
}>

export type ConvergentReplicatedResourceSnapshot =
  | ConveregentReplicatedResourceSnapshotPrivate
  | ConveregentReplicatedResourceSnapshotPublic
```
