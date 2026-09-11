import { replayIntegration } from '@sentry/vue'

/**
 * Builds the Sentry session replay integration.
 *
 * This lives in its own module so the replay recorder — the largest single
 * dependency in the app — is bundled into a chunk of its own that loads after
 * the page has rendered, rather than in the initial bundle.
 *
 * @returns The replay integration, configured to mask all text and media.
 */
export function sessionReplayIntegration(): ReturnType<typeof replayIntegration> {
  return replayIntegration({ maskAllText: true, blockAllMedia: true })
}
