// Mock localStorage for jsdom environment before any imports
// This needs to run immediately to avoid Vue devtools issues
class LocalStorageMock {
  private store: Record<string, string> = {}

  getItem(key: string): string | null {
    return this.store[key] || null
  }

  setItem(key: string, value: string): void {
    this.store[key] = value
  }

  removeItem(key: string): void {
    delete this.store[key]
  }

  clear(): void {
    this.store = {}
  }

  get length(): number {
    return Object.keys(this.store).length
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store)
    return keys[index] || null
  }
}

Object.defineProperty(global, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
  configurable: true
})

Object.defineProperty(global, 'sessionStorage', {
  value: new LocalStorageMock(),
  writable: true,
  configurable: true
})
