/**
 * Audio processing utilities for Gemini Live API WebSocket stream.
 * 
 * Input: Capture mic, resample to 16,000 Hz, convert Float32 to Int16 PCM, Base64 encode.
 * Output: Base64 decode, parse Int16 PCM (24,000 Hz), convert to Float32 for playback.
 */

/**
 * Resamples Float32 audio using linear interpolation.
 */
export function downsampleFloat32To16kHz(
  buffer: Float32Array,
  inputSampleRate: number
): Float32Array {
  if (inputSampleRate === 16000) {
    return buffer;
  }
  const sampleRateRatio = inputSampleRate / 16000;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);
  
  for (let i = 0; i < newLength; i++) {
    const nextOffset = i * sampleRateRatio;
    const index = Math.floor(nextOffset);
    const weight = nextOffset - index;
    
    if (index + 1 < buffer.length) {
      result[i] = buffer[index] * (1 - weight) + buffer[index + 1] * weight;
    } else if (index < buffer.length) {
      result[i] = buffer[index];
    } else {
      result[i] = 0;
    }
  }
  return result;
}

/**
 * Converts Float32Array (-1.0 to 1.0) to Int16Array signed 16-bit PCM.
 */
export function convertFloat32ToInt16(buffer: Float32Array): Int16Array {
  const result = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    const s = Math.max(-1, Math.min(1, buffer[i]));
    result[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return result;
}

/**
 * Encodes an ArrayBuffer (or typed array buffer) to a Base64 string.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes a Base64 string into an ArrayBuffer.
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Converts Int16Array signed 16-bit PCM back to Float32Array (-1.0 to 1.0).
 */
export function convertInt16ToFloat32(buffer: Int16Array): Float32Array {
  const result = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    result[i] = buffer[i] / 32768.0;
  }
  return result;
}
