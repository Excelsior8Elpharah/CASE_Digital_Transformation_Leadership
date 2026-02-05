
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';
import { MARKET_SHARE_DATA, RISKS_EXTENDED, ISO_AFTER, PROJECTS_PORTFOLIO, ROADMAP_ITEMS } from '../constants';

export default function ChatIA() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const callGemini = useCallback(async (userMessage: string): Promise<string> => {
    try {
      // Fix: Create new instance right before call and use systemInstruction in config
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        VOCÊ É O CDO RAPHAEL SERAFIM, CONSULTOR ESTRATÉGICO DA SABOR & HERANÇA.
        Responda de forma executiva, curta e baseada EXATAMENTE nos dados abaixo.
        
        DADOS ATUAIS DO PROJETO:
        - Participação de Mercado (Market Share): ${JSON.stringify(MARKET_SHARE_DATA)}
        - Riscos Críticos: ${JSON.stringify(RISKS_EXTENDED)}
        - Conformidade ISO: ${JSON.stringify(ISO_AFTER)}
        - Projetos em Portfólio: ${JSON.stringify(PROJECTS_PORTFOLIO)}
        - Roadmap de Transformação: ${JSON.stringify(ROADMAP_ITEMS)}
        
        REGRAS DE RESPOSTA:
        1. Resposta curta e direta em Português BR.
        2. Use 📊 para dados e 🎯 para recomendações.
        3. Se não houver dados específicos para a pergunta, use o bom senso estratégico.
        4. Zero alucinação: use apenas números citados.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
        }
      });

      // Fix: Directly access the .text property (not a method) as per SDK guidelines
      return response.text || "Não foi possível gerar uma resposta no momento.";
    } catch (error) {
      console.error("Erro na API Gemini:", error);
      return "Erro ao conectar com a IA estratégica. Verifique a chave de API.";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    const currentInput = input;
    setInput('');
    
    const response = await callGemini(currentInput);
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 rounded-3xl overflow-hidden border border-white/5">
      <div className="storytelling p-6 bg-gradient-to-r from-cyan-900/80 to-slate-800/90 border-b border-cyan-500/50 shadow-2xl z-10 backdrop-blur-xl shrink-0">
        <h3 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>
          Chat IA Governança
        </h3>
        <p className="text-sm text-slate-300">Análise em tempo real dos dados estratégicos via Gemini IA.</p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden w-full px-4 md:px-8">
        <div className="flex-1 overflow-y-auto space-y-4 py-6 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-5 rounded-2xl shadow-xl ${
                msg.role === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium'
                  : 'bg-slate-800 text-slate-200'
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-cyan-400 animate-pulse p-4">
              <Bot className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Assistente pensando...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="pb-6 shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre o projeto..."
              className="w-full bg-slate-800/40 border border-slate-700/50 focus:border-cyan-500/50 rounded-2xl px-6 py-4 pr-16 text-slate-200 outline-none backdrop-blur-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-slate-950 rounded-xl flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
