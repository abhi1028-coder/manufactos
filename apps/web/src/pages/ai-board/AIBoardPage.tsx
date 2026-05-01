import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_QUESTIONS = [
  'What were last month\'s top customers by revenue?',
  'How much is currently overdue in receivables?',
  'Which product had the highest sales volume this quarter?',
  'Compare this month\'s expenses to last month.',
  'How many orders are currently in production?',
];

const MOCK_ANSWERS: Record<string, string> = {
  default: 'I can help with operational analytics for your plant. Try asking about receivables, sales trends, top customers, or order status.',
  receivable: '**Receivables Summary (as of today):**\n\n- Total outstanding: ₹12,62,500\n- Overdue (>30 days): ₹95,000 from Kaveri Castings\n- Largest outstanding: Prakash Machinery — ₹4,12,000 (due May 30)\n\nRecommendation: Prioritise collection follow-up with Kaveri Castings — 45 days overdue.',
  sales: '**Sales Trend — Last 6 Months:**\n\n| Month | Revenue   | Orders |\n|-------|-----------|--------|\n| Nov   | ₹8.2L     | 34     |\n| Dec   | ₹9.4L     | 41     |\n| Jan   | ₹7.8L     | 29     |\n| Feb   | ₹10.5L    | 47     |\n| Mar   | ₹11.8L    | 53     |\n| Apr   | ₹13.2L    | 61     |\n\nRevenue has grown **61%** over 6 months. January dip likely due to factory shutdown.',
  customer: '**Top Customers — May 2024 (YTD):**\n\n1. Prakash Machinery — ₹24.7L\n2. Sunrise Fabricators — ₹19.2L\n3. Apex Auto Components — ₹17.8L\n4. Bharat Steel Pvt Ltd — ₹15.3L\n5. Kaveri Castings — ₹9.5L\n\nTop 5 customers account for **87%** of total revenue.',
  expense: '**Expense Comparison — April vs May 2024:**\n\n| Category    | April    | May      | Change |\n|-------------|----------|----------|--------|\n| Raw Material| ₹1.8L    | ₹1.85L   | +2.8%  |\n| Utilities   | ₹38,000  | ₹42,000  | +10.5% |\n| Labour      | ₹25,000  | ₹28,000  | +12%   |\n| Logistics   | ₹7,200   | ₹8,500   | +18%   |\n| Maintenance | ₹15,000  | ₹12,000  | -20%   |\n\nTotal expenses up **5%** — primarily driven by higher electricity and logistics costs.',
  order: '**Current Order Pipeline:**\n\n- 🟡 In Production: 43 orders\n- 🔵 Confirmed: 27 orders\n- 🟣 Ready to Dispatch: 18 orders\n- 🟢 Delivered (this month): 61 orders\n- ❌ Cancelled: 9 orders\n\nCapacity utilisation is at **87%**. Consider pre-booking slots for June given current inquiry volume.',
};

function getAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('receiv') || q.includes('overdue') || q.includes('outstanding')) return MOCK_ANSWERS.receivable;
  if (q.includes('sales') || q.includes('revenue') || q.includes('trend') || q.includes('month')) return MOCK_ANSWERS.sales;
  if (q.includes('customer') || q.includes('top')) return MOCK_ANSWERS.customer;
  if (q.includes('expense') || q.includes('cost') || q.includes('compare')) return MOCK_ANSWERS.expense;
  if (q.includes('order') || q.includes('production') || q.includes('pipeline')) return MOCK_ANSWERS.order;
  return MOCK_ANSWERS.default;
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
      }`}>
        {isUser ? 'U' : '✦'}
      </div>
      <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm ${
        isUser
          ? 'bg-indigo-600 text-white rounded-tr-sm'
          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
      }`}>
        {msg.content.split('\n').map((line, i) => (
          <p key={i} className={line.startsWith('**') ? 'font-semibold' : line.startsWith('|') ? 'font-mono text-xs' : ''}>
            {line.replace(/\*\*/g, '') || '\u00A0'}
          </p>
        ))}
        <p className={`text-xs mt-1 ${isUser ? 'text-indigo-300' : 'text-slate-400'}`}>
          {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

export default function AIBoardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m the ManufactOS AI Board assistant. Ask me anything about your plant\'s operations — sales, receivables, workforce, expenses, or order pipeline.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (question: string) => {
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: getAnswer(question),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="mb-4">
        <nav className="breadcrumb">
          <span>ManufactOS</span>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">AI Board</span>
        </nav>
        <h1 className="page-title">AI Board</h1>
        <p className="page-subtitle">
          Ask questions in plain English — get instant structured answers from your plant data.
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-semibold">✦</div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Sample questions */}
        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full px-3 py-1 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-5 py-4 border-t border-slate-100 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your plant operations…"
            className="input-field flex-1"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
