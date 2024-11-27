import type { ModelInfo, OllamaApiResponse, OllamaModel } from './types';
import type { ProviderInfo } from '~/types/model';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'claude-3-5-sonnet-latest';

export const PROVIDER_LIST: ProviderInfo[] = [
  {
    name: 'AbacusAI',
    staticModels: [
      { name: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'AbacusAI', maxTokenAllowed: 200000 },
      { name: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku', provider: 'AbacusAI', maxTokenAllowed: 200000 },
      { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'AbacusAI', maxTokenAllowed: 128000 },
      { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'AbacusAI', maxTokenAllowed: 16000 },
      { name: 'mistral-large', label: 'Mistral Large', provider: 'AbacusAI', maxTokenAllowed: 32000 },
      { name: 'llama-3-70b', label: 'Llama 3 70B', provider: 'AbacusAI', maxTokenAllowed: 32000 },
    ],
    getApiKeyLink: 'https://abacus.ai/app/#/account/api-keys',
  },
  {
    name: 'Anthropic',
    staticModels: [
      {
        name: 'claude-3-5-sonnet-latest',
        label: 'Claude 3.5 Sonnet (new)',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'claude-3-5-sonnet-20240620',
        label: 'Claude 3.5 Sonnet (old)',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'claude-3-5-haiku-latest',
        label: 'Claude 3.5 Haiku (new)',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      { name: 'claude-3-opus-latest', label: 'Claude 3 Opus', provider: 'Anthropic', maxTokenAllowed: 8000 },
      { name: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', provider: 'Anthropic', maxTokenAllowed: 8000 },
      { name: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'Anthropic', maxTokenAllowed: 8000 },
    ],
    getApiKeyLink: 'https://console.anthropic.com/settings/keys',
  },
  {
    name: 'Ollama',
    staticModels: [],
    getDynamicModels: getOllamaModels,
    getApiKeyLink: 'https://ollama.com/download',
    labelForGetApiKey: 'Download Ollama',
    icon: 'i-ph:cloud-arrow-down',
  },
  {
    name: 'OpenAILike',
    staticModels: [],
    getDynamicModels: getOpenAILikeModels,
  },
  {
    name: 'Cohere',
    staticModels: [
      { name: 'command-r-plus-08-2024', label: 'Command R plus Latest', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-r-08-2024', label: 'Command R Latest', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-r-plus', label: 'Command R plus', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-r', label: 'Command R', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command', label: 'Command', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-nightly', label: 'Command Nightly', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-light', label: 'Command Light', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'command-light-nightly', label: 'Command Light Nightly', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'c4ai-aya-expanse-8b', label: 'c4AI Aya Expanse 8b', provider: 'Cohere', maxTokenAllowed: 4096 },
      { name: 'c4ai-aya-expanse-32b', label: 'c4AI Aya Expanse 32b', provider: 'Cohere', maxTokenAllowed: 4096 },
    ],
    getApiKeyLink: 'https://dashboard.cohere.com/api-keys',
  },
  {
    name: 'OpenRouter',
    staticModels: [
      { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', maxTokenAllowed: 8000 },
      {
        name: 'anthropic/claude-3.5-sonnet',
        label: 'Anthropic: Claude 3.5 Sonnet (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic/claude-3-haiku',
        label: 'Anthropic: Claude 3 Haiku (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      {
        name: 'deepseek/deepseek-coder',
        label: 'Deepseek-Coder V2 236B (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      {
        name: 'google/gemini-flash-1.5',
        label: 'Google Gemini Flash 1.5 (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      {
        name: 'google/gemini-pro-1.5',
        label: 'Google Gemini Pro 1.5 (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      { name: 'x-ai/grok-beta', label: 'xAI Grok Beta (OpenRouter)', provider: 'OpenRouter', maxTokenAllowed: 8000 },
      {
        name: 'mistralai/mistral-nemo',
        label: 'OpenRouter Mistral Nemo (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      {
        name: 'qwen/qwen-110b-chat',
        label: 'OpenRouter Qwen 110b Chat (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
      },
      { name: 'cohere/command', label: 'Cohere Command (OpenRouter)', provider: 'OpenRouter', maxTokenAllowed: 4096 },
    ],
    getDynamicModels: getOpenRouterModels,
    getApiKeyLink: 'https://openrouter.ai/settings/keys',
  },
  {
    name: 'Google',
    staticModels: [
      { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', provider: 'Google', maxTokenAllowed: 8192 },
      { name: 'gemini-1.5-flash-002', label: 'Gemini 1.5 Flash-002', provider: 'Google', maxTokenAllowed: 8192 },
      { name: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash-8b', provider: 'Google', maxTokenAllowed: 8192 },
      { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', provider: 'Google', maxTokenAllowed: 8192 },
      { name: 'gemini-1.5-pro-002', label: 'Gemini 1.5 Pro-002', provider: 'Google', maxTokenAllowed: 8192 },
      { name: 'gemini-exp-1121', label: 'Gemini exp-1121', provider: 'Google', maxTokenAllowed: 8192 },
    ],
    getApiKeyLink: 'https://aistudio.google.com/app/apikey',
  },
  {
    name: 'Groq',
    staticModels: [
      { name: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70b (Groq)', provider: 'Groq', maxTokenAllowed: 8000 },
      { name: 'llama-3.1-8b-instant', label: 'Llama 3.1 8b (Groq)', provider: 'Groq', maxTokenAllowed: 8000 },
      { name: 'llama-3.2-11b-vision-preview', label: 'Llama 3.2 11b (Groq)', provider: 'Groq', maxTokenAllowed: 8000 },
      { name: 'llama-3.2-3b-preview', label: 'Llama 3.2 3b (Groq)', provider: 'Groq', maxTokenAllowed: 8000 },
      { name: 'llama-3.2-1b-preview', label: 'Llama 3.2 1b (Groq)', provider: 'Groq', maxTokenAllowed: 8000 },
    ],
    getApiKeyLink: 'https://console.groq.com/keys',
  },
  {
    name: 'HuggingFace',
    staticModels: [
      {
        name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: '01-ai/Yi-1.5-34B-Chat',
        label: 'Yi-1.5-34B-Chat (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'codellama/CodeLlama-34b-Instruct-hf',
        label: 'CodeLlama-34b-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'NousResearch/Hermes-3-Llama-3.1-8B',
        label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'Qwen/Qwen2.5-72B-Instruct',
        label: 'Qwen2.5-72B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'meta-llama/Llama-3.1-70B-Instruct',
        label: 'Llama-3.1-70B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'meta-llama/Llama-3.1-405B',
        label: 'Llama-3.1-405B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: '01-ai/Yi-1.5-34B-Chat',
        label: 'Yi-1.5-34B-Chat (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'codellama/CodeLlama-34b-Instruct-hf',
        label: 'CodeLlama-34b-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
      {
        name: 'NousResearch/Hermes-3-Llama-3.1-8B',
        label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
      },
    ],
    getApiKeyLink: 'https://huggingface.co/settings/tokens',
  },

  {
    name: 'OpenAI',
    staticModels: [
      { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI', maxTokenAllowed: 8000 },
      { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI', maxTokenAllowed: 8000 },
      { name: 'gpt-4', label: 'GPT-4', provider: 'OpenAI', maxTokenAllowed: 8000 },
      { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokenAllowed: 8000 },
    ],
    getApiKeyLink: 'https://platform.openai.com/api-keys',
  },
  {
    name: 'xAI',
    staticModels: [{ name: 'grok-beta', label: 'xAI Grok Beta', provider: 'xAI', maxTokenAllowed: 8000 }],
    getApiKeyLink: 'https://docs.x.ai/docs/quickstart#creating-an-api-key',
  },
  {
    name: 'Deepseek',
    staticModels: [
      { name:
