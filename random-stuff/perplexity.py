from dotenv import load_dotenv
import os

load_dotenv()

from openai import OpenAI

# =============================================================================
# PERPLEXITY MODELS (Available as of Nov 2025)
# =============================================================================
# List of available Perplexity models (as strings):
PERPLEXITY_MODELS = [
    "sonar",                    # Fast online model with up-to-date web search
    "sonar-pro",                # Advanced online model with deeper reasoning + web search
    "sonar-reasoning",          # Reasoning-focused model with web search capabilities
]

# =============================================================================
# OpenAI CLIENT CONSTRUCTOR OPTIONS
# =============================================================================
# The OpenAI(...) constructor accepts these common parameters:
#
# api_key (str, required):
#   - Your Perplexity API key (get from https://www.perplexity.ai/settings/api)
#   - Example: api_key="pplx-xxxxxxxxxxxx"
#   - Best practice: store in .env file and load via os.getenv()
#
# base_url (str, required for Perplexity):
#   - API endpoint base URL
#   - For Perplexity: "https://api.perplexity.ai"
#   - Example: base_url="https://api.perplexity.ai"
#
# timeout (int/float, optional):
#   - Request timeout in seconds
#   - Example: timeout=30
#   - Default: varies by SDK version
#
# default_headers (dict, optional):
#   - Custom headers to include in every request
#   - Example: default_headers={"X-Custom-Header": "value"}
#
# max_retries (int, optional):
#   - Number of retry attempts for failed requests
#   - Example: max_retries=3
#
# organization (str, optional):
#   - Organization ID for multi-org accounts
#   - Example: organization="org-xxxx"
#
client = OpenAI(
    api_key=os.getenv("PERPLEXITY_API_KEY"),
    base_url="https://api.perplexity.ai",  # Perplexity's API endpoint
    timeout=60,  # Optional: set request timeout
)

# =============================================================================
# CHAT COMPLETION OPTIONS (client.chat.completions.create)
# =============================================================================
# Common parameters for chat completions:
#
# model (str, required):
#   - Model identifier from PERPLEXITY_MODELS list
#   - Input: "sonar-pro"
#   - Output: Response uses this model
#
# messages (list[dict], required):
#   - Conversation history with role and content
#   - Input: [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}]
#   - Roles: "system", "user", "assistant"
#   - Output: Assistant response in choices[i].message.content
#
# temperature (float, optional):
#   - Controls randomness (0.0 = deterministic, 2.0 = very random)
#   - Input: temperature=0.2 (focused), temperature=1.0 (balanced), temperature=1.5 (creative)
#   - Default: 0.2 for Perplexity models
#   - Output: Affects response variability
#
# max_tokens (int, optional):
#   - Maximum tokens to generate in response
#   - Input: max_tokens=500
#   - Output: Response truncated if limit reached
#   - Note: Perplexity models have different context windows
#
# top_p (float, optional):
#   - Nucleus sampling threshold (alternative to temperature)
#   - Input: top_p=0.9 (use top 90% probability mass)
#   - Range: 0.0 to 1.0
#
# n (int, optional):
#   - Number of completion choices to generate
#   - Input: n=3
#   - Output: choices array will have 3 elements
#   - Default: 1
#
# stream (bool, optional):
#   - Enable streaming responses (SSE)
#   - Input: stream=True
#   - Output: Returns iterator of chunks instead of complete response
#   - Use: for chunk in response: print(chunk.choices[0].delta.content)
#
# presence_penalty (float, optional):
#   - Penalize tokens based on presence in text (-2.0 to 2.0)
#   - Input: presence_penalty=0.5 (encourage new topics)
#   - Default: 0
#
# frequency_penalty (float, optional):
#   - Penalize tokens based on frequency (-2.0 to 2.0)
#   - Input: frequency_penalty=0.5 (reduce repetition)
#   - Default: 0
#
# stop (str or list[str], optional):
#   - Stop sequences to end generation
#   - Input: stop=["\n\n", "END"]
#   - Output: Generation stops when sequence encountered
#
# =============================================================================
# PERPLEXITY WEB SEARCH / GROUNDED SEARCH OPTIONS
# =============================================================================
# Perplexity models have built-in web search capabilities. Additional params:
#
# return_citations (bool, optional):
#   - Include source citations in response
#   - Input: return_citations=True
#   - Output: choices[i].message.citations array with URLs and snippets
#   - Default: False
#
# return_images (bool, optional):
#   - Include relevant images in response
#   - Input: return_images=True
#   - Output: choices[i].message.images array with image URLs
#   - Default: False
#
# search_domain_filter (list[str], optional):
#   - Limit search to specific domains
#   - Input: search_domain_filter=["wikipedia.org", "github.com"]
#   - Output: Only results from these domains used
#
# search_recency_filter (str, optional):
#   - Filter results by recency
#   - Input: search_recency_filter="month" (options: "hour", "day", "week", "month", "year")
#   - Output: Only recent results used in response
#
# Example with web search options:
chat_completion = client.chat.completions.create(
    model="sonar-pro",  # Use a model from PERPLEXITY_MODELS list
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"},
    ],
    temperature=0.2,  # Optional: control randomness
    max_tokens=500,  # Optional: limit response length
    # return_citations=True,  # Optional: get source citations
    # return_images=True,  # Optional: get relevant images
    # search_recency_filter="month",  # Optional: only recent results
)

# =============================================================================
# RESPONSE STRUCTURE
# =============================================================================
# Standard response object structure:
# {
#   "id": "chatcmpl-xxx",
#   "object": "chat.completion",
#   "created": 1699000000,
#   "model": "sonar-pro",
#   "choices": [
#     {
#       "index": 0,
#       "message": {
#         "role": "assistant",
#         "content": "The capital of France is Paris.",
#         "citations": [...]  # If return_citations=True
#       },
#       "finish_reason": "stop"  # "stop", "length", or "content_filter"
#     }
#   ],
#   "usage": {
#     "prompt_tokens": 15,
#     "completion_tokens": 8,
#     "total_tokens": 23
#   }
# }

print(chat_completion)
for i in range(len(chat_completion.choices)):
    print(f"Response {i+1}:")
    print(chat_completion.choices[i].message.content)
