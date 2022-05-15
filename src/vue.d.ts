export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      pluralize: (amount: number, singular: string, plural: string | null = null) => string
    }
  }
}
