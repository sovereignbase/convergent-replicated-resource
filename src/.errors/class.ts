export type CRResourceErrorCode = 'EXAMPLE_ERROR_CODE'

export class CRResourceError extends Error {
  readonly code: CRResourceErrorCode

  constructor(code: CRResourceErrorCode, message?: string) {
    const detail = message ?? code
    super(`{@sovereignbase/convergent-replicated-resource} ${detail}`)
    this.code = code
    this.name = 'CRResourceError'
  }
}
