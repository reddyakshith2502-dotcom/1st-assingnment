import StreamingChat from '@/components/StreamingChat';

export const metadata = {
  title: 'Streaming AI Qualification Assistant | Akshith Reddy',
  description: 'Hold a real-time streaming conversation with Akshith Reddy\'s AI Qualification & Portfolio Assistant.',
};

export default function ChatPage() {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-3.5 py-1 text-xs font-semibold text-[#6366f1] border border-[#6366f1]/30 mb-3">
          FE-06 Streaming UI Deliverable
        </span>
        <h1 className="text-3xl font-extrabold text-[#f8fafc] mb-2">
          AI Qualification & Technical Assistant
        </h1>
        <p className="text-sm text-[#94a3b8] max-w-xl mx-auto">
          Experience token-by-token streaming, smooth thinking handoffs, mid-stream generation cancelling, and auto-scroll pinning.
        </p>
      </div>

      <StreamingChat />
    </div>
  );
}
