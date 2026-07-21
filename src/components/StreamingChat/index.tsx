'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function StreamingChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello! I am Akshith Reddy's AI Qualification & Portfolio Assistant. Ask me anything about Akshith's React component engineering, WCAG 2.1 AA accessibility standards, Vitest testing metrics, or how to schedule a 15-minute technical code review interview.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollPinnedRef = useRef(true);

  // Auto-scroll handler: Pin to bottom only if user is at bottom, release pin on scroll up
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - (scrollTop + clientHeight) <= 60;

    isAutoScrollPinnedRef.current = isAtBottom;
    setIsUserScrolledUp(!isAtBottom);
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
    isAutoScrollPinnedRef.current = true;
    setIsUserScrolledUp(false);
  };

  useEffect(() => {
    if (isAutoScrollPinnedRef.current) {
      scrollToBottom('smooth');
    }
  }, [messages, isThinking]);

  // Stop button handler: Aborts stream, preserves partial message, re-enables input
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setIsThinking(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Initial state: Start generation & thinking phase
    setIsGenerating(true);
    setIsThinking(true);
    scrollToBottom('smooth');

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMessagePlaceholder: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
    };

    // Prepare AbortController for mid-stream cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No readable stream available');

      const decoder = new TextDecoder();
      let accumulatedText = '';
      let isFirstTokenReceived = false;

      // Add empty assistant message placeholder
      setMessages((prev) => [...prev, assistantMessagePlaceholder]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                // Smooth handoff: Hide thinking indicator on first token
                if (!isFirstTokenReceived) {
                  isFirstTokenReceived = true;
                  setIsThinking(false);
                }

                accumulatedText += parsed.text;

                // Update assistant message state token-by-token
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: accumulatedText }
                      : msg
                  )
                );
              }
            } catch (err) {
              // Ignore parse errors on split stream chunks
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Generation stopped mid-stream by user.');
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: `⚠️ System Error: ${err.message || 'Failed to stream response.'}`,
          },
        ]);
      }
    } finally {
      setIsGenerating(false);
      setIsThinking(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col h-[700px] max-w-4xl mx-auto rounded-2xl border border-[#94a3b8]/20 bg-[#0f172a] shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#94a3b8]/20 bg-[#0f172a]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/40 flex items-center justify-center font-bold text-[#6366f1] text-xs">
            AI
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Streaming AI Qualification Assistant</h2>
            <p className="text-xs text-[#94a3b8]">Claude 3.5 Sonnet • SSE Token Stream • Real-time Proof</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-400 font-semibold">Active Stream</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-6 relative scrollbar-thin scrollbar-thumb-slate-700"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm transition-all ${
                msg.role === 'user'
                  ? 'bg-[#6366f1] text-white rounded-br-none'
                  : 'bg-[#1e293b] text-[#f8fafc] border border-[#94a3b8]/20 rounded-bl-none'
              }`}
            >
              <div className="text-[11px] font-semibold opacity-70 mb-1">
                {msg.role === 'user' ? 'Hiring Lead' : 'Akshith Reddy AI Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {/* Thinking Indicator with Smooth Handoff */}
        {isThinking && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="bg-[#1e293b] border border-[#6366f1]/30 rounded-2xl px-5 py-3 text-sm text-[#94a3b8] flex items-center gap-3">
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#6366f1] animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-[#6366f1] animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-[#6366f1] animate-bounce" />
              </span>
              <span className="text-xs font-semibold text-[#6366f1]">
                Analyzing question & preparing technical evidence...
              </span>
            </div>
          </div>
        )}

        {/* Jump to Latest Scroll Button */}
        {isUserScrolledUp && (
          <button
            type="button"
            onClick={() => scrollToBottom('smooth')}
            className="sticky bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#6366f1] text-white text-xs font-bold shadow-xl hover:bg-[#4f46e5] transition-all flex items-center gap-2 border border-white/20 z-10"
          >
            ↓ Jump to latest message
          </button>
        )}
      </div>

      {/* Input Controls Footer */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[#94a3b8]/20 bg-[#0f172a]/95">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Akshith's React code, Vitest tests, or WCAG accessibility..."
            className="flex-1 bg-[#1e293b] text-[#f8fafc] placeholder-[#94a3b8] text-sm rounded-xl px-4 py-3 border border-[#94a3b8]/30 focus:outline-none focus:border-[#6366f1] transition-colors"
          />

          {isGenerating ? (
            <button
              type="button"
              onClick={handleStopGeneration}
              className="px-5 py-3 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-lg hover:bg-rose-700 transition-colors flex items-center gap-2 shrink-0"
            >
              <span className="h-2 w-2 rounded-sm bg-white" />
              Stop Generation
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-3 rounded-xl bg-[#6366f1] text-white font-bold text-xs shadow-lg hover:bg-[#4f46e5] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
            >
              Send Message
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
