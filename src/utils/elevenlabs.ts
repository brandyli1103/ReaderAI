// ElevenLabs API configuration
const ELEVENLABS_API_KEY = 'sk_c8a2d71882fd8ad8bb05d584ebae476cb864887fd0158e28';
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Adam voice ID - a reliable default voice

export const textToSpeech = async (text: string): Promise<string> => {
  try {
    console.log('Making request to ElevenLabs API...');
    
    // First, verify the API key and voice
    const voiceResponse = await fetch(
      `https://api.elevenlabs.io/v1/voices/${VOICE_ID}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
      }
    );

    if (!voiceResponse.ok) {
      const errorData = await voiceResponse.json().catch(() => null);
      console.error('Voice verification failed:', errorData);
      throw new Error(`Voice verification failed: ${errorData?.detail?.message || voiceResponse.statusText}`);
    }

    // Then make the text-to-speech request
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Text-to-speech request failed:', errorData);
      throw new Error(`Text-to-speech request failed: ${errorData?.detail?.message || response.statusText}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('Audio generated successfully');
    return audioUrl;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw error;
  }
}; 