import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface CalculationHistoryItem {
  id: string;
  query: string;
  expression: string;
  result: number | string;
  time: string;
}

export const VoiceCalculatorDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [parsedExpr, setParsedExpr] = useState('');
  const [result, setResult] = useState<number | string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ur'>('en');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([
    { id: '1', query: 'twenty five plus seventy five', expression: '25 + 75', result: 100, time: '2 mins ago' },
    { id: '2', query: 'pachas jama bees', expression: '50 + 20', result: 70, time: '5 mins ago' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition support in browser
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const speakResult = (textToSpeak: string) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis non-blocking fallback
    }
  };

  const handleEvaluate = async (textToEval: string) => {
    if (!textToEval.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/calculator/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToEval, language: selectedLanguage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to evaluate arithmetic query');
      }

      setParsedExpr(data.parsedExpression);
      setResult(data.result);

      // Add to history
      const newHistoryItem: CalculationHistoryItem = {
        id: String(Date.now()),
        query: textToEval,
        expression: data.parsedExpression,
        result: data.result,
        time: 'Just now',
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 5)]);

      // Speak answer
      if (typeof data.result === 'number') {
        speakResult(`The answer is ${data.result}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not parse spoken calculation.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Web Speech recognition is not supported in this browser. Please use the preset voice phrases or typing input below.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      setErrorMsg(null);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'ur' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleEvaluate(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access denied. You can still test with the interactive phrase pills below!');
        } else {
          setErrorMsg(`Voice capture notice: ${event.error}. You can test using pre-recorded phrases below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setErrorMsg('Unable to initiate microphone recording. Try clicking a sample phrase!');
    }
  };

  const samplePhrases = [
    { text: 'twenty five plus seventy five', lang: 'en', label: '25 + 75 (English)' },
    { text: 'four hundred minus seventy five', lang: 'en', label: '400 - 75 (English)' },
    { text: 'one hundred divided by four', lang: 'en', label: '100 ÷ 4 (English)' },
    { text: 'pachas jama bees', lang: 'ur', label: '50 + 20 (Roman Urdu)' },
    { text: 'das zarab teen', lang: 'ur', label: '10 × 3 (Roman Urdu)' },
    { text: 'پانچ جمع بارہ', lang: 'ur', label: '5 + 12 (Urdu Script)' },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Multilingual Voice-Based Calculator</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Interactive FYP Demo
            </span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Voice-first calculation engine designed for accessibility in bilingual communities (English & Urdu).
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedLanguage === 'en'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('ur')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedLanguage === 'ur'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Urdu / رومن اردو
            </button>
          </div>

          {/* TTS Audio toggle */}
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              ttsEnabled
                ? 'bg-neutral-800 text-neutral-200 border-neutral-700'
                : 'bg-neutral-950 text-neutral-500 border-neutral-800'
            }`}
            title={ttsEnabled ? 'Voice output enabled' : 'Voice output muted'}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Display & Waveform feedback */}
      <div className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-6 text-right relative overflow-hidden">
        {/* Ambient listening aura */}
        {isListening && (
          <div className="absolute inset-0 bg-indigo-950/20 border border-indigo-500/40 rounded-xl flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-6 bg-indigo-400 rounded-full" />
              <span className="w-1.5 h-12 bg-indigo-300 rounded-full" />
              <span className="w-1.5 h-8 bg-indigo-400 rounded-full" />
              <span className="w-1.5 h-14 bg-indigo-200 rounded-full" />
              <span className="w-1.5 h-7 bg-indigo-400 rounded-full" />
            </div>
          </div>
        )}

        {/* Display Content */}
        <div className="space-y-1 relative z-10">
          <div className="text-xs text-neutral-500 font-mono tracking-wide h-5 flex items-center justify-end gap-2">
            {parsedExpr ? (
              <>
                <span className="text-neutral-400">Parsed Expression:</span>
                <span className="text-indigo-400 font-semibold">{parsedExpr}</span>
              </>
            ) : (
              <span>Spoken or keyed query</span>
            )}
          </div>

          <div className="text-2xl sm:text-3xl font-mono text-neutral-200 truncate min-h-9">
            {query || (isListening ? 'Listening for speech...' : 'Press Mic or choose preset')}
          </div>

          <div className="text-4xl sm:text-5xl font-mono font-bold text-white tabular-nums pt-2">
            {result !== null ? result : '0'}
          </div>
        </div>
      </div>

      {/* Interactive Input Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Voice Trigger Button */}
        <button
          onClick={toggleListening}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>Speak Query</span>
            </>
          )}
        </button>

        {/* Text Input for instant manual evaluation */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEvaluate(query);
          }}
          className="flex-1 w-full flex items-center gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type spoken phrase e.g. '15 times 4' or 'pachas jama bees'..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={() => {
            setQuery('');
            setParsedExpr('');
            setResult(null);
            setErrorMsg(null);
          }}
          className="p-3 text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          title="Clear calculator"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Phrases */}
      <div>
        <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Try Pre-Recorded Voice Phrases (Simulated Voice Testing):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(phrase.text);
                setSelectedLanguage(phrase.lang as 'en' | 'ur');
                handleEvaluate(phrase.text);
              }}
              className="px-3 py-1.5 text-xs font-medium bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-lg hover:border-indigo-500/50 hover:bg-neutral-800 transition-all text-left cursor-pointer"
            >
              {phrase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>{errorMsg}</div>
        </div>
      )}

      {/* History Drawer */}
      <div className="pt-2 border-t border-neutral-800/80">
        <div className="text-xs font-medium text-neutral-400 mb-2 flex items-center justify-between">
          <span>Computation History (Local Session)</span>
          <span className="text-[11px] text-neutral-500 font-mono">AST Parsed</span>
        </div>
        <div className="space-y-1.5">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setQuery(item.query);
                setParsedExpr(item.expression);
                setResult(item.result);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-800/60 text-xs cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-neutral-400 font-mono truncate">{item.query}</span>
                <span className="text-neutral-600">→</span>
                <span className="text-neutral-300 font-mono">{item.expression}</span>
              </div>
              <div className="font-mono font-bold text-white pl-3 shrink-0 tabular-nums">
                = {item.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
