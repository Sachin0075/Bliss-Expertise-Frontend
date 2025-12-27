import '@testing-library/jest-dom'

// Polyfill for react-router / jsdom
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
