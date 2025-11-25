'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalSize: '0 MB',
    recordingTime: '0s',
    chunkCount: 0,
    chunks: [] as string[]
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number>(0);
  const chunkLogRef = useRef<HTMLDivElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
        const chunkLog = `Chunk ${audioChunksRef.current.length}: ${e.data.size} bytes`;
        
        setStats(prev => ({
          ...prev,
          chunks: [...prev.chunks, chunkLog]
        }));
        
        console.log(`Chunk received: ${e.data.size} bytes`);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        const recordingDuration = Date.now() - recordingStartTimeRef.current;
        const durationSeconds = (recordingDuration / 1000).toFixed(2);
        const sizeMB = (audioBlob.size / (1024 * 1024)).toFixed(2);

        setStats(prev => ({
          ...prev,
          totalSize: `${sizeMB} MB (${audioBlob.size} bytes)`,
          recordingTime: `${durationSeconds}s`,
          chunkCount: audioChunksRef.current.length
        }));

        setIsRecording(false);
        console.log(`Total recording size: ${audioBlob.size} bytes`);
      };

      mediaRecorder.start(2000);
      recordingStartTimeRef.current = Date.now();
      setIsRecording(true);
      setStats(prev => ({ ...prev, chunks: [] }));

    } catch (err) {
      alert('Error accessing microphone: ' + (err as Error).message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const replayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  useEffect(() => {
    if (chunkLogRef.current) {
      chunkLogRef.current.scrollTop = chunkLogRef.current.scrollHeight;
    }
  }, [stats.chunks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎙️ Audio Recorder</h1>
        <p className="text-gray-600 text-sm mb-8">Record, store, and replay audio</p>

        <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-2xl mb-7">
          <div className={`w-3 h-3 rounded-full transition-all ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
          }`}></div>
          <span className="text-gray-700 text-sm">
            {isRecording ? 'Recording...' : 'Ready'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-5 rounded-xl transition-all hover:shadow-lg disabled:cursor-not-allowed"
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-5 rounded-xl transition-all hover:shadow-lg disabled:cursor-not-allowed"
          >
            Stop Recording
          </button>
          <button
            onClick={replayAudio}
            disabled={!audioUrl}
            className="col-span-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-5 rounded-xl transition-all hover:shadow-lg disabled:cursor-not-allowed"
          >
            ▶ Replay Audio
          </button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg text-sm text-gray-700 mb-7">
          <strong>How it works:</strong> Click "Start Recording" to begin capturing audio. Click "Stop Recording" when done. Once you have a recording, use "Replay Audio" to play it back.
        </div>

        {audioUrl && (
          <div className="bg-gray-100 p-6 rounded-xl">
            <div className="mb-3">
              <div className="flex justify-between py-2.5 border-b border-gray-300">
                <span className="font-bold text-gray-800">Total Size:</span>
                <span className="text-blue-600 font-bold">{stats.totalSize}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-300">
                <span className="font-bold text-gray-800">Recording Time:</span>
                <span className="text-blue-600 font-bold">{stats.recordingTime}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="font-bold text-gray-800">Chunks Received:</span>
                <span className="text-blue-600 font-bold">{stats.chunkCount}</span>
              </div>
            </div>
            <div
              ref={chunkLogRef}
              className="bg-white border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto"
            >
              {stats.chunks.map((chunk, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-gray-50 p-2 rounded mb-1 font-mono text-gray-600"
                >
                  {chunk}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}