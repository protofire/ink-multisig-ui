/**
 * A no-operation (NOOP) function that does nothing and returns undefined.
 *
 * This function can be used as a placeholder for callbacks or event handlers
 * where you don't want to perform any operation.
 *
 * @example
 * const myEventEmitter = new EventEmitter();
 *
 * // Use NOOP as the event handler for 'event'
 * myEventEmitter.on('event', NOOP);
 *
 * @returns {void} - Always returns undefined.
 */
export const NOOP = (): void => undefined;
